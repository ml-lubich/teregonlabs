'use strict';

const { randomUUID } = require('node:crypto');
const { isIP } = require('node:net');
const { SYSTEM_CONTEXT } = require('./context');
const { createRateLimiter } = require('./rate-limit');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'nvidia/nemotron-3.5-super-vl:free';
const MAX_BODY_BYTES = 16 * 1024;
const MAX_MESSAGES = 8;
const MAX_MESSAGE_CHARS = 1800;
const MAX_TOTAL_CHARS = 7000;
const REQUEST_TIMEOUT_MS = 30_000;

function sendJson(res, status, payload, retryAfter) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (retryAfter) res.setHeader('Retry-After', String(retryAfter));
  res.end(JSON.stringify(payload));
}

function bodyByteLength(body) {
  if (typeof body === 'string') return Buffer.byteLength(body);
  try { return Buffer.byteLength(JSON.stringify(body)); } catch { return Infinity; }
}

async function readRequestBody(req) {
  if (req.body !== undefined) return req.body;
  const contentLength = Number(req.headers?.['content-length']);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return { error: 'request_too_large' };
  const chunks = [];
  let size = 0;
  try {
    for await (const chunk of req) {
      const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += bytes.byteLength;
      if (size > MAX_BODY_BYTES) return { error: 'request_too_large' };
      chunks.push(bytes);
    }
  } catch {
    return { error: 'invalid_request' };
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return { error: 'invalid_request' };
  }
}

function parseMessages(body) {
  let parsed = body;
  if (typeof body === 'string') {
    try { parsed = JSON.parse(body); } catch { return { error: 'invalid_request' }; }
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) || !Array.isArray(parsed.messages)) {
    return { error: 'invalid_request' };
  }
  if (parsed.messages.length < 1 || parsed.messages.length > MAX_MESSAGES) return { error: 'invalid_request' };
  let total = 0;
  const messages = [];
  for (const message of parsed.messages) {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string') {
      return { error: 'invalid_request' };
    }
    const content = message.content.trim();
    if (!content || content.length > MAX_MESSAGE_CHARS) return { error: 'invalid_request' };
    total += content.length;
    if (total > MAX_TOTAL_CHARS) return { error: 'invalid_request' };
    messages.push({ role: message.role, content });
  }
  if (messages[messages.length - 1].role !== 'user') return { error: 'invalid_request' };
  return { messages };
}

function getClientIp(req) {
  const real = req.headers?.['x-real-ip'];
  if (typeof real === 'string' && isIP(real.trim())) return real.trim().toLowerCase();

  // Vercel supplies x-real-ip. If it is absent, use the first valid client
  // address in the forwarded chain, rather than a later proxy hop. This
  // fallback assumes the hosting edge appends trusted proxy addresses.
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    for (const part of forwarded.split(',')) {
      const candidate = part.trim();
      if (isIP(candidate)) return candidate.toLowerCase();
    }
  }
  return 'unknown';
}

function originIsAllowed(req) {
  const origin = req.headers?.origin;
  if (!origin) return true;
  const host = req.headers?.host;
  if (!host) return false;
  try {
    const parsed = new URL(origin);
    return parsed.host.toLowerCase() === String(host).toLowerCase();
  } catch {
    return false;
  }
}

function safeRetryAfter(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(3600, Math.ceil(parsed)) : 60;
}

