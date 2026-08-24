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
