# Suggested Next Prompt — after Our Team public directory

Continue only from:

```text
pga-client-phase-05-apple-green-blue-alternating-email-fixed.zip
```

Treat that ZIP as the only client-facing Next.js baseline.

First read all `docs/client-site/*.md`. Preserve the existing Next.js BFF architecture, Club directory, Club details, Share Price data source, Seller/Lessor/Buyer/Lessee market behavior, search/filter/sort behavior, dark/light theme, security/rate limiting, metadata, Home/About company photography, and the new `/our-team` public directory with its supplied officer/salesperson contact details and portrait mappings.

Recommended next scope: **runtime validation / screenshot-driven polish only**. Run `npm install`, `npm run lint`, `npm run typecheck`, and `npm run build`, then smoke-test `/`, `/about`, `/our-team`, `/clubs`, `/share-prices`, `/services`, and `/contact` on desktop/tablet/mobile. Fix only verified errors, visual regressions, overflow, accessibility problems, or deployment blockers. Do not redesign unrelated pages or modify the PGA backend/admin system unless explicitly requested.

Return the complete runnable Next.js project ZIP, not a patch-only archive, and append all verified changes to the existing phase tracker, file change log, and testing checklist.
