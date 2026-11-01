'use strict';

const crypto = require('node:crypto');

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const WINDOW = 20 * 1000;

function digest(secret, value) {
  return crypto.createHmac('sha256', secret).update(String(value)).digest('hex');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function parseCookies(header = '') {
  const found = {};
  for (const part of String(header).split(';')) {
    const index = part.indexOf('=');
    if (index < 1) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === 'tg_guide') found[key] = value;
  }
  return found;
}

function createRateLimiter({ now = Date.now, secret, randomId = crypto.randomUUID } = {}) {
  const visitors = new Map();
  const ips = new Map();
  const bursts = new Map();
  const activeByIp = new Map();
  const globalDays = new Map();

  function prune(map, timestamp, ttl) {
    for (const [key, value] of map) {
      if (Array.isArray(value)) {
        const fresh = value.filter((event) => timestamp - event < ttl);
        if (fresh.length) map.set(key, fresh);
        else map.delete(key);
      } else {
        const at = value?.at ?? value;
        if (timestamp - at > ttl) map.delete(key);
      }
    }
  }

  function getVisitor(req, res) {
    if (!secret) return undefined;
    const supplied = parseCookies(req.headers?.cookie).tg_guide;
    if (supplied) {
      const split = supplied.lastIndexOf('.');
      if (split > 0) {
        const id = supplied.slice(0, split);
        const signature = supplied.slice(split + 1);
        if (/^[a-f0-9-]{36}$/i.test(id) && safeEqual(signature, digest(secret, id))) return id;
      }
    }
    const id = randomId();
    const signed = `${id}.${digest(secret, id)}`;
    res.setHeader('Set-Cookie', `tg_guide=${signed}; Path=/api/guide; Max-Age=3600; HttpOnly; Secure; SameSite=Lax`);
    return id;
  }

  function check({ visitor, ip }) {
    const timestamp = now();
    const ipKey = digest(secret || 'disabled', ip);
    prune(visitors, timestamp, HOUR);
    prune(ips, timestamp, HOUR);
    prune(bursts, timestamp, WINDOW);
    prune(globalDays, timestamp, DAY);

    const visitorEvents = visitors.get(visitor) || [];
    const ipEvents = ips.get(ipKey) || [];
    const burstEvents = bursts.get(ipKey) || [];
    const utcDay = new Date(timestamp).toISOString().slice(0, 10);
    const appCount = globalDays.get(utcDay)?.count || 0;
    const active = activeByIp.get(ipKey) || 0;

    const blocked = (events, threshold, window) => {
      if (events.length < threshold) return 0;
      return Math.max(1, Math.ceil((events[0] + window - timestamp) / 1000));
    };
    const retryAfter = Math.max(
      blocked(visitorEvents, 12, HOUR),
      blocked(ipEvents, 12, HOUR),
      blocked(burstEvents, 5, WINDOW),
      active >= 2 ? 15 : 0,
      appCount >= 25 ? Math.max(1, Math.ceil((Date.parse(`${utcDay}T24:00:00Z`) - timestamp) / 1000)) : 0
    );
    if (retryAfter) return { allowed: false, status: 429, retryAfter };

    visitorEvents.push(timestamp);
    ipEvents.push(timestamp);
    burstEvents.push(timestamp);
    visitors.set(visitor, visitorEvents);
    ips.set(ipKey, ipEvents);
    bursts.set(ipKey, burstEvents);
    globalDays.set(utcDay, { count: appCount + 1, at: timestamp });
    activeByIp.set(ipKey, active + 1);
    return { allowed: true, status: 200, retryAfter: 0 };
  }

  function release({ ip }) {
    const ipKey = digest(secret || 'disabled', ip);
    const active = activeByIp.get(ipKey) || 0;
    if (active <= 1) activeByIp.delete(ipKey);
    else activeByIp.set(ipKey, active - 1);
  }

  return { check, release, getVisitor };
}

module.exports = { createRateLimiter, parseCookies };
