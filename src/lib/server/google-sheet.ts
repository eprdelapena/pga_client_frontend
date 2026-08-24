import {createHash} from 'node:crypto';
import fallbackWorkbook from '@/data/google-sheet-fallback.json';
import {resolveClubAsset} from '@/config/club-assets';
import type {
  DataSource,
  InternalClubIdentity,
  PhilippineRegion,
  PublicClub,
  PublicMarketEnvelope,
  PublicMarketPrice,
} from '@/types/domain';

const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1c_RiL5AWpjpXSZh7KnmfCNOGK7fLnGjF/edit?usp=sharing&ouid=114545058470474875217&rtpof=true&sd=true';
const DEFAULT_GID = '0';
const DEFAULT_REVALIDATE_SECONDS = 60;
const DEFAULT_TIMEOUT_MS = 6_000;

type SheetCell = string | number | boolean | null;
type SheetRows = SheetCell[][];

type ParsedSheet = {
  clubs: InternalClubIdentity[];
  market: PublicMarketEnvelope;
  asOf?: string;
  usedFallback: boolean;
};

function positiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function sheetConfig() {
  const url = process.env.PGA_GOOGLE_SHEET_URL?.trim() || DEFAULT_SHEET_URL;
  const idMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  const id = idMatch?.[1];
  if (!id) throw new Error('PGA_GOOGLE_SHEET_URL must be a valid Google Sheets URL.');

  const gidFromUrl = (() => {
    try {
      return new URL(url).searchParams.get('gid');
    } catch {
      return null;
    }
  })();
  const gid = process.env.PGA_GOOGLE_SHEET_GID?.trim() || gidFromUrl || DEFAULT_GID;
  const revalidate = positiveInt(process.env.PGA_GOOGLE_SHEET_REVALIDATE_SECONDS, DEFAULT_REVALIDATE_SECONDS);
  const timeout = positiveInt(process.env.PGA_GOOGLE_SHEET_TIMEOUT_MS, DEFAULT_TIMEOUT_MS);
  const exportUrl = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(id)}/export?format=csv&gid=${encodeURIComponent(gid)}`;
  return {url, id, gid, exportUrl, revalidate, timeout};
}

function cleanCell(value: SheetCell | undefined): string {
  if (value === null || value === undefined) return '';
  return String(value).replace(/^\uFEFF/, '').trim();
}

function parseCsv(csv: string): SheetRows {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    if (quoted) {
      if (char === '"') {
        if (csv[index + 1] === '"') {
          value += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        value += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(value);
      value = '';
    } else if (char === '\n') {
      row.push(value.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }

  row.push(value.replace(/\r$/, ''));
  if (row.some((cell) => cell.length > 0) || rows.length === 0) rows.push(row);
  return rows;
}

function normalizeName(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'club-share';
}

function shortHash(value: string, purpose: string): string {
  return createHash('sha256').update(`${purpose}:${value}`).digest('hex').slice(0, 16);
}

function generatedClubCode(name: string): string {
  return normalizeName(name).replace(/\s+/g, '_').toUpperCase().slice(0, 64) || 'CLUB';
}

function inferRegion(address: string): PhilippineRegion | null {
  const value = normalizeName(address);
  if (!value) return null;

  if (/(muntinlupa|makati|quezon city|manila|san juan|pasig|mandaluyong)/.test(value)) {
    return 'National Capital Region (NCR)';
  }
  if (/baguio/.test(value)) return 'Cordillera Administrative Region (CAR)';
  if (/(bataan|tarlac|bulacan|zambales|subic)/.test(value)) return 'Region III - Central Luzon';
  if (/(cavite|batangas|laguna|rizal|antipolo|tagaytay|nasugbu|lipa|sta rosa|santa rosa|binangonan)/.test(value)) {
    return 'Region IV-A - CALABARZON';
  }
  if (/(aklan|boracay)/.test(value)) return 'Region VI - Western Visayas';
  if (/cebu/.test(value)) return 'Region VII - Central Visayas';
  return null;
}

function parseAsOf(value: string): string | undefined {
  const text = value.replace(/^as\s+of\s+/i, '').trim();
  if (!text) return undefined;
  const timestamp = Date.parse(`${text} 00:00:00 UTC`);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined;
}

function parsePrice(value: string): {price?: string; inquire: boolean} {
  const raw = value.trim();
  if (!raw) return {inquire: false};
  if (/^inquire$/i.test(raw) || /^call\s+to\s+inquire$/i.test(raw)) return {inquire: true};

  const cleaned = raw.replace(/[₱₱\s]/g, '').replace(/^PHP/i, '');
  const validPlain = /^\d+(?:\.\d+)?$/.test(cleaned);
  const validGrouped = /^\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(cleaned);
  if (!validPlain && !validGrouped) return {inquire: false};

  const numeric = Number(cleaned.replace(/,/g, ''));
  if (!Number.isFinite(numeric) || numeric < 0) return {inquire: false};
  return {price: numeric.toFixed(2), inquire: false};
}

function normalizeHeader(value: string): string {
  return normalizeName(value).replace(/\s+/g, ' ');
}

function findHeader(rows: SheetRows) {
  const expected = ['golf and sports club', 'class', 'seller', 'lessor', 'buyer', 'lessee'];
  for (let rowIndex = 0; rowIndex < Math.min(rows.length, 20); rowIndex += 1) {
    const normalized = rows[rowIndex].map((cell) => normalizeHeader(cleanCell(cell)));
    if (expected.every((header) => normalized.includes(header))) {
      const indexOf = (name: string) => normalized.indexOf(name);
      return {
        rowIndex,
        club: indexOf('golf and sports club'),
        shareClass: indexOf('class'),
        seller: indexOf('seller'),
        lessor: indexOf('lessor'),
        buyer: indexOf('buyer'),
        lessee: indexOf('lessee'),
        holes: indexOf('holes'),
        address: indexOf('address'),
        developer: indexOf('developer'),
      };
    }
  }
  throw new Error('The Google Sheet does not contain the expected PGA share-price headers.');
}

function buildSnapshot(rows: SheetRows, usedFallback: boolean): ParsedSheet {
  const header = findHeader(rows);
  let asOf: string | undefined;
  for (let rowIndex = 0; rowIndex < header.rowIndex; rowIndex += 1) {
    for (const cell of rows[rowIndex]) {
      const value = cleanCell(cell);
      if (/^as\s+of\s+/i.test(value)) {
        asOf = parseAsOf(value);
        break;
      }
    }
    if (asOf) break;
  }

  type MutableClub = {
    name: string;
    clubCode: string;
    slug: string;
    logo?: string;
    region: PhilippineRegion | null;
    holes?: number | null;
    address?: string | null;
    developer?: string | null;
    shareClasses: Map<string, {classCode: string; name: string}>;
  };

  const clubMap = new Map<string, MutableClub>();
  const market: PublicMarketPrice[] = [];
  let currentClubName = '';
  const effectiveAt = asOf ?? new Date().toISOString();

  for (let rowIndex = header.rowIndex + 1; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    const explicitClubName = cleanCell(row[header.club]);
    if (explicitClubName) currentClubName = explicitClubName;
    if (!currentClubName) continue;

    const shareClassRaw = cleanCell(row[header.shareClass]);
    const shareClassCode = shareClassRaw || '—';
    const address = header.address >= 0 ? cleanCell(row[header.address]) : '';
    const developer = header.developer >= 0 ? cleanCell(row[header.developer]) : '';
    const holesRaw = header.holes >= 0 ? cleanCell(row[header.holes]) : '';
    const holesNumber = Number(holesRaw);

    const clubKey = normalizeName(currentClubName);
    let club = clubMap.get(clubKey);
    if (!club) {
      const generatedCode = generatedClubCode(currentClubName);
      const asset = resolveClubAsset({clubCode: generatedCode, name: currentClubName});
      club = {
        name: currentClubName,
        clubCode: asset?.clubCode ?? generatedCode,
        slug: asset?.slug ?? slugify(currentClubName),
        ...(asset ? {logo: asset.logo} : {}),
        region: inferRegion(address),
        holes: Number.isFinite(holesNumber) && holesNumber > 0 ? holesNumber : null,
        address: address || null,
        developer: developer || null,
        shareClasses: new Map(),
      };
      clubMap.set(clubKey, club);
    } else {
      if (!club.address && address) club.address = address;
      if (!club.developer && developer) club.developer = developer;
      if (!club.holes && Number.isFinite(holesNumber) && holesNumber > 0) club.holes = holesNumber;
      if (!club.region && address) club.region = inferRegion(address);
    }

    if (shareClassRaw) {
      club.shareClasses.set(shareClassCode, {classCode: shareClassCode, name: `Class ${shareClassCode}`});
    }

    const seller = parsePrice(cleanCell(row[header.seller]));
    const lessor = parsePrice(cleanCell(row[header.lessor]));
    const buyer = parsePrice(cleanCell(row[header.buyer]));
    const lessee = parsePrice(cleanCell(row[header.lessee]));
    const hasMarketValue = Boolean(seller.price || seller.inquire || lessor.price || lessor.inquire || buyer.price || buyer.inquire || lessee.price || lessee.inquire);

    // Keep source rows even when prices are blank so every published share class
    // remains visible under its Club. Rows with no explicit class use an em dash.
    if (shareClassRaw || hasMarketValue || explicitClubName) {
      const clubRef = shortHash(clubKey, 'sheet-club');
      market.push({
        key: shortHash(`${clubKey}|${shareClassCode}|${rowIndex}`, 'sheet-price'),
        clubRef,
        clubCode: club.clubCode,
        clubName: club.name,
        clubSlug: club.slug,
        ...(club.logo ? {clubLogo: club.logo} : {}),
        clubRegion: club.region,
        shareClassCode,
        ...(seller.price ? {sellingPrice: seller.price} : {}),
        ...(lessor.price ? {lessorPrice: lessor.price} : {}),
        ...(buyer.price ? {buyingPrice: buyer.price} : {}),
        ...(lessee.price ? {lesseePrice: lessee.price} : {}),
        sellingInquireOnly: seller.inquire,
        buyingInquireOnly: buyer.inquire,
        lessorInquireOnly: lessor.inquire,
        lesseeInquireOnly: lessee.inquire,
        currency: 'PHP',
        effectiveAt,
        publishedAt: effectiveAt,
        updatedAt: effectiveAt,
      });
    }
  }

  const clubs: InternalClubIdentity[] = Array.from(clubMap.values()).map((club) => {
    const publicClub: PublicClub = {
      clubCode: club.clubCode,
      slug: club.slug,
      name: club.name,
      region: club.region,
      holes: club.holes ?? null,
      address: club.address ?? null,
      developer: club.developer ?? null,
      shareClasses: Array.from(club.shareClasses.values()).sort((a, b) => a.classCode.localeCompare(b.classCode, undefined, {numeric: true, sensitivity: 'base'})),
      ...(club.logo ? {logo: club.logo} : {}),
    };
    return {internalId: shortHash(normalizeName(club.name), 'sheet-internal'), publicClub};
  });

  const withoutVisualCount = clubs.filter((entry) => !entry.publicClub.logo).length;
  const source: DataSource = 'sheet';
  return {
    clubs,
    market: {
      data: market,
      page: {limit: market.length, nextCursor: null, hasMore: false},
      meta: {
        correlationId: usedFallback ? 'google-sheet-fallback' : `google-sheet-${shortHash(process.env.PGA_GOOGLE_SHEET_URL?.trim() || DEFAULT_SHEET_URL, 'sheet')}`,
        total: market.length,
        source,
        unresolvedClubCount: 0,
        withoutVisualCount,
        sheetAsOf: asOf,
        sheetFallback: usedFallback,
      },
    },
    asOf,
    usedFallback,
  };
}

async function fetchSheetRows(): Promise<SheetRows> {
  const config = sheetConfig();
  const response = await fetch(config.exportUrl, {
    headers: {
      Accept: 'text/csv,text/plain;q=0.9,*/*;q=0.1',
      'User-Agent': 'PGA-Clubshares-Public-Site/1.0',
    },
    next: {revalidate: config.revalidate},
    signal: AbortSignal.timeout(config.timeout),
  });

  if (!response.ok) throw new Error(`Google Sheet export returned HTTP ${response.status}.`);
  const text = await response.text();
  if (!text.trim()) throw new Error('Google Sheet export returned an empty response.');
  if (/<!doctype html|<html/i.test(text.slice(0, 500))) {
    throw new Error('Google Sheet export is not publicly readable as CSV.');
  }
  return parseCsv(text);
}

export async function getGoogleSheetSnapshot(): Promise<ParsedSheet> {
  try {
    return buildSnapshot(await fetchSheetRows(), false);
  } catch (error) {
    // The bundled snapshot comes from the same supplied workbook and is only a
    // resilience fallback. It prevents a temporary Google outage or permission
    // issue from blanking the public site; no PGA admin/backend API is called.
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[PGA Google Sheet] Live sheet unavailable; using bundled snapshot.', error);
    }
    return buildSnapshot(fallbackWorkbook.rows as SheetRows, true);
  }
}
