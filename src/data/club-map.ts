import {CLUB_ASSETS} from '@/config/club-assets';

type RawClubMapLocation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string | null;
  locationBasis: string;
  confidence: 'High' | 'Medium';
  assetCode: keyof typeof CLUB_ASSETS | null;
};

export type ClubMapLocation = Omit<RawClubMapLocation, 'assetCode'> & {
  logo: string | null;
  slug: string | null;
};

const RAW_CLUB_MAP_LOCATIONS: readonly RawClubMapLocation[] = [
  {id:"alabang-country-club",name:"Alabang Country Club",latitude:14.40245,longitude:121.02201,address:"Acacia Ave. Ayala Alabang Village, Muntinlupa City",locationBasis:"Golf course point",confidence:"High",assetCode:"ALABANG"},
  {id:"alta-vista-golf-club",name:"Alta Vista Golf Club",latitude:10.283649,longitude:123.849249,address:null,locationBasis:"Golf course point",confidence:"High",assetCode:null},
  {id:"ayala-greenfields-golf-club",name:"Ayala Greenfields Golf Club",latitude:14.1641,longitude:121.176766,address:null,locationBasis:"Golf course point",confidence:"High",assetCode:null},
  {id:"anvaya-cove-beach-club",name:"Anvaya Cove Beach Club",latitude:14.721398,longitude:120.256647,address:"Barangay Mabayo, Morong Bataan",locationBasis:"Club/resort point",confidence:"High",assetCode:"ANVAYA"},
  {id:"anvaya-cove-golf-sports-club",name:"Anvaya Cove Golf & Sports Club",latitude:14.723344,longitude:120.265036,address:"Barangay Mabayo, Morong Bataan",locationBasis:"Golf course reference point",confidence:"Medium",assetCode:"ANVAYA"},
  {id:"baguio-country-club",name:"Baguio Country Club",latitude:16.4083,longitude:120.6173,address:"Country Club Road, Baguio City 2600",locationBasis:"Club point",confidence:"High",assetCode:"BAGUIO"},
  {id:"balesin-island-club",name:"Balesin Island Club",latitude:14.41667,longitude:122.03535,address:"Balesin, Polilio Quezon",locationBasis:"Club/resort point",confidence:"High",assetCode:"BALESIN"},
  {id:"calatagan-golf-club",name:"Calatagan Golf Club",latitude:13.86271,longitude:120.64849,address:"Balitoc, Calatagan, Batangas",locationBasis:"Golf course point",confidence:"High",assetCode:"CALATAGAN"},
  {id:"canlubang-golf-country-club",name:"Canlubang Golf & Country Club",latitude:14.216817,longitude:121.103362,address:"Canlubang Sugar Estate, Canlubang, Laguna",locationBasis:"Golf course point",confidence:"High",assetCode:"CANLUBANG"},
  {id:"casino-espanol-de-cebu",name:"Casino Español De Cebu",latitude:10.30788,longitude:123.89826,address:null,locationBasis:"Club/facility point",confidence:"High",assetCode:"CASINO_CEBU"},
  {id:"casino-espanol-de-manila",name:"Casino Español De Manila",latitude:14.58421,longitude:120.98485,address:"855 Teodoro M. Kalaw St. Ermita Manila",locationBasis:"Club/facility point",confidence:"High",assetCode:"CASINO_MANILA"},
  {id:"cebu-country-club",name:"Cebu Country Club",latitude:10.33164,longitude:123.91687,address:"Gov. M. Cuenco Ave., Kasambagan Cebu City",locationBasis:"Golf course point",confidence:"High",assetCode:null},
  {id:"celebrity-sports-plaza",name:"Celebrity Sports Plaza",latitude:14.66618,longitude:121.07958,address:"Capitol Hills Drive, Diliman, Quezon City",locationBasis:"Club/facility point",confidence:"High",assetCode:"CELEBRITY"},
  {id:"club-filipino",name:"Club Filipino",latitude:14.60414,longitude:121.04868,address:"Eisenhower cor. Club Filipino Ave., Greenhills San Juan City",locationBasis:"Club/facility point",confidence:"High",assetCode:null},
  {id:"club-punta-fuego",name:"Club Punta Fuego",latitude:14.1332,longitude:120.57966,address:"Brgy. Balaytigue Peninsula Ave., Nasugbu Batangas",locationBasis:"Country club point",confidence:"High",assetCode:"PUNTA_FUEGO"},
  {id:"the-country-club-inc",name:"The Country Club, Inc.",latitude:14.22892,longitude:121.07888,address:"Brgy Don Jose and Sto. Domingo Sta. Rosa Laguna",locationBasis:"Golf course point",confidence:"High",assetCode:"TCC"},
  {id:"eagleridge-golf-country-club",name:"Eagleridge Golf & Country Club",latitude:14.257644,longitude:120.916326,address:"Brgy. Javalera, Gen. Trias, Cavite",locationBasis:"Golf club point",confidence:"High",assetCode:"EAGLERIDGE_GOLF_COUNTRY_CLUB"},
  {id:"eastridge-golf-club",name:"Eastridge Golf Club",latitude:14.526528,longitude:121.185894,address:"Eastridge Ave., Binangonan Rizal",locationBasis:"Golf club point",confidence:"High",assetCode:"EASTRIDGE_GOLF_CLUB"},
  {id:"fairways-bluewaters",name:"Fairways & Bluewaters",latitude:11.984486,longitude:121.914775,address:"Brgy. Balabag, Malay, Boracay Island, Aklan",locationBasis:"Golf course point",confidence:"High",assetCode:"FAIRWAYS_BLUEWATERS"},
  {id:"forest-hills-golf-country-club",name:"Forest Hills Golf & Country Club",latitude:14.629893,longitude:121.182177,address:"Brgy Inarawan, Antipolo Rizal",locationBasis:"Golf club reference point",confidence:"Medium",assetCode:"FOREST_HILLS_GOLF_COUNTRY_CLUB"},
  {id:"luisita-golf-country-club",name:"Luisita Golf & Country Club",latitude:15.43414,longitude:120.62012,address:"Hacienda Luisita, San Miguel, Tarlac City",locationBasis:"Golf course point",confidence:"High",assetCode:"LUISITA_GOLF_COUNTRY_CLUB"},
  {id:"makati-sports-club",name:"Makati Sports Club",latitude:14.55987,longitude:121.02135,address:"ALP. Leviste cor. Gallardo Sts., Salcedo Village, Makati City",locationBasis:"Club/facility point",confidence:"High",assetCode:"MAKATI_SPORTS_CLUB"},
  {id:"manila-golf-country-club",name:"Manila Golf & Country Club",latitude:14.55036,longitude:121.04202,address:"Harvard Road, Forbes Park, Makati City",locationBasis:"Golf course point",confidence:"High",assetCode:"MANILA_GOLF_COUNTRY_CLUB"},
  {id:"manila-polo-club",name:"Manila Polo Club",latitude:14.54457,longitude:121.03952,address:"35 Mckinley Road, Forbes Park, Makati City",locationBasis:"Club/facility point",confidence:"High",assetCode:"MANILA_POLO_CLUB"},
  {id:"manila-southwoods-golf-country-club",name:"Manila Southwoods Golf & Country Club",latitude:14.320757,longitude:121.042938,address:"Southwoods Ave., Cabilang Baybay, Carmona, Cavite",locationBasis:"Golf club reference point",confidence:"Medium",assetCode:"MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB"},
  {id:"montemar-beach-club",name:"Montemar Beach Club",latitude:14.587197,longitude:120.394814,address:"Barrio Pasinag, Bagac, Bataan",locationBasis:"Beach club point",confidence:"Medium",assetCode:"MONTEMAR_BEACH_CLUB"},
  {id:"mount-malarayat-golf-country-club",name:"Mount Malarayat Golf & Country Club",latitude:13.96264,longitude:121.19026,address:"Brgy. Dagatan, Lipa City Batangas",locationBasis:"Golf course point",confidence:"High",assetCode:"MOUNT_MALARAYAT_GOLF_COUNTRY_CLUB"},
  {id:"orchard-golf-country-club",name:"Orchard Golf & Country Club",latitude:14.35341,longitude:120.96052,address:"KM 27 Emilio Aguinaldo Highway, Salitran Dasmariñas Cavite",locationBasis:"Golf club point",confidence:"High",assetCode:"ORCHARD_GOLF_COUNTRY_CLUB"},
  {id:"palms-country-club",name:"Palms Country Club",latitude:14.41068,longitude:121.03469,address:"1410 Laguna Heights Drive, Filinvest City, Alabang, Muntinlupa City",locationBasis:"Club/facility point",confidence:"High",assetCode:"PALMS_COUNTRY_CLUB"},
  {id:"philippine-columbian-association",name:"Philippine Columbian Association",latitude:14.58187,longitude:120.99978,address:"Plaza Dilao, Paco, Manila",locationBasis:"Club/facility point",confidence:"High",assetCode:"PHILIPPINE_COLUMBIAN_ASSOCIATION"},
  {id:"pico-de-loro-beach-country-club",name:"Pico de Loro Beach & Country Club",latitude:14.191814,longitude:120.599778,address:"Brgy. Payapa Nasugbu Batangas",locationBasis:"Beach/country club point",confidence:"High",assetCode:"PICO_DE_LORO_BEACH_COUNTRY_CLUB"},
  {id:"quezon-city-sports-club",name:"Quezon City Sports Club",latitude:14.62326,longitude:121.026785,address:"E. Ridriguez Sr. Ave., Quezon City",locationBasis:"Club/facility point",confidence:"High",assetCode:"QUEZON_CITY_SPORTS_CLUB"},
  {id:"riviera-golf-club",name:"Riviera Golf Club",latitude:14.208101,longitude:120.967719,address:"Bypass Road, Aguinaldo Highway, Silang cavite",locationBasis:"Golf club point",confidence:"High",assetCode:"RIVIERA_GOLF_CLUB"},
  {id:"rockwell-leisure-club",name:"Rockwell Leisure Club",latitude:14.565204,longitude:121.035444,address:"23 Amorsolo Srive, Rockwell Center, Makati City",locationBasis:"Club/facility point",confidence:"High",assetCode:"ROCKWELL_LEISURE_CLUB"},
  {id:"royal-northwoods-golf-country-club",name:"Royal Northwoods Golf & Country Club",latitude:14.988512,longitude:120.967555,address:"Coral na Bato, San Rafael, Bulacan",locationBasis:"Golf club/course point",confidence:"High",assetCode:"ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB"},
  {id:"royale-tagaytay-country-club",name:"Royale Tagaytay Country Club",latitude:14.079787,longitude:120.862355,address:"Block Estate, Alfonso Cavite",locationBasis:"Country club point",confidence:"High",assetCode:"ROYALE_TAGAYTAY_COUNTRY_CLUB"},
  {id:"sherwood-hills-golf-country-club",name:"Sherwood Hills Golf & Country Club",latitude:14.260237,longitude:120.896474,address:"Brgy. Cabezas, Trece Martirez City, Cavite",locationBasis:"Golf club point",confidence:"High",assetCode:"SHERWOOD_HILLS_GOLF_COUNTRY_CLUB"},
  {id:"spa-lodge-at-tagaytay-highlands",name:"Spa & Lodge at Tagaytay Highlands",latitude:14.13494,longitude:121.02892,address:"Bo. Calabuso, Tagaytay City, Cavite",locationBasis:"Tagaytay Highlands complex reference",confidence:"Medium",assetCode:"SPA_LODGE_AT_TAGAYTAY_HIGHLANDS"},
  {id:"splendido-taal-golf-club",name:"Splendido Taal Golf Club",latitude:14.062386,longitude:120.873021,address:"Brgy. Dayap Itaas, Taal Ridge Road, Laurel, Batangas",locationBasis:"Golf club point",confidence:"High",assetCode:"SPLENDIDO_TAAL_GOLF_CLUB"},
  {id:"sta-elena-golf-club",name:"Sta. Elena Golf Club",latitude:14.240038,longitude:121.090359,address:"Bo. malitlit, Sta. Rosa, Laguna",locationBasis:"Club point decoded from Plus Code",confidence:"High",assetCode:"STA_ELENA_GOLF_CLUB"},
  {id:"subic-bay-yacht-club",name:"Subic Bay Yacht Club",latitude:14.823056,longitude:120.286861,address:"Rizal Highway cor Burgos St., Subic Bay Freeport Zone, Subic, Zambales",locationBasis:"Yacht club point",confidence:"High",assetCode:"SUBIC_BAY_YACHT_CLUB"},
  {id:"summit-point-golf-residential-club",name:"Summit Point Golf & Residential Club",latitude:14.00365,longitude:121.19025,address:"Brgy. Plaridel, Lipa City, Batangas",locationBasis:"Golf course centroid",confidence:"High",assetCode:"SUMMIT_POINT_GOLF_RESIDENTIAL_CLUB"},
  {id:"tagaytay-country-club",name:"Tagaytay Country Club",latitude:14.144865,longitude:121.03877,address:"Bo. Calabuso, Tagaytay City, Cavite",locationBasis:"Tagaytay Highlands country-club reference",confidence:"Medium",assetCode:null},
  {id:"tagaytay-highlands-international-golf-club",name:"Tagaytay Highlands International Golf Club",latitude:14.134838,longitude:121.035286,address:null,locationBasis:"Golf clubhouse point",confidence:"High",assetCode:"TAGAYTAY_HIGHLANDS_INTERNATIONAL_GOLF_CLUB"},
  {id:"tagaytay-midlands-golf-club-inc",name:"Tagaytay Midlands Golf Club Inc.",latitude:14.12823,longitude:121.04455,address:null,locationBasis:"Golf course point",confidence:"High",assetCode:"TAGAYTAY_MIDLANDS_GOLF_CLUB_INC"},
  {id:"valle-verde-country-club",name:"Valle Verde Country Club",latitude:14.57613,longitude:121.0673,address:"Capt. Henry P. javier St., Ugong, Pasig City",locationBasis:"Country club point",confidence:"High",assetCode:"VALLE_VERDE_COUNTRY_CLUB"},
  {id:"valley-golf-country-club",name:"Valley Golf & Country Club",latitude:14.60402,longitude:121.141,address:"Don Celso Tuason Ave., Antipolo City",locationBasis:"Golf course point",confidence:"High",assetCode:"VALLEY_GOLF_COUNTRY_CLUB"},
  {id:"vineyard-golf-club",name:"Vineyard Golf Club",latitude:14.07609,longitude:121.06956,address:"Purok 7 Tanauan, Tanauan City, Batangas",locationBasis:"Gonzales integrated-estate reference",confidence:"Medium",assetCode:"VINEYARD_GOLF_CLUB"},
  {id:"wack-wack-golf-country-club",name:"Wack Wack Golf & Country Club",latitude:14.59314,longitude:121.04956,address:"Wack Wack Road, Shaw Boulevard, Mandaluyong City",locationBasis:"Golf course point",confidence:"High",assetCode:"WACK_WACK_GOLF_COUNTRY_CLUB"},
];

/**
 * Static WGS 84 reference points supplied in PGA's coordinate workbook.
 * Visual identity is resolved only from the project's approved club assets.
 */
export const CLUB_MAP_LOCATIONS: readonly ClubMapLocation[] = RAW_CLUB_MAP_LOCATIONS.map((location) => {
  const asset = location.assetCode ? CLUB_ASSETS[location.assetCode] : undefined;
  return {
    id: location.id,
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    address: location.address,
    locationBasis: location.locationBasis,
    confidence: location.confidence,
    logo: asset?.logo ?? null,
    slug: asset?.slug ?? null,
  };
});

export const CLUB_MAP_LOCATION_COUNT = CLUB_MAP_LOCATIONS.length;
