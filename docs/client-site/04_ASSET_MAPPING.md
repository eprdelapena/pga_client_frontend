# Club Asset Mapping — Phase 2

The PGA backend is authoritative for Club identity. This frontend mapping is authoritative only for approved visual assets.

| Uploaded filename | Project filename | Approved visual identity | asset key | public slug | Confidence |
|---|---|---|---|---|---|
| alabang_country_club_logo.png | alabang-country-club.png | Alabang Country Club | ALABANG | alabang-country-club | High |
| anvaya_cove_nature_club_logo.png | anvaya-cove.png | Anvaya Cove Golf & Sports Club | ANVAYA | anvaya-cove | High |
| alphaland_balesin_shell_emblem.png | alphaland-balesin.png | Alphaland Balesin Island Club | BALESIN | alphaland-balesin | High |
| vintage_baguio_country_club_emblem.png | baguio-country-club.png | Baguio Country Club | BAGUIO | baguio-country-club | High |
| calatagan_golf_club_enhanced_1536.png | calatagan-golf-club.png | Calatagan Golf Club | CALATAGAN | calatagan-golf-club | High |
| canlubang_golf_country_club_enhanced_1536.png | canlubang-golf-country-club.png | Canlubang Golf & Country Club | CANLUBANG | canlubang-golf-country-club | High |
| casino_espanol_cebu_enhanced_1536.png | casino-espanol-cebu.png | Casino Español de Cebu | CASINO_CEBU | casino-espanol-cebu | High |
| casino_espanol_manila_enhanced_1536.png | casino-espanol-manila.png | Casino Español de Manila | CASINO_MANILA | casino-espanol-manila | High |
| celebrity_sports_club_star_logo.png | celebrity-sports-club.png | Celebrity Sports Club | CELEBRITY | celebrity-sports-club | High |
| punta_fuego_compass_crest.png | club-punta-fuego.png | Club Punta Fuego | PUNTA_FUEGO | club-punta-fuego | High |
| the_country_club_tree_emblem.png | the-country-club.png | The Country Club | TCC | the-country-club | High |

## Controlled resolution
Resolution order:
1. exact backend `clubCode` matching an approved asset key;
2. exact normalized name match against reviewed aliases;
3. otherwise no visual is attached.

There is no fuzzy, substring or random matching.

Reviewed aliases include only spelling/punctuation-normalized variants for the identities above (for example `&` versus `and`, or `Español` versus `Espanol`).

## Intentionally skipped
`navy_diamond_with_golden_emblem.png` remains unmapped because the image does not confidently identify a Club.

## Runtime Club counts
The source ZIP contains API code but not the deployed database contents. Therefore Phase 2 does **not** fabricate a count of real deployed Clubs. Runtime counts must be calculated once a reachable backend plus the dedicated `club.read` credential are supplied.

Approved local visual mappings available in this project: **11**.

## Phase 3 asset note
No new Club logos were sourced, generated, scraped, or guessed in Phase 3. The existing approved 11-logo mapping remains authoritative for visual publication.

## Phase 4 asset optimization
The approved Club mapping table and filenames were not changed. PNG source assets larger than 1024px were proportionally resized to a maximum 1024×1024 canvas and re-encoded as optimized PNGs. Aspect ratios and mapping identities were preserved; no new guessed logo mapping was added.

## Phase 5 updated supplied assets
The user supplied `all_enhanced_club_images_updated.zip`. Existing approved project image files were intentionally left unchanged. Only the newly supplied, confidently identifiable Club logos below were added.

| Uploaded filename | Project filename | Approved visual identity | asset key | public slug | Confidence |
|---|---|---|---|---|---|
| eagle_ridge_golf_club_logo.png | eagleridge-golf-country-club.png | Eagleridge Golf & Country Club | EAGLERIDGE_GOLF_COUNTRY_CLUB | eagleridge-golf-country-club | High |
| eastridge_crowned_shield_crest.png | eastridge-golf-club.png | Eastridge Golf Club | EASTRIDGE_GOLF_CLUB | eastridge-golf-club | High |
| fairways_and_bluewater_boracay_logo.png | fairways-bluewaters.png | Fairways & Bluewaters | FAIRWAYS_BLUEWATERS | fairways-bluewaters | High |
| forest_hills_golf_club_crest.png | forest-hills-golf-country-club.png | Forest Hills Golf & Country Club | FOREST_HILLS_GOLF_COUNTRY_CLUB | forest-hills-golf-country-club | High |
| luisita_golf_club_bird_logo.png | luisita-golf-country-club.png | Luisita Golf & Country Club | LUISITA_GOLF_COUNTRY_CLUB | luisita-golf-country-club | High |

