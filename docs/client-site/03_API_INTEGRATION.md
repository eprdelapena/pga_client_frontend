# API Integration — Phase 2

## Existing protected Clubs endpoint — source verified

`GET /api/v1/clubs`

Backend controller behavior:
- `@authenticate('jwt')`
- permission: `club.read`
- effective grant required
- allow-listed backend query fields: `limit`, `cursor`, `status`, `region`, `clubCode`, `q`
- order: `updatedAt DESC`, `id DESC`
- cursor/keyset page envelope
- response: full backend `Club` records, including embedded share classes

Backend Club fields observed in source include: `id`, `clubCode`, `name`, `nameNormalized`, optional description/holes/address/developer/region, embedded `shareClasses`, status and timestamps.

### Phase 2 public BFF
`GET /api/clubs`

Public query allow-list:
- `limit`
- `cursor`
- `region`
- `clubCode`
- `q`

The BFF always injects `status=ACTIVE`. Public callers cannot request archived Club masters or forward arbitrary LoopBack filters.

The BFF returns a normalized `PublicClubEnvelope`; raw Club ObjectIds and admin-only metadata are removed.

## Authentication strategy
The backend source contains standard username/password login at `POST /api/v1/auth/login` and JWT bearer authentication. It does not contain a dedicated machine-client OAuth flow.

Phase 2 supports a dedicated server-only service user using that existing contract. The deployment owner must provision that user with only `club.read` (ALL scope). The site does not create an authentication bypass and does not change backend authorization.

## Existing public Share Price endpoint — source verified

`GET /api/v1/public/share-prices`

Authentication: none.

Backend accepted query fields:
- `limit`
- `cursor`
- `clubId`
- `shareClassCode`

Backend public projection:
- `id`
- `clubId`
- `shareClassCode`
- buying/selling values subject to inquire-only flags
- `lesseePrice`
- `lessorPrice`
- inquire-only flags
- currency
- effective/published/updated dates

Visibility is already constrained by backend logic to published prices for active Club/share-class pairs with effective date <= current time.

### Phase 2 public BFF
`GET /api/share-prices`

Public browser query allow-list is narrower:
- `limit`
- `cursor`
- `shareClassCode`

`clubId` is intentionally not accepted from public callers in Phase 2. Club detail pages filter by internal Club id server-side without revealing it.

## Authoritative join
When the read-only Club integration is configured, Phase 2 builds a server-only internal-id map from ACTIVE Clubs and joins each public price record by `SharePrice.clubId`. The browser receives the authoritative Club name and optional approved logo/slug, but not the raw id.

The Phase 1 `PGA_PUBLIC_CLUB_ID_MAP_JSON` workaround has been removed as a production identity source.

## Phase 3 regression note
Phase 3 did not change the Club or Share Price API contracts, public query allow-lists, server-side normalization, service credential flow, or Club-to-Share-Price join. The work is presentation/content only around the existing Phase 2 integration.

## Phase 4 hardening
- Initial homepage and Share Price page data is now seeded directly from internal server data services instead of making a same-site HTTP request to `/api/share-prices` during first render.
- Browser retry/refresh remains purpose-specific through the public BFF.
- Protected Club pages use finite Club revalidation; public Share Prices retain a shorter finite revalidation window.
- Public BFF responses remain `no-store`, while upstream server data uses finite caching.
- Client-IP trust for public API rate limiting is now deployment-configured instead of automatically trusting all forwarded headers.
- Public API error responses include consistent no-store/content-type protections and retain sanitized error bodies.
