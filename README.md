# PGA Clubshares Client Website — Phase 5

Premium public Next.js client-facing website for **Prestige Golf Access & Clubshares, Inc.**

## Current public data source

The website now defaults to PGA's shared Google Sheet for the public Club Directory and Share Price market.

```env
PGA_UI_DATA_SOURCE=sheet
PGA_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/1c_RiL5AWpjpXSZh7KnmfCNOGK7fLnGjF/edit?usp=sharing&ouid=114545058470474875217&rtpof=true&sd=true
PGA_GOOGLE_SHEET_GID=0
PGA_GOOGLE_SHEET_REVALIDATE_SECONDS=60
PGA_GOOGLE_SHEET_TIMEOUT_MS=6000
```

`sheet` is also the default when `PGA_UI_DATA_SOURCE` is omitted.

The Next.js server reads the shared Sheet through Google's CSV export endpoint. `/clubs`, `/share-prices`, Club detail pages, and the homepage Club/market previews therefore do not require the PGA admin/backend API while Sheet mode is active. Browser JavaScript does not call the Google Sheet directly.

The Sheet must remain readable through its shared link for live updates to appear. A bundled snapshot generated from the supplied PGA workbook is retained only as a resilience fallback if Google is temporarily unreachable or the shared CSV cannot be read. Sheet mode never falls back to the admin API.

If PGA later creates a new worksheet/tab for a newer market update, set `PGA_GOOGLE_SHEET_GID` to that tab's `gid` from the Google Sheet URL.

## Share Price behavior

- `/share-prices` groups records by Club.
- Every share class is visible immediately below its Club; there are no expand/collapse controls or hidden rows.
- Seller, Lessor, Buyer, and Lessee values are supported.
- Blank values display as `—`.
- `Inquire` is preserved as an inquiry state rather than converted to zero.
- Search, market-side filters, sorting, animations, and responsive layouts remain active.
- The malformed source value `1,100,00` is intentionally ignored rather than guessed.

## Club Directory behavior

- Club names, share classes, holes, address, developer, and market rows are derived from the Google Sheet.
- Approved local Club logos remain the visual-asset source of truth and are never replaced by the Sheet.
- `/clubs` continues to show Clubs with confirmed local visual mappings; market rows for other Clubs can still appear by name in `/share-prices`.

## Existing design and assets

The preferred Phase 4 editorial homepage design, animations, content-first `/clubs`, `/share-prices`, and `/contact` layouts, and all previously approved Club image mappings remain intact.

## Future admin API cut-over

The existing LoopBack/admin API integration is intentionally preserved but dormant. It is activated only when you explicitly set:

```env
PGA_UI_DATA_SOURCE=live
```

Until then, the public website does not need `PGA_BACKEND_BASE_URL`, service-account credentials, MongoDB access, or the admin system to render Club and Share Price data.

## Local run

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run dev -- -p 3001
```