The mock Club dataset already contained these five Club identities, so no mock market values or Club records were replaced. Adding the mappings makes them eligible for the visual Club Directory and Club-detail experience while preserving all pre-existing logos. Approved local visual mappings are now **16**. The ambiguous `navy_diamond_with_golden_emblem.png` remains intentionally unmapped.

## Phase 5 additional supplied assets — batch 2
The user supplied `new_enhanced_club_images_only.zip`. No existing project logo file was replaced. Six newly supplied logos were added and mapped to Club identities already present in the local mock/reference Club dataset.

| Uploaded filename | Project filename | Approved visual identity | asset key | public slug | Confidence |
|---|---|---|---|---|---|
| makati_club_torch_crest.png | makati-sports-club.png | Makati Sports Club / Makati (Sports) Club, Inc. | MAKATI_SPORTS_CLUB | makati-sports-club | High |
| manila_golf_sunburst_emblem.png | manila-golf-country-club.png | Manila Golf & Country Club | MANILA_GOLF_COUNTRY_CLUB | manila-golf-country-club | High |
| maroon_horse_and_golden_horseshoe_crest.png | manila-polo-club.png | Manila Polo Club | MANILA_POLO_CLUB | manila-polo-club | High |
| the_manila_southwoods_golf_crest.png | manila-southwoods-golf-country-club.png | Manila Southwoods Golf & Country Club | MANILA_SOUTHWOODS_GOLF_COUNTRY_CLUB | manila-southwoods-golf-country-club | High |
| montemar_beach_club_logo.png | montemar-beach-club.png | Montemar Beach Club | MONTEMAR_BEACH_CLUB | montemar-beach-club | High |
| mount_malarayat_golf_club_branding.png | mount-malarayat-golf-country-club.png | Mount Malarayat Golf & Country Club | MOUNT_MALARAYAT_GOLF_COUNTRY_CLUB | mount-malarayat-golf-country-club | High |

The Makati crest is the Makati (Sports) Club crest used by the Club, and the horse/horseshoe/polo-mallet crest matches Manila Polo Club. Existing 16 approved assets remain unchanged. Approved local visual mappings are now **22**.

## Phase 5 additional supplied assets — batch 3
The user supplied `newest_enhanced_club_images_only (1).zip`. No existing project logo file was replaced. Eight newly supplied logos were added and mapped to Club identities already present in the local mock/reference Club dataset.

| Uploaded filename | Project filename | Approved visual identity | asset key | public slug | Confidence |
|---|---|---|---|---|---|
| the_orchard_manila_golf_club_crest.png | orchard-golf-country-club.png | Orchard Golf & Country Club / The Orchard Golf & Country Club | ORCHARD_GOLF_COUNTRY_CLUB | orchard-golf-country-club | High |
| elegant_palms_country_club_emblem.png | palms-country-club.png | Palms Country Club / The Palms Country Club | PALMS_COUNTRY_CLUB | palms-country-club | High |
| philippine_columbian_association_emblem.png | philippine-columbian-association.png | Philippine Columbian Association | PHILIPPINE_COLUMBIAN_ASSOCIATION | philippine-columbian-association | High |
| pico_de_loro_beach_club_logo.png | pico-de-loro-beach-country-club.png | Pico de Loro Beach & Country Club | PICO_DE_LORO_BEACH_COUNTRY_CLUB | pico-de-loro-beach-country-club | High |
| quezon_city_sports_club_emblem.png | quezon-city-sports-club.png | Quezon City Sports Club | QUEZON_CITY_SPORTS_CLUB | quezon-city-sports-club | High |
| riviera_golf_club_fountain_emblem.png | riviera-golf-club.png | Riviera Golf Club | RIVIERA_GOLF_CLUB | riviera-golf-club | High |
| the_rockwell_club_tree_emblem.png | rockwell-leisure-club.png | Rockwell Leisure Club / The Rockwell Club | ROCKWELL_LEISURE_CLUB | rockwell-leisure-club | High |
| royal_northwoods_golf_club_crest.png | royal-northwoods-golf-country-club.png | Royal Northwoods Golf & Country Club | ROYAL_NORTHWOODS_GOLF_COUNTRY_CLUB | royal-northwoods-golf-country-club | High |

