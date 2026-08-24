# Testing Checklist — Phase 4

## SOURCE-VALIDATED
- [x] global TypeScript compiler source check with ambient Next/React stubs
- [x] all `@/` source alias imports resolve
- [x] all referenced mapped Club image files exist
- [x] `/`, `/clubs`, `/clubs/[slug]`, `/share-prices`, `/services`, `/about`, `/contact` source routes exist
- [x] `/api/clubs` and `/api/share-prices` remain purpose-specific and rate limited
- [x] no generic public proxy route exists
- [x] public query allowlists still reject arbitrary LoopBack filter objects
- [x] public Club/Share Price DTO definitions omit raw Mongo IDs
- [x] encrypted cursor implementation remains server-only and scoped
- [x] production limiter remains fail-closed without distributed Redis
- [x] trusted forwarded-IP header is now explicit in production
- [x] root/page canonical metadata, sitemap, robots, manifest, icon and Open Graph source files exist
- [x] reduced-motion and focus-visible rules present
- [x] real secret files are excluded from release packaging
- [x] supplied Club logo mappings remain unchanged

## RUNTIME-VALIDATED
No full Next.js runtime validation is claimed in this environment because project dependencies are not installed.

## USER MUST VERIFY LOCALLY
Run:
```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run dev
```

Then smoke-test at minimum:
- all public routes
- both public APIs
- real Club service credential behavior
- live Share Price feed
- Redis/Upstash 429 behavior
- sitemap/robots/Open Graph/icon routes
- desktop 1440/1280/1024
- tablet 768
- mobile 430/390/375/320
- keyboard navigation and mobile menu
- reduced-motion mode
- malformed/empty/unavailable market states
