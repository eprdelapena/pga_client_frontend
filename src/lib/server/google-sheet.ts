import {createHash} from 'node:crypto';
import {inflateRawSync} from 'node:zlib';
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
const DEFAULT_SHEET_TAB = 'August 24, 2026';
const DEFAULT_TIMEOUT_MS = 6_000;

type SheetCell = string | number | boolean | null;
type SheetRows = SheetCell[][];

type ParsedSheet = {
  clubs: InternalClubIdentity[];
  market: PublicMarketEnvelope;
  asOf?: string;
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
      const parsed = new URL(url);
      return parsed.searchParams.get('gid') || new URLSearchParams(parsed.hash.replace(/^#/, '')).get('gid');
    } catch {
      return null;
    }
  })();
  const gid = process.env.PGA_GOOGLE_SHEET_GID?.trim() || gidFromUrl || undefined;
  const sheetTab = process.env.PGA_GOOGLE_SHEET_TAB?.trim() || DEFAULT_SHEET_TAB;
  const csvOverride = process.env.PGA_GOOGLE_SHEET_CSV_URL?.trim() || undefined;
  const timeout = positiveInt(process.env.PGA_GOOGLE_SHEET_TIMEOUT_MS, DEFAULT_TIMEOUT_MS);
  return {url, id, gid, sheetTab, csvOverride, timeout};
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

function buildSnapshot(rows: SheetRows): ParsedSheet {
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
        correlationId: `google-sheet-${shortHash(process.env.PGA_GOOGLE_SHEET_URL?.trim() || DEFAULT_SHEET_URL, 'sheet')}`,
        total: market.length,
        source,
        unresolvedClubCount: 0,
        withoutVisualCount,
        sheetAsOf: asOf,
      },
    },
    asOf,
  };
}

function decodeXml(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code: string) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function xmlAttributes(tag: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const match of tag.matchAll(/([:\w.-]+)="([^"]*)"/g)) result[match[1]] = decodeXml(match[2]);
  return result;
}

function zipEntry(archive: Buffer, wantedName: string): Buffer | null {
  const minOffset = Math.max(0, archive.length - 65_557);
  let eocd = -1;
  for (let offset = archive.length - 22; offset >= minOffset; offset -= 1) {
    if (archive.readUInt32LE(offset) === 0x06054b50) {
      eocd = offset;
      break;
    }
  }
  if (eocd < 0) throw new Error('Downloaded workbook is not a valid XLSX ZIP archive.');

  const entryCount = archive.readUInt16LE(eocd + 10);
  let offset = archive.readUInt32LE(eocd + 16);
  for (let index = 0; index < entryCount; index += 1) {
    if (archive.readUInt32LE(offset) !== 0x02014b50) throw new Error('Downloaded workbook has an invalid ZIP directory.');
    const method = archive.readUInt16LE(offset + 10);
    const compressedSize = archive.readUInt32LE(offset + 20);
    const nameLength = archive.readUInt16LE(offset + 28);
    const extraLength = archive.readUInt16LE(offset + 30);
    const commentLength = archive.readUInt16LE(offset + 32);
    const localOffset = archive.readUInt32LE(offset + 42);
    const name = archive.subarray(offset + 46, offset + 46 + nameLength).toString('utf8');

    if (name === wantedName) {
      if (archive.readUInt32LE(localOffset) !== 0x04034b50) throw new Error('Downloaded workbook has an invalid ZIP entry.');
      const localNameLength = archive.readUInt16LE(localOffset + 26);
      const localExtraLength = archive.readUInt16LE(localOffset + 28);
      const start = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = archive.subarray(start, start + compressedSize);
      if (method === 0) return Buffer.from(compressed);
      if (method === 8) return inflateRawSync(compressed);
      throw new Error(`Downloaded workbook uses unsupported ZIP compression method ${method}.`);
    }

    offset += 46 + nameLength + extraLength + commentLength;
  }
  return null;
}

function columnIndex(cellRef: string): number {
  const match = /^([A-Z]+)/i.exec(cellRef);
  if (!match) return 0;
  let value = 0;
  for (const character of match[1].toUpperCase()) value = value * 26 + character.charCodeAt(0) - 64;
  return Math.max(0, value - 1);
}

