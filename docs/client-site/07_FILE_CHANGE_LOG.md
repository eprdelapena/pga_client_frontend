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

### Phase 5 grouped Share Price directory refinement
- Updated `src/components/market-list.tsx` so the full `/share-prices` experience groups share classes under one Club identity instead of repeating the same Club on every row.
- Added per-Club expand/collapse and global Expand all / Collapse all controls; single-share-class Clubs remain fully visible without an extra interaction.
- Preserved Seller, Lessor, Buyer, Lessee, search, filters, sorting, Club links, and compact homepage market behavior.
- Added responsive grouped-market styling in `src/app/globals.css`, including desktop market matrices and mobile 2×2 price cards.
- Updated `/share-prices` explanatory copy to reflect the grouped interaction.

## Share-price visibility refinement
- Removed the collapsible/grouped Club market directory from `/share-prices`.
- Every share class now renders immediately as its own visible row with Seller, Lessor, Buyer, and Lessee values.
- Kept search, market-side filters, sorting, Club links, logo mappings, responsive layouts, and existing animations.
- Added a compact inline Share Class badge and purpose-built mobile price cards without any expand/collapse interaction.

## Club detail market split — Share Rights / Playing Rights
- Redesigned `src/app/clubs/[slug]/page.tsx` hero market cues and Club market copy.
- Redesigned `src/components/club-market-cards.tsx` so every share class visibly separates ownership transactions (Seller/Buyer) from playing-access transactions (Lessor/Lessee).
- Added responsive, reduced-motion-safe hover, stagger, flow-line, orbit, and panel animations in `src/app/globals.css`.
- No changes to Google Sheet source, no-cache behavior, API contracts, or existing Club asset mappings.

## Phase 5 Home + About company-image/content enhancement
- `src/app/page.tsx` — redesigned Home hero photography, 10-year proof, company image collage, buy/sell/lessor/lessee service paths, and team-photo closing CTA while preserving Club and Share Price sections.
- `src/app/about/page.tsx` — redesigned About hero, decade story, buyer/seller/lessee/lessor content, approach section, editorial company gallery, decade band, and closing CTA.
- `src/content/company.ts` — removed the outdated twenty-year organization statement and replaced it with factual approximately-a-decade wording used by Home/About.
- `src/app/globals.css` — responsive company-photo layouts, hover/reveal refinements, dark-theme compatibility, and reduced-motion handling.
- `public/images/company/*.webp` — eight curated, optimized company/event assets from `new_pga_enhanced_images_only.zip`.
- `docs/client-site/02_DESIGN_SYSTEM.md`, `04_ASSET_MAPPING.md`, `06_PHASE_TRACKER.md`, `07_FILE_CHANGE_LOG.md`, `08_TESTING_CHECKLIST.md`, `09_NEXT_PROMPT.md` — phase documentation updated.
- No API route, PGA backend integration, Club data source, Share Price data source, filtering, search, environment variable, or server-only BFF contract was changed.

## Phase 5 — Home/About above-the-fold refinement

- `src/app/globals.css`
  - Reduced Home hero vertical footprint on desktop and short laptop viewports.
  - Raised and compacted the Home company-photo composition so the primary copy, CTAs, and proof points fit more naturally in the initial viewport.
  - Changed the About hero from a bottom-heavy composition to a centered desktop composition and reduced headline/support spacing.
  - Added responsive compact-height rules for tablet/mobile without changing page content or imagery.
- No API routes, catalog logic, Share Price logic, Clubs logic, or server/BFF files were changed.

## Phase 5 — Our Team public directory
- `src/app/our-team/page.tsx` — new premium `/our-team` page with compact hero, Officers and Salesmen introduction, visible public contact/registration details, grouped team cards, responsive layout, and reduced-motion-safe reveal/hover animation.
- `src/content/team.ts` — typed source dataset for 17 supplied officers/sales personnel; only contact fields visible in the supplied references are included.
- `public/images/team/*.webp` — 17 mapped team portraits: 7 from `last_batch_enhanced_portraits_only(1).zip` and 10 faithful crops from the supplied legacy team-directory screenshots where separate portrait files were not provided.
- `src/components/site/header.tsx` — added `Our Team` to primary/mobile navigation.
- `src/components/site/footer.tsx` — added `Our Team` to footer navigation.
- `src/app/sitemap.ts` — added `/our-team` public sitemap entry.
- `src/app/globals.css` — Our Team hero/card/contact/responsive/dark-mode styles plus a small desktop navigation gap rebalance for the additional route.
- Existing PGA BFF/API routes, Club data, Share Price data, filters, search, and admin/backend projects were not modified.
## Our Team content-first refinement
- Removed the `/our-team` hero and introductory marketing blocks so the team directory is visible immediately on page load.
- Added content-first top spacing beneath the fixed header and enabled the light-page header treatment for `/our-team`.
- Preserved all team profiles, enhanced portraits, contact details, animations, and downstream CTA content.



## Phase 5 — Company logo + favicon update
- `src/components/site/header.tsx` — replaced the placeholder PGA monogram with the supplied official 10th-anniversary PGA company logo while preserving the existing wordmark text and navigation behavior.
- `public/images/brand/pga-10th-anniversary-logo.png` — web-optimized version of the supplied company logo with transparent outer corners for clean header presentation.
- `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico`, `public/favicon*.png`, `public/favicon.ico`, `public/apple-touch-icon.png` — favicon/app-icon variants generated from the same supplied logo.
- `src/app/layout.tsx`, `src/app/manifest.ts` — favicon/app-icon metadata updated to use the supplied company identity.
- `src/app/globals.css` — responsive header-logo sizing and subtle existing-brand hover treatment.
- Removed the old text-only `src/app/icon.tsx` favicon generator.
- No page content, Club/Share Price logic, API/BFF routes, team profiles, or backend integration was changed.

## Light-mode blue alternation + company email correction
- `src/app/globals.css` — kept apple green as the dominant light-mode brand color while making blue a visible secondary color for the direct-contact top bar, Home scrolling service strip, and alternating supporting sections across Home, About, Services, Clubs, Share Prices, Contact, Our Team, and Club detail pages. Blue surfaces use dark readable copy; medium-blue utility bands use white copy. Night mode rules remain unchanged.
- `src/content/company.ts` — removed the unused `info@pgaclubshares.com`; company emails are now `pgaclubshares@gmail.com` (primary) and `info@pgaclubshares.ph` (secondary).
- `src/content/team.ts` — team profiles that previously used the generic `info@pgaclubshares.com` fallback now use the primary company Gmail address; individual salesperson email addresses remain unchanged.
- `src/components/site/header.tsx`, `src/app/layout.tsx`, `src/app/manifest.ts` — light browser/theme metadata now follows the dominant apple-green brand instead of the earlier blue experiment.
- No Club/Share Price API route, BFF data contract, search/filter behavior, backend integration, portrait mapping, or Night-mode palette was changed.


## Home verified-copy + Services CTA visibility
- Replaced unsupported Home numeric proof values with qualitative `Personalized` and `End-to-end` service statements.
- Removed the numeric `4 paths` proof copy and numbered service-path labels.
- Kept `10 years` as the only numeric Home experience claim in this section.
- Added explicit light-mode contrast rules for the Services CTA buttons (`View market prices` and `Contact PGA`).
- No API/BFF, market data, routing, or dark-mode behavior changed.
