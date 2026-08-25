# Suggested Next Prompt — after Home + About company-image refinement

Continue only from:

```text
pga-client-phase-05-home-about-company-images.zip
```

Treat that ZIP as the only client-facing Next.js baseline.

First read all `docs/client-site/*.md`. Preserve the existing Next.js BFF architecture, Club directory, Club details, Share Price data source, Seller/Lessor/Buyer/Lessee market behavior, search/filter/sort behavior, dark/light theme, security/rate limiting, metadata, and all Home/About company photography introduced in the current baseline.

Recommended next scope: **runtime validation / screenshot-driven polish only**. Run `npm install`, `npm run lint`, `npm run typecheck`, and `npm run build`, then smoke-test `/`, `/about`, `/clubs`, `/share-prices`, `/services`, and `/contact` on desktop/tablet/mobile. Fix only verified errors, visual regressions, overflow, accessibility problems, or deployment blockers. Do not redesign unrelated pages or modify the PGA backend/admin system unless explicitly requested.

Return the complete runnable Next.js project ZIP, not a patch-only archive, and append all verified changes to the existing phase tracker, file change log, and testing checklist.
