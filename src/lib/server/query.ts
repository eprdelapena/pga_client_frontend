const CURSOR = /^[A-Za-z0-9_-]{1,500}$/;
const CLASS_CODE = /^[A-Z0-9][A-Z0-9 _./-]{0,39}$/;
const CLUB_CODE = /^[A-Z0-9][A-Z0-9_-]{0,39}$/;

export class PublicQueryError extends Error {}

function readLimit(params: URLSearchParams, max = 100): string | undefined {
  const raw = params.get('limit');
  if (!raw) return undefined;
  if (!/^\d{1,3}$/.test(raw)) throw new PublicQueryError('Invalid limit.');
  const value = Number(raw);
  if (value < 1 || value > max) throw new PublicQueryError(`Limit must be between 1 and ${max}.`);
  return String(value);
}

function copy(out: URLSearchParams, key: string, value: string | null, pattern: RegExp, normalize?: (value: string) => string) {
  if (!value) return;
  const clean = normalize ? normalize(value.trim()) : value.trim();
  if (!pattern.test(clean)) throw new PublicQueryError(`Invalid ${key}.`);
  out.set(key, clean);
}

export function sharePriceQuery(params: URLSearchParams): string {
  const allowed = new Set(['limit', 'cursor', 'shareClassCode']);
  for (const key of params.keys()) if (!allowed.has(key)) throw new PublicQueryError(`Unsupported query parameter: ${key}.`);
  const out = new URLSearchParams();
  const limit = readLimit(params);
  if (limit) out.set('limit', limit);
  copy(out, 'cursor', params.get('cursor'), CURSOR);
  copy(out, 'shareClassCode', params.get('shareClassCode'), CLASS_CODE, (v) => v.toUpperCase());
  return out.toString();
}

export function clubsQuery(params: URLSearchParams): string {
  // Public BFF deliberately exposes ACTIVE Club discovery only. Archive/status
  // controls remain an admin concern and are never forwarded from public users.
  const allowed = new Set(['limit', 'cursor', 'region', 'clubCode', 'q']);
  for (const key of params.keys()) if (!allowed.has(key)) throw new PublicQueryError(`Unsupported query parameter: ${key}.`);
  const out = new URLSearchParams({status: 'ACTIVE'});
  const limit = readLimit(params);
  if (limit) out.set('limit', limit);
  copy(out, 'cursor', params.get('cursor'), CURSOR);
  copy(out, 'clubCode', params.get('clubCode'), CLUB_CODE, (v) => v.toUpperCase());
  const region = params.get('region')?.trim();
  if (region) {
    if (region.length > 100) throw new PublicQueryError('Invalid region.');
    out.set('region', region);
  }
  const q = params.get('q')?.trim();
  if (q) {
    if (q.length > 100) throw new PublicQueryError('Search query is too long.');
    out.set('q', q);
  }
  return out.toString();
}
