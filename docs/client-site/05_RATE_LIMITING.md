# Rate Limiting — Phase 4

Both public Next.js BFF endpoints remain protected:
- `/api/clubs`: default 60 requests / 60 seconds
- `/api/share-prices`: default 90 requests / 60 seconds

Values remain configurable with environment variables.

## Trusted client identity
Phase 4 no longer blindly walks arbitrary forwarded-IP headers in production. Configure exactly one trusted edge/reverse-proxy header through:

`PGA_TRUSTED_CLIENT_IP_HEADER`

Allowed values:
- `cf-connecting-ip`
- `x-vercel-forwarded-for`
- `x-forwarded-for`
- `x-real-ip`

The deployment platform must strip/rebuild the selected header. If no trusted header is configured in production, callers intentionally share a conservative `unknown` bucket rather than allowing spoofed client headers to bypass rate limiting.

Raw client IP strings are SHA-256 hashed before use in Redis/memory keyspace.

## Development
Without distributed Redis, non-production uses a bounded in-process fixed-window store.

## Production
Production fails closed unless both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are configured. The distributed decision uses an atomic increment/expire script and a finite request timeout.

## Response contract
Rate headers include limit, remaining, reset, and policy. Blocked requests include `Retry-After` and a sanitized JSON `RATE_LIMIT_EXCEEDED` error. API success and errors use `Cache-Control: no-store` so a rate-limited response is not accidentally shared by an intermediary cache.
