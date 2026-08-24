import type {ClubRecord} from '@/types/domain';

/**
 * Hardcoded reference directory transcribed from the user-supplied
 * "Golf & Country Club Share Price Update by PGA Clubshares Inc." workbook,
 * dated August 24, 2026.
 *
 * This is intentionally local data for the current client-site stage.
 * The visual Club Directory still shows only clubs with confirmed local assets.
 */
export const MOCK_CLUBS: ClubRecord[] = [
  {
    "id": "7839aa396d8f0ec949df6e78",
    "clubCode": "ALABANG",
    "name": "Alabang Country Club",
    "nameNormalized": "alabang country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Acacia Ave. Ayala Alabang Village, Muntinlupa City",
    "developer": "Ayala Property",
    "region": "National Capital Region (NCR)",
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "b69ca30d297d58bb93e144ef",
    "clubCode": "ALTA_VISTA_GOLF_CLUB",
    "name": "Alta Vista Golf Club",
    "nameNormalized": "alta vista golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": null,
    "developer": null,
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "684c2e42c985013acab85cd4",
    "clubCode": "AYALA_GREENFIELDS_GOLF_CLUB",
    "name": "Ayala Greenfields Golf Club",
    "nameNormalized": "ayala greenfields golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": null,
    "developer": null,
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "05cd55fd99ea7a99cc30cbcb",
    "clubCode": "ANVAYA_COVE_BEACH_CLUB",
    "name": "Anvaya Cove Beach Club",
    "nameNormalized": "anvaya cove beach club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Barangay Mabayo, Morong Bataan",
    "developer": "Ayala Land Inc. and Sudeco",
    "region": null,
    "shareClasses": [
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "a87b1178f4ef761c7e407c48",
    "clubCode": "ANVAYA",
    "name": "Anvaya Cove Golf & Sports CLub",
    "nameNormalized": "anvaya cove golf & sports club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Barangay Mabayo, Morong Bataan",
    "developer": "Ayala Land Inc. and Sudeco",
    "region": "Region III - Central Luzon",
    "shareClasses": [
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "3021962fd9318073e1c10f44",
    "clubCode": "BAGUIO",
    "name": "Baguio Country Club",
    "nameNormalized": "baguio country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Country Club Road, Baguio City 2600",
    "developer": "DM Consunji/Potenciano Ilusorio",
    "region": "Cordillera Administrative Region (CAR)",
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "df5e227701243d163bd55bca",
    "clubCode": "BALESIN",
    "name": "Balesin Island Club",
    "nameNormalized": "balesin island club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Balesin, Polilio Quezon",
    "developer": "Alphaland Corp,",
    "region": "Region IV-A - CALABARZON",
    "shareClasses": [
      {
        "classCode": "Diamond",
        "name": "Class Diamond",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "a78785734a2eff86b3fd073d",
    "clubCode": "CALATAGAN",
    "name": "Calatagan Golf Club",
    "nameNormalized": "calatagan golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Balitoc, Calatagan, Batangas",
    "developer": "Pacific Planners International Ltd.",
    "region": "Region IV-A - CALABARZON",
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "e7201ada49d490e75eea51aa",
    "clubCode": "CANLUBANG",
    "name": "Canlubang Golf & Country Club",
    "nameNormalized": "canlubang golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 36,
    "address": "Canlubang Sugar Estate, Canlubang, Laguna",
    "developer": "Laguna Estate Developement Corp.",
    "region": "Region IV-A - CALABARZON",
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "dc90f9eb3ca4d0d7fb973c7c",
    "clubCode": "CASINO_CEBU",
    "name": "Casino Español De Cebu",
    "nameNormalized": "casino español de cebu",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": null,
    "developer": null,
    "region": "Region VII - Central Visayas",
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "25d8e81ea7baa20c8196c570",
    "clubCode": "CASINO_MANILA",
    "name": "Casino Español De Manila",
    "nameNormalized": "casino español de manila",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "855 Teodoro M. Kalaw St. Ermita Manila",
    "developer": "Antonio Milian Y Pavia",
    "region": "National Capital Region (NCR)",
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "16fd53c6daa17c2bdcac5a8a",
    "clubCode": "CEBU_COUNTRY_CLUB",
    "name": "Cebu Country Club",
    "nameNormalized": "cebu country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Gov. M. Cuenco Ave., Kasambagan Cebu City",
    "developer": null,
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "fc0526951cb7d8398d3d8ca5",
    "clubCode": "CELEBRITY_SPORTS_PLAZA",
    "name": "Celebrity Sports Plaza",
    "nameNormalized": "celebrity sports plaza",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Capitol Hills Drive, Diliman, Quezon City",
    "developer": "D.M. Consunji Inc. - PDI Universal Rightfield Property Holdings, Inc. Northeast Developement & Acquisitions Corp.",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "dd34a9291892757a4df9f22f",
    "clubCode": "CLUB_FILIPINO",
    "name": "Club Filipino",
    "nameNormalized": "club filipino",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Eisenhower cor. Club Filipino Ave., Greenhills San Juan City",
    "developer": "Dr. Jose Turan",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "045f230659e7a0f5aed06abc",
    "clubCode": "PUNTA_FUEGO",
    "name": "Club Punta Fuego",
    "nameNormalized": "club punta fuego",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 9,
    "address": "Brgy. Balaytigue Peninsula Ave., Nasugbu Batangas",
    "developer": "Landco",
    "region": "Region IV-A - CALABARZON",
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "47550186797660426fbbad8d",
    "clubCode": "TCC",
    "name": "The Country Club, Inc.",
    "nameNormalized": "the country club, inc.",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Brgy Don Jose and Sto. Domingo Sta. Rosa Laguna",
    "developer": "Country Club Develpment Corp.",
    "region": "Region IV-A - CALABARZON",
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "081bfe7d5ed6268b9617bcfa",
    "clubCode": "EAGLERIDGE_GOLF_COUNTRY_CLUB",
    "name": "Eagleridge Golf & Country Club",
    "nameNormalized": "eagleridge golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 72,
    "address": "Brgy. Javalera, Gen. Trias, Cavite",
    "developer": "Sta. Lucia Realty Development Inc.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "9967193885abf3b21884cf51",
    "clubCode": "EASTRIDGE_GOLF_CLUB",
    "name": "Eastridge Golf Club",
    "nameNormalized": "eastridge golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Eastridge Ave., Binangonan Rizal",
    "developer": "Antipolo Properties",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "35048d2af6a5f6f0b4feac83",
    "clubCode": "FAIRWAYS_BLUEWATERS",
    "name": "Fairways & Bluewaters",
    "nameNormalized": "fairways & bluewaters",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Brgy. Balabag, Malay, Boracay Island, Aklan",
    "developer": "Fil-Estate Group of Companies",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "7f5537a45c53a17b16e48a04",
    "clubCode": "FOREST_HILLS_GOLF_COUNTRY_CLUB",
    "name": "Forest Hills Golf & Country Club",
    "nameNormalized": "forest hills golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 36,
    "address": "Brgy Inarawan, Antipolo Rizal",
    "developer": "Fil-Estate Properties, Inc.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "10d5772c2fb837e528f09830",
    "clubCode": "LUISITA_GOLF_COUNTRY_CLUB",
    "name": "Luisita Golf & Country Club",
    "nameNormalized": "luisita golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Hacienda Luisita, San Miguel, Tarlac City",
    "developer": "Tarlac Development Corp.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "c4398d8b2005c42de5046961",
    "clubCode": "MAKATI_SPORTS_CLUB",
    "name": "Makati Sports Club",
    "nameNormalized": "makati sports club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "ALP. Leviste cor. Gallardo Sts., Salcedo Village, Makati City",
    "developer": null,
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "47f8c34294cc155336c14e2c",
    "clubCode": "MANILA_GOLF_COUNTRY_CLUB",
    "name": "Manila Golf & Country Club",
    "nameNormalized": "manila golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Harvard Road, Forbes Park, Makati City",
    "developer": "Country Club Development Inc. Manila Golf Club Inc.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "Ind",
        "name": "Class Ind",
        "status": "ACTIVE"
      },
      {
        "classCode": "Corp",
        "name": "Class Corp",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "37daf3a28b1fa1baa6183723",
    "clubCode": "MANILA_POLO_CLUB",
    "name": "Manila Polo Club",
    "nameNormalized": "manila polo club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "35 Mckinley Road, Forbes Park, Makati City",
    "developer": null,
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "ecca09a33cbcbad45b70a67e",
    "clubCode": "MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB",
    "name": "Manila Southwoods Golf & Country Club",
    "nameNormalized": "manila southwoods golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 36,
    "address": "Southwoods Ave., Cabilang Baybay, Carmona, Cavite",
    "developer": "Fil-Estate",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "0295cfc3daa034f9237a18ae",
    "clubCode": "MONTEMAR_BEACH_CLUB",
    "name": "Montemar Beach Club",
    "nameNormalized": "montemar beach club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Barrio Pasinag, Bagac, Bataan",
    "developer": "Philcomsat",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "496f5061d620acaec0db7355",
    "clubCode": "MOUNT_MALARAYAT_GOLF_COUNTRY_CLUB",
    "name": "Mount Malarayat Golf & Country Club",
    "nameNormalized": "mount malarayat golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 27,
    "address": "Brgy. Dagatan, Lipa City Batangas",
    "developer": "Active realty & Development Corp.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "Gold-A",
        "name": "Class Gold-A",
        "status": "ACTIVE"
      },
      {
        "classCode": "Gold-C",
        "name": "Class Gold-C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "fa4e7fdf5270dca047f2a94e",
    "clubCode": "ORCHARD_GOLF_COUNTRY_CLUB",
    "name": "Orchard Golf & Country Club",
    "nameNormalized": "orchard golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 36,
    "address": "KM 27 Emilio Aguinaldo Highway, Salitran Dasmariñas Cavite",
    "developer": "Sta. Lucia Realty & Development Inc.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "39e023c8144d55805a7220e5",
    "clubCode": "PALMS_COUNTRY_CLUB",
    "name": "Palms Country Club",
    "nameNormalized": "palms country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "1410 Laguna Heights Drive, Filinvest City, Alabang, Muntinlupa City",
    "developer": "Filinvest Alabang Inc.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "ea203bd7ccb38f60fcba48e1",
    "clubCode": "PHILIPPINE_COLUMBIAN_ASSOCIATION",
    "name": "Philippine Columbian Association",
    "nameNormalized": "philippine columbian association",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Plaza Dilao, Paco, Manila",
    "developer": "Permaline Inc.",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "7c1d4c6988de6f82a74e3fb1",
    "clubCode": "PICO_DE_LORO_BEACH_COUNTRY_CLUB",
    "name": "Pico de Loro Beach & Country Club",
    "nameNormalized": "pico de loro beach & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Brgy. Payapa Nasugbu Batangas",
    "developer": "Costa Del Hamilo Inc.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "7ad770b3b46212285b8584d9",
    "clubCode": "QUEZON_CITY_SPORTS_CLUB",
    "name": "Quezon City Sports Club",
    "nameNormalized": "quezon city sports club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "E. Ridriguez Sr. Ave., Quezon City",
    "developer": "Ayala Land Development Corp,",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "cb0c1dc027478799fac84f42",
    "clubCode": "RIVIERA_GOLF_CLUB",
    "name": "Riviera Golf Club",
    "nameNormalized": "riviera golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 36,
    "address": "Bypass Road, Aguinaldo Highway, Silang cavite",
    "developer": "Armed Forces of the Philippines Retirement and Seperation Benefits System",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "9ff65ff99d66af450701ce9b",
    "clubCode": "ROCKWELL_LEISURE_CLUB",
    "name": "Rockwell Leisure Club",
    "nameNormalized": "rockwell leisure club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "23 Amorsolo Srive, Rockwell Center, Makati City",
    "developer": "Rockwell Land Corp.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "4e330e05b492f8fcaf7839d0",
    "clubCode": "ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB",
    "name": "Royal Northwoods Golf & Country Club",
    "nameNormalized": "royal northwoods golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 27,
    "address": "Coral na Bato, San Rafael, Bulacan",
    "developer": "Northwoods Realty Development Corp.",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "58ed85cbe819049b7ec94591",
    "clubCode": "ROYALE_TAGAYTAY_COUNTRY_CLUB",
    "name": "Royale Tagaytay Country Club",
    "nameNormalized": "royale tagaytay country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 9,
    "address": "Block Estate, Alfonso Cavite",
    "developer": "Sta. Lucia Realty & Development Corp.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "b1a41cf94aa63c3fba9250be",
    "clubCode": "SHERWOOD_HILLS_GOLF_COUNTRY_CLUB",
    "name": "Sherwood Hills Golf & Country Club",
    "nameNormalized": "sherwood hills golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Brgy. Cabezas, Trece Martirez City, Cavite",
    "developer": "Sherwood Realty Development Corp. Fil Estate",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      },
      {
        "classCode": "C",
        "name": "Class C",
        "status": "ACTIVE"
      },
      {
        "classCode": "D",
        "name": "Class D",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "ced7f652650019e31dccfdf6",
    "clubCode": "SPA_LODGE_AT_TAGAYTAY_HIGHLANDS",
    "name": "Spa & Lodge at Tagaytay Highlands",
    "nameNormalized": "spa & lodge at tagaytay highlands",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Bo. Calabuso, Tagaytay City, Cavite",
    "developer": "Belle Corp.",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "b30f0f9d14d5bd1169b136e9",
    "clubCode": "SPLENDIDO_TAAL_GOLF_CLUB",
    "name": "Splendido Taal Golf Club",
    "nameNormalized": "splendido taal golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Brgy. Dayap Itaas, Taal Ridge Road, Laurel, Batangas",
    "developer": "Jaka Tagaytay Holdings Corp.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "660f41e724d82d7cedfd0e13",
    "clubCode": "STA_ELENA_GOLF_CLUB",
    "name": "Sta. Elena Golf Club",
    "nameNormalized": "sta. elena golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 27,
    "address": "Bo. malitlit, Sta. Rosa, Laguna",
    "developer": "Sta. Elena Properties, Inc.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      },
      {
        "classCode": "B",
        "name": "Class B",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "5d358a2edc83b8adfc9083a0",
    "clubCode": "SUBIC_BAY_YACHT_CLUB",
    "name": "Subic Bay Yacht Club",
    "nameNormalized": "subic bay yacht club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Rizal Highway cor Burgos St., Subic Bay Freeport Zone, Subic, Zambales",
    "developer": "Subic Bay Waterfront Development Corp.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "Ind",
        "name": "Class Ind",
        "status": "ACTIVE"
      },
      {
        "classCode": "Corp",
        "name": "Class Corp",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "8d85683befcf44e251e69acb",
    "clubCode": "SUMMIT_POINT_GOLF_RESIDENTIAL_CLUB",
    "name": "Summit Point Golf & Residential Club",
    "nameNormalized": "summit point golf & residential club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Brgy. Plaridel, Lipa City, Batangas",
    "developer": "Sta. Lucia Realty & Development Corp.",
    "region": null,
    "shareClasses": [
      {
        "classCode": "A",
        "name": "Class A",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "af99f2e31b8124c059570ca9",
    "clubCode": "TAGAYTAY_COUNTRY_CLUB",
    "name": "Tagaytay Country Club",
    "nameNormalized": "tagaytay country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Bo. Calabuso, Tagaytay City, Cavite",
    "developer": "Belle Corporation",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "05b8add5d800ce6b1b14fcff",
    "clubCode": "TAGAYTAY_HIGHLANDS_INTERNATIONAL_GOLF_CLUB",
    "name": "Tagaytay Highlands International Golf Club",
    "nameNormalized": "tagaytay highlands international golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": null,
    "developer": null,
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "0f6e1f4e2e10bd4f6d83b7f6",
    "clubCode": "TAGAYTAY_MIDLANDS_GOLF_CLUB_INC",
    "name": "Tagaytay Midlands Golf Club Inc.",
    "nameNormalized": "tagaytay midlands golf club inc.",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 27,
    "address": null,
    "developer": null,
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "fb9162be7896d0385b040f7d",
    "clubCode": "VALLE_VERDE_COUNTRY_CLUB",
    "name": "Valle Verde Country Club",
    "nameNormalized": "valle verde country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": null,
    "address": "Capt. Henry P. javier St., Ugong, Pasig City",
    "developer": "Ortigas & Company",
    "region": null,
    "shareClasses": [
      {
        "classCode": "Ind",
        "name": "Class Ind",
        "status": "ACTIVE"
      },
      {
        "classCode": "Corp",
        "name": "Class Corp",
        "status": "ACTIVE"
      }
    ],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "2ae57df246f6730ab587abda",
    "clubCode": "VALLEY_GOLF_COUNTRY_CLUB",
    "name": "Valley Golf & Country Club",
    "nameNormalized": "valley golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 36,
    "address": "Don Celso Tuason Ave., Antipolo City",
    "developer": "Jascotes Don Celso Tuason",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "e877da27f47c74ed6733f56d",
    "clubCode": "VINEYARD_GOLF_CLUB",
    "name": "Vineyard Golf Club",
    "nameNormalized": "vineyard golf club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 18,
    "address": "Purok 7 Tanauan, Tanauan City, Batangas",
    "developer": null,
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  },
  {
    "id": "b06b4d8e5763994fe5edb316",
    "clubCode": "WACK_WACK_GOLF_COUNTRY_CLUB",
    "name": "Wack Wack Golf & Country Club",
    "nameNormalized": "wack wack golf & country club",
    "description": "Reference club identity from the supplied August 24, 2026 PGA Share Price Update workbook.",
    "holes": 36,
    "address": "Wack Wack Road, Shaw Boulevard, Mandaluyong City",
    "developer": "Formost Golf International ",
    "region": null,
    "shareClasses": [],
    "status": "ACTIVE",
    "createdAt": "2026-08-24T08:00:00.000Z",
    "updatedAt": "2026-08-24T08:00:00.000Z",
    "archivedAt": null
  }
];
