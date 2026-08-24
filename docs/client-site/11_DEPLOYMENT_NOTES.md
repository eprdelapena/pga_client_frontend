# Deployment Notes — Phase 4

The project is a standard Next.js App Router application and is not intentionally locked to one hosting vendor. It requires a Node-compatible deployment for the server/BFF code; the package declares Node `>=20.9.0`.

## Typical build
```bash
npm install
npm run build
npm run start
```
A managed Next.js platform may supply its own start/runtime behavior.

## Required production capabilities
- Server-side environment secrets
- Outbound HTTPS access to the existing PGA backend
- Distributed Redis-compatible rate limiting (current implementation supports Upstash Redis REST)
- Stable HTTPS public origin configured as `PGA_SITE_URL`

## Serverless/multi-instance considerations
The in-memory rate limiter is development-only. Production intentionally fails closed without the distributed limiter. Club catalog memory caching is only a short optimization; correctness does not depend on one server instance retaining cache state.

## Trusted client IP
Set `PGA_TRUSTED_CLIENT_IP_HEADER` to exactly the header your hosting edge/reverse proxy owns and sanitizes. Confirm the provider behavior rather than trusting a browser-supplied `x-forwarded-for` value by assumption. If not configured, production groups traffic into the conservative `unknown` bucket.

## Club service account
Use a dedicated account/token with only `club.read` / `ALL`. The Next.js server validates the effective permissions and rejects broader credentials. Never place this credential in a `NEXT_PUBLIC_*` variable.

## Security headers/CSP
`next.config.ts` supplies baseline CSP, frame protection, referrer/permissions policies, content-type protection, COOP and production HSTS. The current CSP intentionally allows inline scripts/styles needed by the Next.js runtime/design. If deployment injects third-party analytics, fonts, media or scripts, update CSP deliberately rather than weakening it globally.

## Monitoring recommendations
Monitor:
- Next.js 5xx/error rate
- PGA backend timeout/unavailability rate
- Redis/Upstash availability
- 429 volume
- Club authentication failures
- sitemap/robots health after deployment
- Core Web Vitals/Lighthouse on representative mobile and desktop routes
