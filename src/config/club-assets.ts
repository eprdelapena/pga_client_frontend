import type {ClubAsset, ClubRecord} from '@/types/domain';

/**
 * Approved frontend visual assets. The backend remains the Club identity source
 * of truth; this file is only the visual-asset source of truth.
 */
export const CLUB_ASSETS: Record<string, ClubAsset> = {
  ALABANG: {clubCode:'ALABANG',slug:'alabang-country-club',logo:'/images/clubs/alabang-country-club.png'},
  ANVAYA: {clubCode:'ANVAYA',slug:'anvaya-cove',logo:'/images/clubs/anvaya-cove.png'},
  BALESIN: {clubCode:'BALESIN',slug:'alphaland-balesin',logo:'/images/clubs/alphaland-balesin.png'},
  BAGUIO: {clubCode:'BAGUIO',slug:'baguio-country-club',logo:'/images/clubs/baguio-country-club.png'},
  CALATAGAN: {clubCode:'CALATAGAN',slug:'calatagan-golf-club',logo:'/images/clubs/calatagan-golf-club.png'},
  CANLUBANG: {clubCode:'CANLUBANG',slug:'canlubang-golf-country-club',logo:'/images/clubs/canlubang-golf-country-club.png'},
  CASINO_CEBU: {clubCode:'CASINO_CEBU',slug:'casino-espanol-cebu',logo:'/images/clubs/casino-espanol-cebu.png'},
  CASINO_MANILA: {clubCode:'CASINO_MANILA',slug:'casino-espanol-manila',logo:'/images/clubs/casino-espanol-manila.png'},
  CELEBRITY: {clubCode:'CELEBRITY',slug:'celebrity-sports-club',logo:'/images/clubs/celebrity-sports-club.png'},
  PUNTA_FUEGO: {clubCode:'PUNTA_FUEGO',slug:'club-punta-fuego',logo:'/images/clubs/club-punta-fuego.png'},
  TCC: {clubCode:'TCC',slug:'the-country-club',logo:'/images/clubs/the-country-club.png'},
  EAGLERIDGE_GOLF_COUNTRY_CLUB: {clubCode:'EAGLERIDGE_GOLF_COUNTRY_CLUB',slug:'eagleridge-golf-country-club',logo:'/images/clubs/eagleridge-golf-country-club.png'},
  EASTRIDGE_GOLF_CLUB: {clubCode:'EASTRIDGE_GOLF_CLUB',slug:'eastridge-golf-club',logo:'/images/clubs/eastridge-golf-club.png'},
  FAIRWAYS_BLUEWATERS: {clubCode:'FAIRWAYS_BLUEWATERS',slug:'fairways-bluewaters',logo:'/images/clubs/fairways-bluewaters.png'},
  FOREST_HILLS_GOLF_COUNTRY_CLUB: {clubCode:'FOREST_HILLS_GOLF_COUNTRY_CLUB',slug:'forest-hills-golf-country-club',logo:'/images/clubs/forest-hills-golf-country-club.png'},
  LUISITA_GOLF_COUNTRY_CLUB: {clubCode:'LUISITA_GOLF_COUNTRY_CLUB',slug:'luisita-golf-country-club',logo:'/images/clubs/luisita-golf-country-club.png'},
};

function normalizeIdentityName(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/** Exact, reviewed aliases only. No fuzzy or substring matching. */
export const CLUB_NAME_ASSET_ALIASES: Record<string, string> = {
  [normalizeIdentityName('Alabang Country Club')]: 'ALABANG',
  [normalizeIdentityName('Anvaya Cove Golf & Sports Club')]: 'ANVAYA',
  [normalizeIdentityName('Anvaya Cove Golf and Sports Club')]: 'ANVAYA',
  [normalizeIdentityName('Alphaland Balesin Island Club')]: 'BALESIN',
  [normalizeIdentityName('Baguio Country Club')]: 'BAGUIO',
  [normalizeIdentityName('Calatagan Golf Club')]: 'CALATAGAN',
  [normalizeIdentityName('Canlubang Golf & Country Club')]: 'CANLUBANG',
  [normalizeIdentityName('Canlubang Golf and Country Club')]: 'CANLUBANG',
  [normalizeIdentityName('Casino Español de Cebu')]: 'CASINO_CEBU',
  [normalizeIdentityName('Casino Espanol de Cebu')]: 'CASINO_CEBU',
  [normalizeIdentityName('Casino Español de Manila')]: 'CASINO_MANILA',
  [normalizeIdentityName('Casino Espanol de Manila')]: 'CASINO_MANILA',
  [normalizeIdentityName('Celebrity Sports Club')]: 'CELEBRITY',
  [normalizeIdentityName('Club Punta Fuego')]: 'PUNTA_FUEGO',
  [normalizeIdentityName('The Country Club')]: 'TCC',
  [normalizeIdentityName('Eagleridge Golf & Country Club')]: 'EAGLERIDGE_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Eagle Ridge Golf & Country Club')]: 'EAGLERIDGE_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Eastridge Golf Club')]: 'EASTRIDGE_GOLF_CLUB',
  [normalizeIdentityName('Fairways & Bluewaters')]: 'FAIRWAYS_BLUEWATERS',
  [normalizeIdentityName('Fairways and Bluewaters')]: 'FAIRWAYS_BLUEWATERS',
  [normalizeIdentityName('Forest Hills Golf & Country Club')]: 'FOREST_HILLS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Forest Hills Golf and Country Club')]: 'FOREST_HILLS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Luisita Golf & Country Club')]: 'LUISITA_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Luisita Golf and Country Club')]: 'LUISITA_GOLF_COUNTRY_CLUB',
};

export function getClubAsset(clubCode: string): ClubAsset | undefined {
  return CLUB_ASSETS[clubCode.trim().toUpperCase()];
}

/** Resolve by exact backend clubCode first, then a controlled exact-name alias. */
export function resolveClubAsset(club: Pick<ClubRecord, 'clubCode'|'name'>): ClubAsset | undefined {
  const direct = getClubAsset(club.clubCode);
  if (direct) return direct;
  const aliasCode = CLUB_NAME_ASSET_ALIASES[normalizeIdentityName(club.name)];
  return aliasCode ? CLUB_ASSETS[aliasCode] : undefined;
}
