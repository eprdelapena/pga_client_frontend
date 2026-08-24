import type {NextRequest} from 'next/server';
import {apiError, apiSuccess} from '@/lib/server/api-response';
import {BackendConfigurationError, BackendRequestError, fetchPublicSharePrices} from '@/lib/server/backend';
import {getInternalClubCatalog} from '@/lib/server/public-clubs';
import {normalizePublicMarket} from '@/lib/server/public-market';
import type {InternalClubIdentity} from '@/types/domain';
import {PublicQueryError, sharePriceQuery} from '@/lib/server/query';
import {assertPublicCursorConfigured, openPublicCursor, PublicCursorConfigurationError, PublicCursorError, replacePublicCursor} from '@/lib/server/public-cursor';
import {checkRateLimit, RateLimitUnavailableError} from '@/lib/server/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let decision;
  try {
    decision = await checkRateLimit(request, 'share-prices');
  } catch (error) {
    if (error instanceof RateLimitUnavailableError) {
      return apiError(503, 'RATE_LIMIT_UNAVAILABLE', 'Market service is temporarily unavailable.');
    }
    return apiError(503, 'SERVICE_UNAVAILABLE', 'Market service is temporarily unavailable.');
  }
  if (!decision.allowed) {
    return apiError(429, 'RATE_LIMIT_EXCEEDED', 'Too many requests. Please try again shortly.', decision);
  }

  try {
    assertPublicCursorConfigured();
    const publicParams = new URLSearchParams(request.nextUrl.searchParams);
    const cursor = publicParams.get('cursor');
    if (cursor) publicParams.set('cursor', openPublicCursor(cursor, 'share-prices'));
    const query = sharePriceQuery(publicParams);
    const upstream = await fetchPublicSharePrices(query);
    let catalog: InternalClubIdentity[] = [];
    try {
      catalog = await getInternalClubCatalog();
    } catch (error) {
      // Public prices remain available when the protected Clubs integration is
      // not configured. We deliberately leave club identity unresolved instead
      // of attaching mock or guessed names.
      if (!(error instanceof BackendConfigurationError || error instanceof BackendRequestError)) throw error;
    }
    return apiSuccess(replacePublicCursor(normalizePublicMarket(upstream, catalog), 'share-prices'), decision);
  } catch (error) {
    if (error instanceof PublicCursorError) return apiError(400, 'INVALID_CURSOR', error.message, decision);
    if (error instanceof PublicCursorConfigurationError) return apiError(503, 'CURSOR_SECURITY_UNAVAILABLE', 'Pagination service is temporarily unavailable.', decision);
    if (error instanceof PublicQueryError) return apiError(400, 'INVALID_QUERY', error.message, decision);
    if (error instanceof BackendConfigurationError) {
      return apiError(503, 'UPSTREAM_NOT_CONFIGURED', 'Market data service is not configured.', decision);
    }
    if (error instanceof BackendRequestError) {
      const status = error.status === 504 ? 504 : 502;
      return apiError(
        status,
        status === 504 ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_UNAVAILABLE',
        'Market data is temporarily unavailable.',
        decision,
      );
    }
    return apiError(500, 'INTERNAL_ERROR', 'Unexpected server error.', decision);
  }
}
