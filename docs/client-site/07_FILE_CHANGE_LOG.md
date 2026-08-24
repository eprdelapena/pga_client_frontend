# File Change Log — Phase 4

No existing PGA backend or admin frontend file was modified.

## New
- `src/lib/server/env.ts` — centralized production-safe environment parsing and trusted client-IP header selection.
- `src/lib/site.ts` — canonical URL and reusable page-metadata helpers.
- `src/lib/client/reveal-observer.ts` — shared reveal IntersectionObserver.
- `src/app/sitemap.ts` — public sitemap with graceful dynamic Club entries.
- `src/app/robots.ts` — crawler policy and API exclusion.
- `src/app/manifest.ts` — web app metadata.
- `src/app/opengraph-image.tsx` — frontend-owned PGA social preview graphic.
- `src/app/icon.tsx` — frontend-owned PGA website monogram icon.
- `src/app/error.tsx` and `src/app/global-error.tsx` — sanitized route/root error experiences.
- `docs/client-site/10_PRODUCTION_CHECKLIST.md`
- `docs/client-site/11_DEPLOYMENT_NOTES.md`

## Major changes
- `src/app/layout.tsx` — root SEO, canonical/social metadata and Organization JSON-LD.
- all public page metadata — canonical page metadata and dynamic Club canonical metadata.
- `src/lib/catalog.ts` — server-first initial market aggregation so initial page renders do not call the site's own public BFF.
- `src/components/live-market.tsx` — accepts server-seeded payload and uses public BFF for retry/refresh when required.
- `src/lib/server/backend.ts` — centralized env parsing and finite protected Club revalidation.
- `src/lib/server/rate-limit.ts` — explicit trusted proxy header, hashed identity, bounded distributed request timeout.
- `src/lib/server/api-response.ts` — consistent no-store/security response headers.
- `src/components/site/header.tsx` — requestAnimationFrame scroll work, resize-safe menu close, hidden-menu tab-order protection.
- `src/components/motion/reveal.tsx` — shared reveal observer.
- `src/app/not-found.tsx` — premium 404.
- `src/app/globals.css` — accessibility, 1024px navigation, mobile-motion and error-page hardening.
- supplied Club PNGs — resized only when over 1024px and losslessly re-encoded/optimized as PNG; mapping filenames unchanged.
- `.env.example`, `README.md`, package metadata and docs updated for the release candidate.

## Phase 5 validation fix
- `public/images/hero/golf-course-driver.jpeg` — supplied hero background photo
- `src/data/mock/clubs.ts` — August 24, 2026 reference Club directory identities
- `src/data/mock/share-prices.ts` — spreadsheet-derived Seller/Lessor/Buyer/Lessee reference values
- `src/components/hero-market-snapshot.tsx` — above-the-fold interactive market entry point
- `src/components/live-market.tsx` — four-sided market filters/sorts and reference-source labeling
- `src/components/market-list.tsx` — Seller/Lessor/Buyer/Lessee desktop/mobile presentation
- `src/components/club-market-cards.tsx` — four-sided Club detail market cards
- `src/components/market-state.tsx` — six-column skeleton alignment
- `src/app/page.tsx` — supplied hero photo and immediate Share Price preview
- `src/app/share-prices/page.tsx` — updated market terminology and snapshot context
- `src/app/globals.css` — hero photo/market board and responsive six-column market styling
- `src/lib/catalog.ts`, `src/lib/server/env.ts` — mock/reference mode defaults unless live is explicit
- `src/lib/market-client.ts` — mock rows remain visible by Club name even without a mapped logo

## Phase 5 design restoration
- Restored `src/app/page.tsx` to the Phase 4 homepage composition.
- Restored the Phase 4 `src/app/globals.css` visual baseline and retained only the responsive six-column market layout required by Seller/Lessor/Buyer/Lessee data.
- Removed `src/components/hero-market-snapshot.tsx` and the Phase 5 hero photo asset because the previous hero design is preferred.

## Phase 5 asset-only update — batch 3
- Added 8 new files under `public/images/clubs/` from `newest_enhanced_club_images_only (1).zip`.
- Updated `src/config/club-assets.ts` with 8 approved mappings and reviewed exact-name aliases.
- Did not replace or modify any pre-existing Club logo asset.
- No mock Club records, market values, routes, API behavior, visual layout, or animations were changed.
