import type {NextRequest} from 'next/server';
import {apiError, apiSuccess} from '@/lib/server/api-response';
import {BackendConfigurationError, BackendRequestError, fetchProtectedClubs} from '@/lib/server/backend';
import {normalizeClubPage} from '@/lib/server/public-clubs';
import {clubsQuery, PublicQueryError} from '@/lib/server/query';
import {assertPublicCursorConfigured, openPublicCursor, PublicCursorConfigurationError, PublicCursorError, replacePublicCursor} from '@/lib/server/public-cursor';
import {checkRateLimit, RateLimitUnavailableError} from '@/lib/server/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let decision;
  try {
    decision = await checkRateLimit(request, 'clubs');
  } catch (error) {
    if (error instanceof RateLimitUnavailableError) {
      return apiError(503, 'RATE_LIMIT_UNAVAILABLE', 'Club catalog service is temporarily unavailable.');
    }
    return apiError(503, 'SERVICE_UNAVAILABLE', 'Club catalog service is temporarily unavailable.');
  }
  if (!decision.allowed) {
    return apiError(429, 'RATE_LIMIT_EXCEEDED', 'Too many requests. Please try again shortly.', decision);
  }

  try {
    assertPublicCursorConfigured();
    const publicParams = new URLSearchParams(request.nextUrl.searchParams);
    const cursor = publicParams.get('cursor');
    if (cursor) publicParams.set('cursor', openPublicCursor(cursor, 'clubs'));
    const query = clubsQuery(publicParams);
    const upstream = await fetchProtectedClubs(query);
    return apiSuccess(replacePublicCursor(normalizeClubPage(upstream), 'clubs'), decision);
  } catch (error) {
    if (error instanceof PublicCursorError) return apiError(400, 'INVALID_CURSOR', error.message, decision);
    if (error instanceof PublicCursorConfigurationError) return apiError(503, 'CURSOR_SECURITY_UNAVAILABLE', 'Pagination service is temporarily unavailable.', decision);
    if (error instanceof PublicQueryError) return apiError(400, 'INVALID_QUERY', error.message, decision);
    if (error instanceof BackendConfigurationError) {
      return apiError(
        503,
        'UPSTREAM_AUTH_NOT_CONFIGURED',
        'Club catalog service requires a dedicated read-only server credential.',
        decision,
      );
    }
    if (error instanceof BackendRequestError) {
      const status = error.status === 504 ? 504 : 502;
      return apiError(
        status,
        status === 504 ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_UNAVAILABLE',
        'Club catalog is temporarily unavailable.',
        decision,
      );
    }
    return apiError(500, 'INTERNAL_ERROR', 'Unexpected server error.', decision);
  }
}
