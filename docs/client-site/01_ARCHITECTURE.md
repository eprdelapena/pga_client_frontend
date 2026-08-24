# Architecture — Phase 4

```text
PUBLIC BROWSER
  -> NEXT.JS PUBLIC WEBSITE
       -> SERVER COMPONENT DATA SERVICES
       -> PURPOSE-SPECIFIC PUBLIC BFF (/api/clubs, /api/share-prices)
  -> EXISTING PGA LOOPBACK BACKEND
  -> DATABASE
```

## Important boundary
Server-rendered pages call internal server data services directly. They do **not** fetch the same site's `/api/*` endpoints merely to reach data already available in-process. This avoids unnecessary HTTP loops and avoids consuming public rate-limit quotas during initial server rendering.

Browser retries/interactive public API use remain purpose-specific through `/api/clubs` and `/api/share-prices`.

## Clubs
The existing backend Club endpoint remains `GET /api/v1/clubs`, protected by JWT plus `club.read`. The client site accepts only a least-privileged server credential with `club.read` / `ALL` and rejects credentials with unrelated permissions. Club responses are normalized into public-safe objects with raw Mongo identifiers and admin/audit fields removed.

The visible `/clubs` directory only includes real Clubs with an explicitly approved local visual mapping. Unmapped Clubs can still participate server-side in authoritative Share Price identity joins.

## Share Prices
Published prices come from `GET /api/v1/public/share-prices`. The server normalizes them, removes raw internal IDs, and joins authoritative Club identity when the protected Club catalog is available.

## Caching
- Club upstream pages: finite `PGA_CLUB_REVALIDATE_SECONDS` (default 300s) plus a bounded server catalog TTL.
- Share Prices: finite `PGA_SHARE_PRICE_REVALIDATE_SECONDS` (default 60s).
- Public BFF responses themselves are `no-store`; upstream/server caches provide freshness without allowing user-specific rate-limit responses to be shared.

## SEO/data routes
Next metadata routes provide sitemap, robots, icon, Open Graph image, and manifest. Dynamic Club sitemap entries use the same safe Club server data layer and degrade to static routes if the protected catalog is unavailable.
