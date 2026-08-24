# Production Checklist

## Environment
- [ ] `PGA_SITE_URL` set to final HTTPS public origin
- [ ] `PGA_BACKEND_BASE_URL` points to the correct PGA backend
- [ ] dedicated least-privileged Club reader configured (`club.read`, `ALL`, no unrelated permission) or verified equivalent token
- [ ] long unique `PGA_PUBLIC_CURSOR_SECRET` configured
- [ ] finite `PGA_UPSTREAM_TIMEOUT_MS`
- [ ] Club and Share Price revalidation values reviewed
- [ ] public API rate limits reviewed
- [ ] `PGA_TRUSTED_CLIENT_IP_HEADER` matches the actual edge/reverse-proxy header and the proxy strips/rebuilds it
- [ ] `UPSTASH_REDIS_REST_URL` configured
- [ ] `UPSTASH_REDIS_REST_TOKEN` configured
- [ ] `PGA_UI_DATA_SOURCE=live`
- [ ] no `.env`, `.env.local`, production secret or credential committed

## Build
- [ ] `npm install`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run dev` local smoke test

## Functional smoke tests
- [ ] `/`
- [ ] `/clubs`
- [ ] at least one valid `/clubs/[slug]`
- [ ] unknown Club slug returns polished 404
- [ ] `/share-prices` live feed/search/filter/sort
- [ ] `/services`
- [ ] `/about`
- [ ] `/contact` phone/email links
- [ ] `/api/clubs` valid request
- [ ] `/api/share-prices` valid request
- [ ] invalid public query rejected
- [ ] invalid cursor rejected without internal details
- [ ] rate-limit 429 and `Retry-After`
- [ ] upstream outage/timeout shows sanitized UI

## SEO/public metadata
- [ ] canonical URLs use production origin
- [ ] `/sitemap.xml`
- [ ] `/robots.txt`
- [ ] `/manifest.webmanifest`
- [ ] `/opengraph-image`
- [ ] generated PGA website icon
- [ ] Organization JSON-LD validates

## Responsive/accessibility
- [ ] 1440×900
- [ ] 1280×800
- [ ] 1024×768
- [ ] 768×1024
- [ ] 430×932
- [ ] 390×844
- [ ] 375×812
- [ ] 320×568
- [ ] keyboard-only navigation
- [ ] visible focus states
- [ ] reduced-motion OS setting
- [ ] no horizontal overflow

## Deployment
- [ ] HTTPS/SSL active
- [ ] DNS points to correct deployment
- [ ] production logs configured
- [ ] application/error monitoring configured
- [ ] rate-limit store connectivity monitored
- [ ] backend availability/timeouts monitored
- [ ] final deployed smoke test after DNS/SSL
