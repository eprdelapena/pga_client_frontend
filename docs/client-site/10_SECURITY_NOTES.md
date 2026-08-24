# Security Notes — Phase 4

- Existing PGA backend/admin authorization remains unchanged.
- Protected Clubs remain JWT + `club.read`; there is no public-auth bypass.
- Preferred Club integration credential is a dedicated backend user with only `club.read` and `ALL` scope. Broader credentials are rejected.
- Backend URL, service credentials, JWT/token, Redis credentials and cursor secret remain server-only.
- Public Club DTOs remove Mongo ids and admin/audit/ownership/team metadata.
- Public Share Price DTOs remove raw price and Club ObjectIds; internal IDs are used only for the server join.
- Public `/api/share-prices` does not accept raw `clubId` filters.
- Public `/api/clubs` forces ACTIVE discovery and does not expose arbitrary LoopBack `where/include/fields/order/filter` passthrough.
- No generic proxy/user-selected upstream URL exists.
- Public pagination cursors remain AES-256-GCM wrapped and endpoint-scoped.
- Both public BFF endpoints are rate limited. Production fails closed without distributed Redis.
- Production client-IP trust is explicit through one configured proxy header; arbitrary forwarded headers are not automatically trusted.
- Raw IP strings are hashed before becoming limiter keys.
- Upstream fetches have finite timeouts and errors are sanitized.
- CSP uses `frame-ancestors 'none'`, blocks objects/frames, restricts connect/image/font sources and enables HSTS in production. `unsafe-inline` remains for Next.js runtime/style compatibility and is documented as the current CSP tradeoff.
- Public API responses are `no-store` and never contain stack traces/backend hostnames.
- Demo market data is explicit only through `PGA_UI_DATA_SOURCE=mock`; production does not silently fall back to mock values.
