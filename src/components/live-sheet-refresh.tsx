'use client';

import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

/**
 * Keeps Sheet-backed public pages current without browser access to Google.
 * router.refresh() re-runs the server component, whose Google fetch is no-store.
 */
export function LiveSheetRefresh({enabled, intervalMs = 15_000}: {enabled: boolean; intervalMs?: number}) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;
    const timer = window.setInterval(() => router.refresh(), intervalMs);
    return () => window.clearInterval(timer);
  }, [enabled, intervalMs, router]);

  return null;
}
