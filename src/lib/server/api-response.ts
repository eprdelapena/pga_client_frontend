import {NextResponse} from 'next/server';
import type {RateLimitDecision} from './rate-limit';
import {rateLimitHeaders} from './rate-limit';

const commonHeaders: HeadersInit = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
  'Vary': 'Accept-Encoding',
};

export function apiError(status: number, code: string, message: string, decision?: RateLimitDecision) {
  return NextResponse.json(
    {error: {code, message}},
    {
      status,
      headers: {
        ...commonHeaders,
        ...(decision ? rateLimitHeaders(decision) : {}),
      },
    },
  );
}

export function apiSuccess<T>(data: T, decision: RateLimitDecision) {
  return NextResponse.json(data, {
    status: 200,
    headers: {...commonHeaders, ...rateLimitHeaders(decision)},
  });
}
