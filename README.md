# PGA Clubshares Client Website — Phase 5

Premium public Next.js client-facing website for **Prestige Golf Access & Clubshares, Inc.**

## Current public data source

The website now defaults to PGA's shared Google Sheet for the public Club Directory and Share Price market.

```env
PGA_UI_DATA_SOURCE=sheet
PGA_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/1c_RiL5AWpjpXSZh7KnmfCNOGK7fLnGjF/edit?usp=sharing&ouid=114545058470474875217&rtpof=true&sd=true
PGA_GOOGLE_SHEET_GID=
PGA_GOOGLE_SHEET_TAB=August 24, 2026
PGA_GOOGLE_SHEET_TIMEOUT_MS=6000
```

`sheet` is also the default when `PGA_UI_DATA_SOURCE` is omitted.

The Next.js server reads the shared Google-hosted Sheet/workbook directly. `/clubs`, `/share-prices`, Club detail pages, and the homepage Club/market previews therefore do not require the PGA admin/backend API while Sheet mode is active. Browser JavaScript does not call Google directly.

**There is no data fallback in Sheet mode.** The Google requests use `cache: 'no-store'`, no Next.js revalidation cache is used, and a cache-busting request parameter is added. Every server page refresh asks Google for the current source again. `/clubs` and `/share-prices` also trigger a server refresh every 15 seconds while open, so Sheet changes can appear without a manual browser reload. If the Google source cannot be read, the UI displays a source error and does not show bundled JSON, mock data, or admin API data.

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


## Google-hosted XLSX compatibility

The public catalog first tries the live Google Sheets CSV endpoint. If the shared PGA file is an uploaded `.xlsx` opened in Google Sheets compatibility mode and Google returns HTTP 400 for CSV export, the server downloads that **same live Google-hosted workbook** and reads the configured worksheet (`PGA_GOOGLE_SHEET_TAB`, default `August 24, 2026`) directly. This is an alternate transport for the same live source, not a fallback dataset. The visible site still does not call the PGA admin/backend API while `PGA_UI_DATA_SOURCE=sheet`.

`PGA_GOOGLE_SHEET_GID` is optional and should be left blank for the current uploaded Excel file unless the source is converted to a native Google Sheet and a specific `gid` is known.
