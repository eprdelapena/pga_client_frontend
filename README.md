# PGA Clubshares Client Website — Phase 5 Validation Fix

Premium public Next.js client-facing website for **Prestige Golf Access & Clubshares, Inc.**

## What changed in this validation fix
- Keeps the Phase 4 security/SEO/production-hardening work intact.
- Defaults the client UI to **local hardcoded reference data** unless `PGA_UI_DATA_SOURCE=live` is explicitly set.
- Replaces the Phase 0 fictional Share Price fixture with the user-supplied **August 24, 2026 PGA Share Price Update workbook** snapshot.
- Includes **Seller, Lessor, Buyer, and Lessee** market fields. The supplied workbook contains the Lessee column but currently has no populated Lessee values.
- Makes Share Prices visible immediately on the homepage and keeps the full `/share-prices` page interactive with search, five market-side filters, and sorting.
- Uses the supplied golf-course photo as the homepage hero visual while retaining the premium reveal, floating-logo, orbit, hover, and market-row motion system.
- Keeps the visual Club Directory limited to confirmed local logo mappings; Share Price rows can still appear by Club name without a logo.

## Local mock/reference run
Create `.env.local` in the project root with at least:

```env
PGA_UI_DATA_SOURCE=mock
```

Then run:

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run dev -- -p 3001
```

In mock/reference mode the visible Club/Share Price experience does **not** require the LoopBack backend, MongoDB, service-account credentials, or Upstash.

## Live mode later
Set `PGA_UI_DATA_SOURCE=live` only when you intentionally want the website to use the prepared Next.js BFF → PGA backend integration. See `.env.example`, `docs/client-site/10_PRODUCTION_CHECKLIST.md`, and `docs/client-site/11_DEPLOYMENT_NOTES.md` for production configuration.

## Phase 5 design restoration

The Phase 4 homepage visual composition has been restored because it is the preferred design direction. The Phase 5 functional market improvements remain: mock-first data, the supplied August 24 reference dataset, and Seller/Lessor/Buyer/Lessee market columns, filters, sorting, responsive market layouts, and Club-detail market fields. The supplied golf photo is no longer used in the hero.

## Additional Club asset batch 2
Added six newly supplied Club visual assets from `new_enhanced_club_images_only.zip` without replacing any existing project logo: Makati Sports Club, Manila Golf & Country Club, Manila Polo Club, Manila Southwoods Golf & Country Club, Montemar Beach Club, and Mount Malarayat Golf & Country Club. The local mock Club records already existed, so only visual asset files and centralized mappings were added.
