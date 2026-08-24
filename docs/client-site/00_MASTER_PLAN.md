# Client Site Master Plan — Phase 4 Release Candidate

This is a separate public Next.js application for Prestige Golf Access & Clubshares, Inc. The existing PGA admin frontend and LoopBack backend remain operationally independent and unchanged.

## Current public scope
- Premium corporate homepage and company storytelling
- Real Club directory using approved mapped visual identities
- Public Club detail pages for mapped Clubs
- Published indicative Share Prices through the existing PGA public market API
- Services, About and Contact information
- Purpose-specific `/api/clubs` and `/api/share-prices` BFF routes

## Phase 4 completed scope
- Production metadata/canonical strategy
- `/sitemap.xml`, `/robots.txt`, web manifest, generated site monogram icon and Open Graph image
- Factual Organization JSON-LD
- Premium 404 plus route/global error boundaries
- Security-header/CSP review
- Public API/rate-limit/cursor/privacy audit
- Explicit trusted-proxy client-IP configuration
- Server-first market seeding to avoid same-site HTTP loops on initial render
- Separate finite Club and Share Price freshness strategies
- Motion/scroll/accessibility/responsive performance refinements
- Club source-image optimization
- Production checklist and deployment notes

## Next stage
Phase 5 is **release validation / bug fixes only** after local and deployed runtime verification. No new business feature should be added automatically.
