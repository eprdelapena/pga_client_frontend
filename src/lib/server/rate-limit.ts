import {createHash} from 'node:crypto';
import type {NextRequest} from 'next/server';
import {rateLimitValue, rateLimitWindowSeconds, trustedClientIpHeader} from '@/lib/server/env';

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

interface MemoryEntry {count: number; resetAt: number}
const memoryStore = new Map<string, MemoryEntry>();

export class RateLimitUnavailableError extends Error {}

function normalizeAddress(raw: string | null): string | null {
  const first = raw?.split(',')[0]?.trim();
  if (!first || first.length > 128) return null;
  if (!/^[0-9a-fA-F:.]+$/.test(first)) return null;
  return first.toLowerCase();
}

function clientIdentity(request: NextRequest): string {
  const header = trustedClientIpHeader();
  if (!header) return 'unknown';
  const normalized = normalizeAddress(request.headers.get(header));
  if (!normalized) return 'unknown';
  // Avoid persisting raw client addresses in Redis keys/log-style keyspaces.
  return createHash('sha256').update(`pga-public:${normalized}`).digest('hex').slice(0, 24);
}

function config(scope: 'clubs' | 'share-prices') {
  return {windowSeconds: rateLimitWindowSeconds(), limit: rateLimitValue(scope)};
}

function localDecision(key: string, limit: number, resetAt: number): RateLimitDecision {
  const now = Date.now();
  const existing = memoryStore.get(key);
  const entry = !existing || existing.resetAt <= now
    ? {count: 0, resetAt}
    : existing;
  entry.count += 1;
  memoryStore.set(key, entry);
  if (memoryStore.size > 5000) {
    for (const [candidate, value] of memoryStore) if (value.resetAt <= now) memoryStore.delete(candidate);
  }
  return {allowed: entry.count <= limit, limit, remaining: Math.max(0, limit - entry.count), resetAt: entry.resetAt};
}

async function distributedDecision(key: string, limit: number, ttlSeconds: number, resetAt: number): Promise<RateLimitDecision> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, '');
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new RateLimitUnavailableError('Distributed rate limiter is not configured.');

  const script = 'local c=redis.call("INCR",KEYS[1]); if c==1 then redis.call("EXPIRE",KEYS[1],ARGV[1]); end; return c';
  const response = await fetch(url, {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify(['EVAL', script, '1', key, String(ttlSeconds)]),
    cache: 'no-store',
    signal: AbortSignal.timeout(3_000),
  }).catch(() => {
    throw new RateLimitUnavailableError('Distributed rate limiter request failed.');
  });
  if (!response.ok) throw new RateLimitUnavailableError('Distributed rate limiter request failed.');
  const payload = await response.json() as {result?: number | string};
  const count = Number(payload.result);
  if (!Number.isFinite(count)) throw new RateLimitUnavailableError('Distributed rate limiter returned an invalid response.');
  return {
    allowed: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    resetAt,
  };
}

export async function checkRateLimit(request: NextRequest, scope: 'clubs' | 'share-prices'): Promise<RateLimitDecision> {
  const {limit, windowSeconds} = config(scope);
  const identity = clientIdentity(request);
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const bucket = Math.floor(now / windowMs);
  const resetAt = (bucket + 1) * windowMs;
  const ttlSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000) + 1);
  const key = `pga:rl:${scope}:${identity}:${bucket}`;

  const hasDistributed = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  if (hasDistributed) return distributedDecision(key, limit, ttlSeconds, resetAt);
  if (process.env.NODE_ENV === 'production') {
    // Fail closed: public APIs must not silently lose shared rate limiting in a
    // multi-instance/serverless production environment.
    throw new RateLimitUnavailableError('Production distributed rate limiter is not configured.');
  }
  return localDecision(key, limit, resetAt);
}

export function rateLimitHeaders(decision: RateLimitDecision): HeadersInit {
  const resetSeconds = Math.max(1, Math.ceil((decision.resetAt - Date.now()) / 1000));
  return {
    'RateLimit-Limit': String(decision.limit),
    'RateLimit-Remaining': String(decision.remaining),
    'RateLimit-Reset': String(Math.ceil(decision.resetAt / 1000)),
    'RateLimit-Policy': `${decision.limit};w=${Math.max(1, resetSeconds)}`,
    ...(decision.allowed ? {} : {'Retry-After': String(resetSeconds)}),
  };
}
