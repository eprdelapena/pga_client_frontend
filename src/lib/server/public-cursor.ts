import {createCipheriv, createDecipheriv, createHash, randomBytes} from 'node:crypto';

export class PublicCursorError extends Error {}
export class PublicCursorConfigurationError extends Error {}

type CursorScope = 'clubs' | 'share-prices';
const DEV_FALLBACK = 'dev-only-pga-public-cursor-secret-change-me';

function key(): Buffer {
  const secret = process.env.PGA_PUBLIC_CURSOR_SECRET?.trim();
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new PublicCursorConfigurationError('PGA_PUBLIC_CURSOR_SECRET is required in production.');
  }
  const resolved = secret || DEV_FALLBACK;
  return createHash('sha256').update(resolved).digest();
}


export function assertPublicCursorConfigured(): void {
  void key();
}
export function sealPublicCursor(rawCursor: string | null, scope: CursorScope): string | null {
  if (!rawCursor) return null;
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key(), iv);
  cipher.setAAD(Buffer.from(scope));
  const ciphertext = Buffer.concat([cipher.update(rawCursor, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1.${iv.toString('base64url')}.${ciphertext.toString('base64url')}.${tag.toString('base64url')}`;
}

export function openPublicCursor(value: string, scope: CursorScope): string {
  try {
    const [version, ivPart, cipherPart, tagPart, ...extra] = value.split('.');
    if (version !== 'v1' || !ivPart || !cipherPart || !tagPart || extra.length) throw new Error('shape');
    const iv = Buffer.from(ivPart, 'base64url');
    const ciphertext = Buffer.from(cipherPart, 'base64url');
    const tag = Buffer.from(tagPart, 'base64url');
    if (iv.length !== 12 || tag.length !== 16 || !ciphertext.length) throw new Error('length');
    const decipher = createDecipheriv('aes-256-gcm', key(), iv);
    decipher.setAAD(Buffer.from(scope));
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
  } catch (error) {
    if (error instanceof PublicCursorConfigurationError) throw error;
    throw new PublicCursorError('Invalid pagination cursor.');
  }
}

export function replacePublicCursor<T extends {page: {nextCursor: string | null}}>(
  envelope: T,
  scope: CursorScope,
): T {
  return {
    ...envelope,
    page: {...envelope.page, nextCursor: sealPublicCursor(envelope.page.nextCursor, scope)},
  };
}
