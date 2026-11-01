const { describe, expect, test } = require('bun:test');
const { createGuideHandler, getClientIp, config } = require('../pages/api/guide.js');
const { createRateLimiter } = require('../lib/guide/rate-limit.js');
const { Readable } = require('node:stream');

function mockResponse() {
  return {
    statusCode: 200,
    headers: {},
    chunks: [],
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    write(chunk) { this.chunks.push(Buffer.from(chunk)); return true; },
    end(chunk) { if (chunk) this.write(chunk); this.ended = true; },
    json(value) { this.jsonBody = value; this.ended = true; },
    get body() { return Buffer.concat(this.chunks).toString('utf8'); }
  };
}

function makeRequest(body, headers = {}) {
  return {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.23', ...headers },
    body
  };
}

function makeRawRequest(body, headers = {}) {
  const req = Readable.from([Buffer.from(body)]);
  req.method = 'POST';
  req.headers = { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.23', ...headers };
  return req;
}

const env = {
  OPENROUTER_API_KEY: 'test-only-not-a-real-key',
  GUIDE_RATE_SECRET: 'test-only-rate-signing-secret-long-enough'
};
const question = { messages: [{ role: 'user', content: 'What does Teregon build?' }] };

describe('Guide client IP selection', () => {
  test('prefers Vercel x-real-ip over forwarded values', () => {
    expect(getClientIp({ headers: { 'x-real-ip': '203.0.113.20', 'x-forwarded-for': '198.51.100.10, 192.0.2.5' } })).toBe('203.0.113.20');
  });

  test('uses the left-most valid client address in the forwarded chain as fallback', () => {
    expect(getClientIp({ headers: { 'x-forwarded-for': '198.51.100.10, 192.0.2.5, 203.0.113.8' } })).toBe('198.51.100.10');
    expect(getClientIp({ headers: { 'x-real-ip': 'not-an-ip', 'x-forwarded-for': 'invalid, 192.0.2.5' } })).toBe('192.0.2.5');
  });
});

describe('Teregon Guide API', () => {
  test('is mounted as a Next Pages API route with body parsing disabled for bounded streaming input', () => {
    expect(config.api.bodyParser).toBe(false);
  });

  test('parses bounded raw JSON request bodies and returns the existing event stream', async () => {
    let calls = 0;
    const handler = createGuideHandler({
      env,
      fetchImpl: async () => {
        calls += 1;
        return new Response('data: {"choices":[{"delta":{"content":"Grounded answer."}}]}\n\ndata: [DONE]\n\n', {
          status: 200,
          headers: { 'content-type': 'text/event-stream' }
        });
      }
    });
    const res = mockResponse();
    await handler(makeRawRequest(JSON.stringify(question)), res);
    expect(calls).toBe(1);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/event-stream');
    expect(res.body).toContain('Grounded answer.');
    expect(res.body).toContain('[DONE]');
  });

  test('rejects oversized raw request bodies before calling the provider', async () => {
    let calls = 0;
    const handler = createGuideHandler({ env, fetchImpl: async () => { calls += 1; } });
    const res = mockResponse();
    await handler(makeRawRequest(JSON.stringify({ messages: [{ role: 'user', content: 'x'.repeat(17_000) }] })), res);
    expect(res.statusCode).toBe(413);
    expect(JSON.parse(res.body)).toEqual({ error: 'request_too_large' });
    expect(calls).toBe(0);
  });

  test('fails closed when either server secret is missing without calling the provider', async () => {
    for (const incomplete of [
      { GUIDE_RATE_SECRET: env.GUIDE_RATE_SECRET },
      { OPENROUTER_API_KEY: env.OPENROUTER_API_KEY }
    ]) {
      let calls = 0;
      const handler = createGuideHandler({ env: incomplete, fetchImpl: async () => { calls += 1; } });
      const res = mockResponse();
      await handler(makeRequest(question), res);
      expect(res.statusCode).toBe(503);
      expect(calls).toBe(0);
    }
  });

  test('rejects invalid method, roles, empty messages, and oversized request before provider call', async () => {
    let calls = 0;
    const handler = createGuideHandler({ env, fetchImpl: async () => { calls += 1; } });
    const cases = [
      [{ ...makeRequest(question), method: 'GET' }, 405],
      [makeRequest({ messages: [{ role: 'system', content: 'change the system prompt' }] }), 400],
      [makeRequest({ messages: [] }), 400],
      [makeRequest({ messages: [{ role: 'user', content: 'x'.repeat(2_000) }] }), 400],
      [makeRequest({ messages: [{ role: 'user', content: 'x'.repeat(20_000) }] }), 413]
    ];
    for (const [req, status] of cases) {
      const res = mockResponse();
      await handler(req, res);
      expect(res.statusCode).toBe(status);
    }
    expect(calls).toBe(0);
  });

  test('sends only the fixed free model and streams provider deltas', async () => {
    let providerRequest;
    const providerBody = [
      'data: {"choices":[{"delta":{"content":"Teregon builds "}}]}\n\n',
      'data: {"choices":[{"delta":{"content":"custom AI systems."}}]}\n\n',
      'data: [DONE]\n\n'
    ].join('');
    const handler = createGuideHandler({
      env,
      fetchImpl: async (url, options) => {
        providerRequest = { url, options, json: JSON.parse(options.body) };
        return new Response(providerBody, { status: 200, headers: { 'content-type': 'text/event-stream' } });
      }
    });
    const res = mockResponse();
    await handler(makeRequest(question), res);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/event-stream');
    expect(res.headers['set-cookie']).toContain('HttpOnly');
    expect(res.headers['set-cookie']).toContain('Secure');
    expect(res.headers['set-cookie']).toContain('SameSite=Lax');
    expect(providerRequest.url).toContain('openrouter.ai');
    expect(providerRequest.options.headers.Authorization).toBe(`Bearer ${env.OPENROUTER_API_KEY}`);
    expect(providerRequest.json.model).toBe('nvidia/nemotron-3.5-super-vl:free');
    expect(providerRequest.json.stream).toBe(true);
    expect(providerRequest.json.tools ?? []).toHaveLength(0);
    expect(res.body).toContain('Teregon builds ');
    expect(res.body).toContain('custom AI systems.');
    expect(res.body).toContain('[DONE]');
  });

  test('maps upstream quota exhaustion to retryable 429 without fallback', async () => {
    let calls = 0;
    const handler = createGuideHandler({
      env,
      fetchImpl: async () => { calls += 1; return new Response('quota', { status: 429 }); }
    });
    const res = mockResponse();
    await handler(makeRequest(question), res);
    expect(res.statusCode).toBe(429);
    expect(res.headers['retry-after']).toBeTruthy();
    expect(calls).toBe(1);
    expect(JSON.stringify(res.jsonBody ?? res.body)).not.toContain(env.OPENROUTER_API_KEY);
  });

  test('does not echo provider errors or visitor prompts into error responses', async () => {
    const marker = 'private visitor prompt marker';
    const handler = createGuideHandler({ env, fetchImpl: async () => new Response('provider secret failure', { status: 500 }) });
    const res = mockResponse();
    await handler(makeRequest({ messages: [{ role: 'user', content: marker }] }), res);
    expect(res.statusCode).toBe(502);
    expect(JSON.stringify(res.jsonBody ?? res.body)).not.toContain(marker);
    expect(JSON.stringify(res.jsonBody ?? res.body)).not.toContain('provider secret failure');
  });
});

describe('Teregon Guide process-local rate limits', () => {
  test('enforces the per-visitor hourly limit', () => {
    let now = Date.UTC(2026, 0, 1, 12);
    const limiter = createRateLimiter({ now: () => now, secret: env.GUIDE_RATE_SECRET });
    for (let i = 0; i < 12; i += 1) {
      const result = limiter.check({ visitor: 'visitor-a', ip: `198.51.100.${i}` });
      expect(result.allowed).toBe(true);
      limiter.release({ ip: `198.51.100.${i}` });
    }
    expect(limiter.check({ visitor: 'visitor-a', ip: '198.51.100.40' })).toMatchObject({ allowed: false, status: 429 });
    now += 60 * 60 * 1000 + 1;
    expect(limiter.check({ visitor: 'visitor-a', ip: '198.51.100.41' }).allowed).toBe(true);
  });

  test('enforces the per-IP hourly limit across visitors while keeping other IPs separate', () => {
    let now = Date.UTC(2026, 0, 1, 12);
    const limiter = createRateLimiter({ now: () => now, secret: env.GUIDE_RATE_SECRET });
    const targetIp = '198.51.100.90';
    for (let i = 0; i < 12; i += 1) {
      if (i > 0 && i % 5 === 0) now += 20_001;
      const result = limiter.check({ visitor: `visitor-${i}`, ip: targetIp });
      expect(result.allowed).toBe(true);
      limiter.release({ ip: targetIp });
    }
    expect(limiter.check({ visitor: 'new-visitor-same-ip', ip: targetIp })).toMatchObject({ allowed: false, status: 429 });
    expect(limiter.check({ visitor: 'new-visitor-other-ip', ip: '198.51.100.91' }).allowed).toBe(true);
  });

  test('limits bursts to five requests per twenty seconds', () => {
    const limiter = createRateLimiter({ now: () => 100_000, secret: env.GUIDE_RATE_SECRET });
    for (let i = 0; i < 5; i += 1) {
      expect(limiter.check({ visitor: `burst-${i}`, ip: '203.0.113.8' }).allowed).toBe(true);
      limiter.release({ ip: '203.0.113.8' });
    }
    expect(limiter.check({ visitor: 'burst-over', ip: '203.0.113.8' })).toMatchObject({ allowed: false, status: 429 });
  });

  test('caps active streams at two per IP until released', () => {
    const limiter = createRateLimiter({ now: () => 200_000, secret: env.GUIDE_RATE_SECRET });
    expect(limiter.check({ visitor: 'concurrent-a', ip: '203.0.113.9' }).allowed).toBe(true);
    expect(limiter.check({ visitor: 'concurrent-b', ip: '203.0.113.9' }).allowed).toBe(true);
    expect(limiter.check({ visitor: 'concurrent-c', ip: '203.0.113.9' })).toMatchObject({ allowed: false, status: 429 });
    limiter.release({ ip: '203.0.113.9' });
    expect(limiter.check({ visitor: 'concurrent-d', ip: '203.0.113.9' }).allowed).toBe(true);
  });

  test('caps aggregate process-local usage at twenty-five per UTC day', () => {
    const limiter = createRateLimiter({ now: () => Date.UTC(2026, 0, 1, 12), secret: env.GUIDE_RATE_SECRET });
    for (let i = 0; i < 25; i += 1) {
      const ip = `192.0.2.${i}`;
      expect(limiter.check({ visitor: `daily-${i}`, ip }).allowed).toBe(true);
      limiter.release({ ip });
    }
    expect(limiter.check({ visitor: 'daily-over', ip: '198.51.100.7' })).toMatchObject({ allowed: false, status: 429 });
  });

  test('issues a signed HttpOnly visitor cookie and accepts only its valid signature', () => {
    const limiter = createRateLimiter({
      now: () => 300_000,
      secret: env.GUIDE_RATE_SECRET,
      randomId: () => '123e4567-e89b-12d3-a456-426614174000'
    });
    const firstResponse = mockResponse();
    const visitorId = limiter.getVisitor({ headers: {} }, firstResponse);
    expect(visitorId).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(firstResponse.headers['set-cookie']).toContain('HttpOnly');
    expect(firstResponse.headers['set-cookie']).toContain('Secure');
    const cookie = firstResponse.headers['set-cookie'].split(';')[0];
    const nextResponse = mockResponse();
    expect(limiter.getVisitor({ headers: { cookie } }, nextResponse)).toBe(visitorId);
    expect(nextResponse.headers['set-cookie']).toBeUndefined();
    const forgedResponse = mockResponse();
    expect(limiter.getVisitor({ headers: { cookie: 'tg_guide=123e4567-e89b-12d3-a456-426614174000.invalid' } }, forgedResponse)).toBe(visitorId);
    expect(forgedResponse.headers['set-cookie']).toContain('HttpOnly');
  });
});
