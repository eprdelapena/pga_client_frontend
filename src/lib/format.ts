export function formatMoney(value?: string, currency = 'PHP'): string {
  if (!value) return 'Inquire';
  const amount = Number(value);
  if (!Number.isFinite(amount)) return 'Inquire';
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactMoney(value: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency', currency: 'PHP', notation: 'compact', maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(value?: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-PH', {month: 'short', day: 'numeric', year: 'numeric'}).format(date);
}
