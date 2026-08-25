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

## Phase 5 Home + About company-image refinement source checks
- [x] Home and `/about` source routes remain present
- [x] all referenced company image files exist
- [x] Home/About no longer contain `20+`, `20 years`, `twenty years`, `two decades`, or `over 20` wording
- [x] Home/About use 10 years / approximately a decade consistently
- [x] existing `/api/clubs` and `/api/share-prices` files were not modified
- [x] existing Clubs and Share Price page/component sources were not modified
- [x] new image sections have mobile breakpoints and reduced-motion rules
- [ ] full `npm run lint`, `npm run typecheck`, and `npm run build` — run below if dependencies can be installed in the execution environment

### Execution environment result for this refinement
- `npm ci` — attempted but did not complete within the execution window; offline retry confirmed the required npm packages are not cached (`ENOTCACHED` for `@types/node`).
- `npm run lint` — cannot execute without installed project dependencies (`eslint: not found`).
- `npm run typecheck` — project-level check cannot complete without installed Next/React/Node type dependencies; this is an environment/dependency absence, not a phase-specific diagnostic.
- `npm run build` — cannot execute without installed project dependencies (`next: not found`).
- Source-level fallback validation: all 51 `src/**/*.ts` / `src/**/*.tsx` files transpile with 0 TypeScript syntax diagnostics using the available global TypeScript compiler; all 8 referenced company assets exist; 20-year wording scan passes; intended-change boundary diff passes.

## Home/About above-the-fold refinement

- [x] Change is CSS-only; Home/About JSX content and all BFF/API routes remain unchanged.
- [x] Desktop Home hero no longer uses the original full-viewport minimum height for the company-photo variant.
- [x] Desktop About hero content is center-aligned instead of bottom-aligned, reducing the need to scroll before reading the complete opening message.
- [x] Short-desktop-height fallback rules are present.
- [x] Tablet/mobile compact rules are present.
- [x] Reduced-motion rules from the prior Home/About enhancement remain intact.

## Our Team public directory source checks
- [x] `/our-team` source route exists and defines page metadata.
- [x] Primary and footer navigation contain `Our Team`.
- [x] 17 team profiles are represented once each in the typed team dataset.
- [x] 17 referenced team portrait assets exist under `public/images/team/`.
- [x] Every provided email is rendered as a visible `mailto:` link.
- [x] Every provided landline/mobile value is rendered visibly and linked with `tel:` where present.
- [x] CR / registration numbers are shown directly on the cards when supplied.
- [x] Haidee E. Reyes and Rodezza B. Labrador do not receive an invented mobile number because the supplied screenshot crops do not visibly provide one.
- [x] Cards include long-email overflow handling and 3/2/1-column desktop/tablet/mobile behavior.
- [x] Light/dark mode rules and `prefers-reduced-motion` handling are present.
- [x] `/api/clubs` and `/api/share-prices` were not changed for this feature.
- [ ] Full `npm run lint`, `npm run typecheck`, and `npm run build` — run when project dependencies are available in the execution environment.

### Execution environment result — Our Team
- `npm ci --offline` — cannot install because required packages are not cached (`ENOTCACHED` for `@types/node`).
- Full local `npm run lint`, `npm run typecheck`, and `npm run build` therefore cannot be claimed in this execution environment.
- Fallback source validation: all 53 `src/**/*.ts` / `src/**/*.tsx` files transpile with 0 TypeScript syntax diagnostics using the available global TypeScript compiler; all 17 team image paths resolve; 17 team names are unique; header/footer/sitemap integrations are present.
## Our Team content-first check
- [x] `/our-team` no longer renders the removed hero/intro copy.
- [x] Leadership & Directors directory is the first page content beneath the fixed header.
- [x] Existing team data and portrait paths remain unchanged.
- [x] `/our-team` uses the light/content-first header state at the top of the page.



## Company logo + favicon update validation
- [x] Supplied PGA 10th-anniversary logo processed into a transparent-corner 512×512 web asset without redrawing/replacing the supplied artwork.
- [x] Header references the new company logo and preserves the existing company wordmark/navigation behavior.
- [x] New PNG/ICO favicon variants exist at 64, 192, 512, Apple-touch, and multi-size ICO outputs.
- [x] Old text-only `src/app/icon.tsx` favicon generator removed to avoid conflicting PGA-placeholder icon metadata.
- [x] Manifest and root metadata reference the new favicon/app-icon assets.
- [x] 52 TypeScript/TSX source files transpile with zero syntax diagnostics using the available global TypeScript compiler.
- [x] Club and Share Price API route source files were not modified by this branding update.
- [ ] Full `npm run build` could not execute in this artifact environment because project dependencies are not installed (`next: not found`). No build success is claimed.

## Light-mode blue alternation + email correction validation
- [x] `pgaclubshares@gmail.com` is the first/primary company email and therefore appears in the top contact bar/mobile menu/structured metadata where the primary company email is used.
- [x] `info@pgaclubshares.ph` remains available as the secondary company email on multi-email contact surfaces.
- [x] Exact unused generic address `info@pgaclubshares.com` no longer exists in `src/`.
- [x] Existing individual team-member `@pgaclubshares.com` addresses remain unchanged.
- [x] Direct contact top bar uses the blue secondary treatment with white copy.
- [x] Home service marquee uses the blue secondary treatment with white copy.
- [x] Alternating pale-blue supporting surfaces are explicitly defined for Home, About, Services, Clubs, Share Prices, Contact, Our Team, and Club detail pages.
- [x] Apple-green filled brand sections retain white high-contrast copy.
- [x] Dark-theme core variable block hash is unchanged from the incoming baseline.
- [x] CSS brace balance passes.
- [x] Club and Share Price API route source hashes remain unchanged from the incoming baseline.
- [ ] Full `npm run lint`, `npm run typecheck`, and `npm run build` require the project dependency tree; this artifact does not include `node_modules`.