The mock Club dataset already contained all eight Club identities, so no market values or Club records were replaced. Existing 22 approved visual assets remain unchanged. Approved local visual mappings are now **30**. The older ambiguous `navy_diamond_with_golden_emblem.png` remains intentionally unmapped.

## Phase 5 additional supplied assets — batch 4
The user supplied `newest_tagaytay_and_club_images_only.zip`. No existing project logo file was replaced. Nine newly supplied visuals were added and mapped to Club identities already present in the local mock/reference Club dataset.

| Uploaded filename | Project filename | Approved visual identity | asset key | public slug | Confidence |
|---|---|---|---|---|---|
| royale_tagaytay_country_club_crest.png | royale-tagaytay-country-club.png | Royale Tagaytay Country Club | ROYALE_TAGAYTAY_COUNTRY_CLUB | royale-tagaytay-country-club | High |
| sherwood_hills_golf_club_emblem.png | sherwood-hills-golf-country-club.png | Sherwood Hills Golf & Country Club | SHERWOOD_HILLS_GOLF_COUNTRY_CLUB | sherwood-hills-golf-country-club | High |
| the_spa_lodge_tagaytay_sign.png | spa-lodge-at-tagaytay-highlands.png | Spa & Lodge at Tagaytay Highlands | SPA_LODGE_AT_TAGAYTAY_HIGHLANDS | spa-lodge-at-tagaytay-highlands | High |
| splendido_taal_golf_club_logo.png | splendido-taal-golf-club.png | Splendido Taal Golf Club | SPLENDIDO_TAAL_GOLF_CLUB | splendido-taal-golf-club | High |
| sta._elena_golf_club_emblem.png | sta-elena-golf-club.png | Sta. Elena Golf Club | STA_ELENA_GOLF_CLUB | sta-elena-golf-club | High |
| subic_bay_yacht_club_emblem.png | subic-bay-yacht-club.png | Subic Bay Yacht Club | SUBIC_BAY_YACHT_CLUB | subic-bay-yacht-club | High |
| summit_point_golf_club_logo.png | summit-point-golf-residential-club.png | Summit Point Golf & Residential Club | SUMMIT_POINT_GOLF_RESIDENTIAL_CLUB | summit-point-golf-residential-club | High |
| tagaytay_highlands_golf_club_emblem.png | tagaytay-highlands-international-golf-club.png | Tagaytay Highlands International Golf Club | TAGAYTAY_HIGHLANDS_INTERNATIONAL_GOLF_CLUB | tagaytay-highlands-international-golf-club | High |
| tagaytay_midlands_golf_club_emblem.png | tagaytay-midlands-golf-club.png | Tagaytay Midlands Golf Club Inc. | TAGAYTAY_MIDLANDS_GOLF_CLUB_INC | tagaytay-midlands-golf-club | High |

The mock Club dataset already contained all nine Club identities, so no market values or Club records were replaced. Existing 30 approved visual assets remain unchanged. Approved local visual mappings are now **39**. The older ambiguous `navy_diamond_with_golden_emblem.png` remains intentionally unmapped.



## Phase 5 additional supplied assets — batch 5
The user supplied `new_wack_vineyard_valley_valle_verde_only(1).zip`. Existing project logo files were intentionally left unchanged. Four newly supplied visuals were added and mapped to Club identities already present in the local mock/reference Club dataset.

| Uploaded filename | Project filename | Approved visual identity | asset key | public slug | Confidence |
|---|---|---|---|---|---|
| wack_wack_golf_club_emblem.png | wack-wack-golf-country-club.png | Wack Wack Golf & Country Club | WACK_WACK_GOLF_COUNTRY_CLUB | wack-wack-golf-country-club | High |
| vineyard_golf_club_emblem.png | vineyard-golf-club.png | Vineyard Golf Club | VINEYARD_GOLF_CLUB | vineyard-golf-club | High |
| valley_golf_emblem_logo.png | valley-golf-country-club.png | Valley Golf & Country Club | VALLEY_GOLF_COUNTRY_CLUB | valley-golf-country-club | High |
| valle_verde_country_club_emblem.png | valle-verde-country-club.png | Valle Verde Country Club | VALLE_VERDE_COUNTRY_CLUB | valle-verde-country-club | High |

The mock Club dataset already contained all four Club identities, so no market values or Club records were replaced. Existing 39 approved visual assets remain unchanged. Approved local visual mappings are now **43**.
