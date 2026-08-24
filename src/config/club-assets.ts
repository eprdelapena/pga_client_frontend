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
  MAKATI_SPORTS_CLUB: {clubCode:'MAKATI_SPORTS_CLUB',slug:'makati-sports-club',logo:'/images/clubs/makati-sports-club.png'},
  MANILA_GOLF_COUNTRY_CLUB: {clubCode:'MANILA_GOLF_COUNTRY_CLUB',slug:'manila-golf-country-club',logo:'/images/clubs/manila-golf-country-club.png'},
  MANILA_POLO_CLUB: {clubCode:'MANILA_POLO_CLUB',slug:'manila-polo-club',logo:'/images/clubs/manila-polo-club.png'},
  MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB: {clubCode:'MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB',slug:'manila-southwoods-golf-country-club',logo:'/images/clubs/manila-southwoods-golf-country-club.png'},
  MONTEMAR_BEACH_CLUB: {clubCode:'MONTEMAR_BEACH_CLUB',slug:'montemar-beach-club',logo:'/images/clubs/montemar-beach-club.png'},
  MOUNT_MALARAYAT_GOLF_COUNTRY_CLUB: {clubCode:'MOUNT_MALARAYAT_GOLF_COUNTRY_CLUB',slug:'mount-malarayat-golf-country-club',logo:'/images/clubs/mount-malarayat-golf-country-club.png'},
  ORCHARD_GOLF_COUNTRY_CLUB: {clubCode:'ORCHARD_GOLF_COUNTRY_CLUB',slug:'orchard-golf-country-club',logo:'/images/clubs/orchard-golf-country-club.png'},
  PALMS_COUNTRY_CLUB: {clubCode:'PALMS_COUNTRY_CLUB',slug:'palms-country-club',logo:'/images/clubs/palms-country-club.png'},
  PHILIPPINE_COLUMBIAN_ASSOCIATION: {clubCode:'PHILIPPINE_COLUMBIAN_ASSOCIATION',slug:'philippine-columbian-association',logo:'/images/clubs/philippine-columbian-association.png'},
  PICO_DE_LORO_BEACH_COUNTRY_CLUB: {clubCode:'PICO_DE_LORO_BEACH_COUNTRY_CLUB',slug:'pico-de-loro-beach-country-club',logo:'/images/clubs/pico-de-loro-beach-country-club.png'},
  QUEZON_CITY_SPORTS_CLUB: {clubCode:'QUEZON_CITY_SPORTS_CLUB',slug:'quezon-city-sports-club',logo:'/images/clubs/quezon-city-sports-club.png'},
  RIVIERA_GOLF_CLUB: {clubCode:'RIVIERA_GOLF_CLUB',slug:'riviera-golf-club',logo:'/images/clubs/riviera-golf-club.png'},
  ROCKWELL_LEISURE_CLUB: {clubCode:'ROCKWELL_LEISURE_CLUB',slug:'rockwell-leisure-club',logo:'/images/clubs/rockwell-leisure-club.png'},
  ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB: {clubCode:'ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB',slug:'royal-northwoods-golf-country-club',logo:'/images/clubs/royal-northwoods-golf-country-club.png'},
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
  [normalizeIdentityName('Makati Sports Club')]: 'MAKATI_SPORTS_CLUB',
  [normalizeIdentityName('Makati (Sports) Club, Inc.')]: 'MAKATI_SPORTS_CLUB',
  [normalizeIdentityName('Makati (Sports) Club Inc.')]: 'MAKATI_SPORTS_CLUB',
  [normalizeIdentityName('Manila Golf & Country Club')]: 'MANILA_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Manila Golf and Country Club')]: 'MANILA_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Manila Polo Club')]: 'MANILA_POLO_CLUB',
  [normalizeIdentityName('Manila Southwoods Golf & Country Club')]: 'MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Manila Southwoods Golf and Country Club')]: 'MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('The Manila Southwoods Golf & Country Club')]: 'MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Montemar Beach Club')]: 'MONTEMAR_BEACH_CLUB',
  [normalizeIdentityName('Mount Malarayat Golf & Country Club')]: 'MOUNT_MALARAYAT_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Mount Malarayat Golf and Country Club')]: 'MOUNT_MALARAYAT_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Orchard Golf & Country Club')]: 'ORCHARD_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Orchard Golf and Country Club')]: 'ORCHARD_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('The Orchard Golf & Country Club')]: 'ORCHARD_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('The Orchard Golf and Country Club')]: 'ORCHARD_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Palms Country Club')]: 'PALMS_COUNTRY_CLUB',
  [normalizeIdentityName('The Palms Country Club')]: 'PALMS_COUNTRY_CLUB',
  [normalizeIdentityName('Philippine Columbian Association')]: 'PHILIPPINE_COLUMBIAN_ASSOCIATION',
  [normalizeIdentityName('Pico de Loro Beach & Country Club')]: 'PICO_DE_LORO_BEACH_COUNTRY_CLUB',
  [normalizeIdentityName('Pico de Loro Beach and Country Club')]: 'PICO_DE_LORO_BEACH_COUNTRY_CLUB',
  [normalizeIdentityName('Quezon City Sports Club')]: 'QUEZON_CITY_SPORTS_CLUB',
  [normalizeIdentityName('Riviera Golf Club')]: 'RIVIERA_GOLF_CLUB',
  [normalizeIdentityName('Riviera Golf Club, Inc.')]: 'RIVIERA_GOLF_CLUB',
  [normalizeIdentityName('Rockwell Leisure Club')]: 'ROCKWELL_LEISURE_CLUB',
  [normalizeIdentityName('The Rockwell Club')]: 'ROCKWELL_LEISURE_CLUB',
  [normalizeIdentityName('The Rockwell Leisure Club')]: 'ROCKWELL_LEISURE_CLUB',
  [normalizeIdentityName('Royal Northwoods Golf & Country Club')]: 'ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Royal Northwoods Golf and Country Club')]: 'ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Royal Northwoods Golf Club Inc.')]: 'ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB',
  [normalizeIdentityName('Royal Northwoods Golf Club, Inc.')]: 'ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB',
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