function xlsxRows(archive: Buffer, preferredTab: string): SheetRows {
  const workbookXml = zipEntry(archive, 'xl/workbook.xml')?.toString('utf8');
  const relationshipsXml = zipEntry(archive, 'xl/_rels/workbook.xml.rels')?.toString('utf8');
  if (!workbookXml || !relationshipsXml) throw new Error('Downloaded XLSX is missing workbook metadata.');

  const sheetTags = Array.from(workbookXml.matchAll(/<sheet\b[^>]*\/?\s*>/g), (match) => match[0]);
  if (!sheetTags.length) throw new Error('Downloaded XLSX contains no worksheets.');
  const selectedTag = sheetTags.find((tag) => xmlAttributes(tag).name === preferredTab) ?? sheetTags[0];
  const relationshipId = xmlAttributes(selectedTag)['r:id'];
  if (!relationshipId) throw new Error('Downloaded XLSX worksheet relationship is missing.');

  const relationshipTags = Array.from(relationshipsXml.matchAll(/<Relationship\b[^>]*\/?\s*>/g), (match) => match[0]);
  const relationship = relationshipTags.find((tag) => xmlAttributes(tag).Id === relationshipId);
  const target = relationship ? xmlAttributes(relationship).Target : undefined;
  if (!target) throw new Error('Downloaded XLSX worksheet target is missing.');
  const sheetPath = target.startsWith('/') ? target.replace(/^\//, '') : target.startsWith('xl/') ? target : `xl/${target}`;
  const sheetXml = zipEntry(archive, sheetPath)?.toString('utf8');
  if (!sheetXml) throw new Error(`Downloaded XLSX is missing worksheet ${preferredTab}.`);

  const sharedStringsXml = zipEntry(archive, 'xl/sharedStrings.xml')?.toString('utf8');
  const sharedStrings = sharedStringsXml
    ? Array.from(sharedStringsXml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g), (match) =>
        Array.from(match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g), (text) => decodeXml(text[1])).join(''),
      )
    : [];

  const rows: SheetRows = [];
  for (const rowMatch of sheetXml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const row: SheetCell[] = [];
    const cellPattern = /<c\b([^>]*)\/>|<c\b([^>]*)>([\s\S]*?)<\/c>/g;
    for (const cellMatch of rowMatch[1].matchAll(cellPattern)) {
      const attributes = xmlAttributes(`<c ${cellMatch[1] || cellMatch[2] || ''}>`);
      const body = cellMatch[3] || '';
      const cellPosition = columnIndex(attributes.r || 'A1');
      let value: SheetCell = '';

      if (attributes.t === 'inlineStr') {
        value = Array.from(body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g), (text) => decodeXml(text[1])).join('');
      } else {
        const valueMatch = /<v\b[^>]*>([\s\S]*?)<\/v>/.exec(body);
        const raw = valueMatch ? decodeXml(valueMatch[1]) : '';
        if (attributes.t === 's' && raw !== '') value = sharedStrings[Number(raw)] ?? '';
        else if (attributes.t === 'b') value = raw === '1';
        else if (raw !== '' && /^-?\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?$/.test(raw)) value = Number(raw);
        else value = raw;
      }
      row[cellPosition] = value;
    }
    rows.push(row);
  }
  return rows;
}

function freshUrl(url: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set('_pga', Date.now().toString());
  return parsed.toString();
}

async function fetchTextCandidate(url: string, timeout: number): Promise<SheetRows> {
  const response = await fetch(freshUrl(url), {
    headers: {
      Accept: 'text/csv,text/plain;q=0.9,*/*;q=0.1',
      'Cache-Control': 'no-cache, no-store, max-age=0',
      Pragma: 'no-cache',
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(timeout),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  if (!text.trim()) throw new Error('empty response');
  if (/<!doctype html|<html/i.test(text.slice(0, 500))) throw new Error('HTML response instead of CSV');
  const rows = parseCsv(text);
  findHeader(rows);
  return rows;
}

async function fetchWorkbookCandidate(url: string, timeout: number, sheetTab: string): Promise<SheetRows> {
  const response = await fetch(freshUrl(url), {
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/octet-stream;q=0.9,*/*;q=0.1',
      'Cache-Control': 'no-cache, no-store, max-age=0',
      Pragma: 'no-cache',
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(timeout),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const archive = Buffer.from(await response.arrayBuffer());
  if (archive.length < 4 || archive[0] !== 0x50 || archive[1] !== 0x4b) throw new Error('response is not an XLSX workbook');
  const rows = xlsxRows(archive, sheetTab);
  findHeader(rows);
  return rows;
}

async function fetchSheetRows(): Promise<SheetRows> {
  const config = sheetConfig();
  const csvCandidates = [
    config.csvOverride,
    config.gid ? `https://docs.google.com/spreadsheets/d/${encodeURIComponent(config.id)}/export?format=csv&gid=${encodeURIComponent(config.gid)}` : undefined,
    `https://docs.google.com/spreadsheets/d/${encodeURIComponent(config.id)}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(config.sheetTab)}`,
    `https://docs.google.com/spreadsheets/d/${encodeURIComponent(config.id)}/export?format=csv`,
  ].filter((candidate, index, all): candidate is string => Boolean(candidate) && all.indexOf(candidate) === index);

  const failures: string[] = [];
  for (const candidate of csvCandidates) {
    try {
      return await fetchTextCandidate(candidate, config.timeout);
    } catch (error) {
      failures.push(`CSV ${new URL(candidate).pathname}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // The supplied PGA file can be an uploaded .xlsx opened in Google Sheets
  // compatibility mode. Native Sheets CSV export can return HTTP 400 for that
  // kind of Drive file, so try the SAME live Google-hosted workbook as XLSX.
  // This is an alternate transport for the live source, not a data fallback.
  const workbookCandidates = [
    `https://drive.usercontent.google.com/download?id=${encodeURIComponent(config.id)}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${encodeURIComponent(config.id)}`,
    `https://docs.google.com/spreadsheets/d/${encodeURIComponent(config.id)}/export?format=xlsx`,
  ];
  for (const candidate of workbookCandidates) {
    try {
      return await fetchWorkbookCandidate(candidate, config.timeout, config.sheetTab);
    } catch (error) {
      failures.push(`XLSX ${new URL(candidate).hostname}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(`Google-hosted sheet/workbook could not be read. ${failures.join(' | ')}`);
}

export async function getGoogleSheetSnapshot(): Promise<ParsedSheet> {
  // Live-only by design: every request reads the shared Google-hosted source.
  // There is intentionally no bundled JSON/workbook fallback. If Google cannot
  // be read, the error propagates so the public UI can show a real data-source
  // error instead of displaying stale information.
  return buildSnapshot(await fetchSheetRows());
}
