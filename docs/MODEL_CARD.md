# Model card

**Rubric:** `lite-map-context-1.0.0` · **Application:** `0.1.0` · **Status:** illustrative, deterministic, uncalibrated.

## Intended use

Explore a location's mapped retail variety, everyday amenities, and transit proximity within a 600 m straight-line radius. Not a brand-specific decision, predictive model, lease recommendation, or measure of expected revenue. No proprietary or customer-derived coefficients, features, outcomes or decision bands were used.

## Inputs and formulas

Current live input uses WGS84 points from Overture Places and Base monthly releases, no more than 45 days from the release date. Individual source observations can be much older. Point-only normalization avoids invented centers from clipped tile polygons. Named station points and mapped stop points are approximate locations, not entrances or paths. Synthetic and legacy OSM normalization retains the original seven-day source-database rule.

| Dimension | Public formula | Missing behavior |
| --- | --- | --- |
| Retail variety | `min(10, 2 × distinct recognized retail groups)` | No recognized groups: unknown |
| Everyday amenities | `2 × distinct service groups` (five possible) | No recognized groups: unknown |
| Transit proximity | `max(0, 10 × (1 − nearest_distance_m / 750))` | No qualifying stop at most 600 m away: unknown |

The total is the arithmetic mean of the three **unrounded** dimension scores, then rounded to one decimal. All three are required. Scores are bounded 0–10; supported observations normally imply positive dimension scores. Display labels use the rounded total: Strong ≥ 7.5; Good ≥ 5; Moderate ≥ 2.5; Weak below 2.5. These labels are illustrative mapped-context descriptions and have no empirically validated commercial meaning.

The 600 m query radius and 750 m transit denominator are explicit design choices, not measured trade areas, calibrated behavioral distances, or hidden weights. They favor compact mixed-use settings. Category count saturation at five avoids rewarding indefinitely increasing map density. Neither threshold is an industry standard.

## Recognized categories

### Current live adapter: overture-lite-1

Retail categories match the primary taxonomy hierarchy, not names, brands, confidence values, alternates or inferred demand. Exact mapping is in `dist/overture.mjs`; groups remain the same 12 public categories. Unrecognized or uncategorized places contribute nothing. Permanently/temporarily closed records are omitted.

Services match pharmacy/drugstore, bank/bank_or_credit_union/atm, post_office, library, and public_toilet/public_restroom. Infrastructure point toilets and ATMs also map to the same existing service groups. Transit uses place bus_station/train_station/subway_station/tram_station or Base transit point bus_stop/railway_station/subway_station/tram_stop/platform. No additional score dimension is introduced. Private or explicitly disused infrastructure is omitted.

The provider replacement changes observed category coverage, so scores are not comparable with historical providers as market rankings. Formula version remains `lite-map-context-1.0.0`; exports record the separate normalization version, exact records and release.

### Legacy and synthetic mapping

The original OSM normalizer remains for fictional examples and old snapshots. Retail groups and exact `shop` values:

| Group | Values |
| --- | --- |
| food | supermarket, convenience, greengrocer, bakery, butcher, seafood, deli |
| clothing | clothes, shoes, fashion_accessories |
| home | furniture, houseware, interior_decoration, bed, kitchen |
| electronics | electronics, computer, mobile_phone |
| personal | chemist, cosmetics, hairdresser, beauty |
| books | books, stationery, newsagent |
| leisure | sports, bicycle, outdoor, toys, games, music |
| hardware | hardware, doityourself, garden_centre |
| gifts | gift, florist, jewelry |
| pets | pet, pet_grooming |
| general | department_store, variety_store, mall |
| repair | car_repair, laundry, dry_cleaning, tailor |

Services use `amenity`: pharmacy; bank or atm (one banking group); post_office; library; toilets. Transit uses highway=bus_stop, railway=station/halt/tram_stop, or public_transport=platform. Transit presence does not establish service frequency, access, direction, step-free availability or route usefulness. `access=no/private` and explicit disused/abandoned/demolished/construction=yes records are omitted. Other closure signals may be missing.

Repeated IDs are deduplicated; conflicting duplicates reject the response. Distinct IDs representing the same real feature may remain, but category sets and nearest distance limit count inflation. Unknown tag values are omitted. A map feature with both recognized retail and service tags can contribute to both dimensions. This is not evidence of independent economic effects.

## Validation and limitations

Synthetic 7.5 reference result is independently reproduced with an equatorial arc calculation. Tests verify bounds, monotonic category additions, ordering, duplicate invariance, dateline/poles, malformed inputs, time validity, missingness and snapshot replay. This establishes implementation consistency, not predictive validity. No commercial outcomes were used for training, testing or validation.

Major limitations: uneven map completeness; unverified individual feature age and operating status; possible entity duplicates; approximate building centers; regional tagging differences; correlation between dimensions; no demographics, demand, competition, vehicle access, pedestrian paths or finances. Scores are not calibrated probabilities or comparable market rankings. A high score can coexist with a poor business location.

For synthetic fixtures the fixed evaluation date is deliberate; no current observation is claimed. Historical replay does not revalidate current source freshness.
