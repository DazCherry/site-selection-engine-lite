# Data dictionary

| Field | Type and bounds | Meaning |
| --- | --- | --- |
| address input | string, 8–200 normalized characters | Public street number/street/city/country, comma separated; never stored by app |
| origin.lat | finite number, −90 to 90 | WGS84 latitude |
| origin.lon | finite number, −180 to 180 | WGS84 longitude |
| label | provider address fields or fictional label | Plain text; never interpreted as markup |
| id | node/way/relation plus positive integer | OSM identity; synthetic fixtures use invented identities |
| retail | enumerated group or null | One of 12 rubric groups |
| service | enumerated group or null | One of five rubric groups |
| transit | boolean | Whether a recognized mapped stop/platform/station |
| sourceTime | UTC ISO string | Overpass database timestamp, not individual verification |
| fetchedAt | UTC ISO string | Retrieval time; fixed fixture time in synthetic examples |
| records | array, maximum 10,000 | Normalized features within the 600 m radius |
| score | number 0–10 or null | Rounded total; null means withheld |
| dimensions[].score | unrounded number 0–10 or null | Rubric output before display rounding |
| dimensions[].value | number or null | Observed category count or rounded nearest distance |
| availableDimensions | integer 0–3 | Number of usable rubric dimensions, not a confidence score |
| schemaVersion | integer 1 | Snapshot structure version |
| modelVersion | exact rubric version string | Reproduction contract |
| kind | public or synthetic | Explicit origin of data |
| license | source license URL | ODbL for map data; CC0 for synthetic fixture data |

Provider raw responses are transient. Names, brands, telephone numbers, websites, arbitrary tags and user comments are not retained in normalized records. Missing measurements are `null`, never fabricated zero. The exported snapshot contains origin coordinates and a selected public label, so it is intended for public inputs only.