function createGuideHandler({ env = process.env, fetchImpl = globalThis.fetch, limiter, now = Date.now } = {}) {
  const rateLimiter = limiter || createRateLimiter({ now, secret: env.GUIDE_RATE_SECRET });

  return async function guideHandler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return sendJson(res, 405, { error: 'method_not_allowed' });
    }
    if (!originIsAllowed(req)) return sendJson(res, 403, { error: 'forbidden' });
    if (!env.OPENROUTER_API_KEY || typeof env.GUIDE_RATE_SECRET !== 'string' || env.GUIDE_RATE_SECRET.length < 32 || typeof fetchImpl !== 'function') {
      return sendJson(res, 503, { error: 'unavailable' });
    }
    const requestBody = await readRequestBody(req);
    if (requestBody?.error === 'request_too_large' || bodyByteLength(requestBody) > MAX_BODY_BYTES) {
      return sendJson(res, 413, { error: 'request_too_large' });
    }
    const parsed = parseMessages(requestBody);
    if (parsed.error) return sendJson(res, 400, { error: parsed.error });

    const visitor = rateLimiter.getVisitor
      ? rateLimiter.getVisitor(req, res)
      : (req.headers?.cookie || randomUUID());
    const ip = getClientIp(req);
    const limit = rateLimiter.check({ visitor, ip });
    if (!limit.allowed) return sendJson(res, limit.status || 429, { error: 'rate_limited' }, limit.retryAfter || 60);

    const controller = new AbortController();
    let clientDisconnected = false;
    let released = false;
    const release = () => {
      if (!released) {
        released = true;
        rateLimiter.release?.({ ip });
      }
    };
    const abortIfDisconnected = () => {
      if (!res.writableEnded) {
        clientDisconnected = true;
        controller.abort();
      }
    };
    const onRequestAborted = () => {
      clientDisconnected = true;
      controller.abort();
    };
    res.on?.('close', abortIfDisconnected);
    req.on?.('aborted', onRequestAborted);
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    timeout.unref?.();

    try {
      const upstream = await fetchImpl(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          'HTTP-Referer': 'https://teregonlabs.com',
          'X-Title': 'Teregon Guide'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'system', content: SYSTEM_CONTEXT }, ...parsed.messages],
          stream: true,
          max_tokens: 320,
          temperature: 0.2
        }),
        signal: controller.signal
      });

      if (!upstream.ok) {
        const status = upstream.status === 429 ? 429 : 502;
        const retryAfter = status === 429 ? safeRetryAfter(upstream.headers?.get?.('retry-after')) : undefined;
        if (!clientDisconnected) sendJson(res, status, { error: status === 429 ? 'rate_limited' : 'unavailable' }, retryAfter);
        return;
      }
      if (!upstream.body || typeof upstream.body.getReader !== 'function') {
        if (!clientDisconnected) sendJson(res, 502, { error: 'unavailable' });
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let done = false;
      const consumeLine = (line) => {
        if (!line.startsWith('data:')) return;
        const data = line.slice(5).trim();
        if (!data || data === '[DONE]') return;
        let frame;
        try { frame = JSON.parse(data); } catch { return; }
        const delta = frame?.choices?.[0]?.delta?.content;
        if (typeof delta !== 'string' || !delta) return;
        if (!res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: delta } }] })}\n\n`)) {
          return new Promise((resolve) => res.once('drain', resolve));
        }
      };

      while (!done && !clientDisconnected) {
        const chunk = await reader.read();
        done = chunk.done;
        buffer += decoder.decode(chunk.value || new Uint8Array(), { stream: !done });
        let boundary;
        while ((boundary = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, boundary).replace(/\r$/, '');
          buffer = buffer.slice(boundary + 1);
          await consumeLine(line);
        }
      }
      if (!clientDisconnected && !res.writableEnded) {
        if (buffer) await consumeLine(buffer.replace(/\r$/, ''));
        res.write('data: [DONE]\n\n');
        res.end();
      }
    } catch {
      if (!clientDisconnected && !res.headersSent) sendJson(res, 502, { error: 'unavailable' });
      else if (!clientDisconnected && !res.writableEnded) {
        res.write('data: {"error":"unavailable"}\n\n');
        res.write('data: [DONE]\n\n');
        res.end();
      }
    } finally {
      clearTimeout(timeout);
      release();
      res.off?.('close', abortIfDisconnected);
      req.off?.('aborted', onRequestAborted);
    }
  };
}

const handler = createGuideHandler();
handler.createGuideHandler = createGuideHandler;
handler.createRateLimiter = createRateLimiter;
handler.parseMessages = parseMessages;
handler.getClientIp = getClientIp;
handler.MODEL = MODEL;
handler.OPENROUTER_URL = OPENROUTER_URL;
module.exports = handler;
