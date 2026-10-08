# ADR 0007 — address resolution recovery evaluation

Status: live evaluation found a material wrong-building result; provider selection and promotion are blocked. Updated 2026-10-08 PDT. Production remains v0.2.1.

## Verified problem

The authorized incident returns Photon HTTP 200 with road/bridge features and no usable matching house-number point. Expanded spelling, larger candidate limits and structured query variants did not establish an exact result. The strict normalizer rejects incomplete/mismatched candidates correctly. Improved diagnostics shipped in v0.2.1 but did not repair coverage. The official municipal property brochure confirms the commercial property and contains inconsistent postal codes; this is a separate normalization risk, not proof of the cause of missing upstream coverage. Sensitive incident input and evidence stay outside Git.

## Provider comparison

| Provider | Downstream use and precision | Cost/access | Decision |
| --- | --- | --- | --- |
| Geocodio | Its terms expressly describe data-analysis and point-in-polygon use without the restrictions discussed for other providers. Rooftop means an address parcel, not necessarily a building center; inspect match_type. | Self-serve free daily allowance; account/key and owner terms acceptance needed. | Original case passes independent local property/handoff checks; 30-address benchmark contains one confirmed wrong-building result. Not approved for production. |
| Google | General terms restrict derived content; the explicit Places point-in-polygon example does not by itself establish a Geocoding-specific prohibition. Service-specific no-map permission does not establish permission for the entire Overture scoring workflow. | Geocoding pricing lists 10,000 free monthly events, then $5/1,000 first paid tier; billing authorization absent. | Defer; precise downstream permission remains unestablished. No API activated. |
| Apple | Program agreement Attachment 6 requires corresponding Apple-map display for address results; secondary database/caching restrictions also apply. No precise result for the incident has been tested. | Maps Server API requires developer credentials; documented daily service quota is shared with MapKit JS. | Additional map integration and unresolved downstream rights make it a poorer minimum-change candidate. |

Sources: [Geocodio terms](https://www.geocod.io/terms-of-use), [accuracy metadata](https://www.geocod.io/guides/accuracy-types-scores), [API v2](https://www.geocod.io/docs/), [Google general terms](https://cloud.google.com/maps-platform/terms), [Google service terms](https://cloud.google.com/maps-platform/terms/maps-service-terms), [Google pricing](https://developers.google.com/maps/billing-and-pricing/pricing), [Apple agreement](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/), [Apple Maps Server API](https://developer.apple.com/documentation/applemapsserverapi).

Geocodio's current [pricing](https://www.geocod.io/pricing) lists 2,500 free daily lookups, $1/1,000 afterward, no card required within the free tier and configurable hard daily limits. Before any live use, verify the actual account has no subscription, purchased credits, recharge or payment method, and a hard cap within the free allowance. App quotas are defense in depth, not a substitute for provider account controls. Never buy credits or enable paid usage. Self-serve free allowance is distinct from enterprise demonstration terms.

## Candidate implementation and privacy

The server adapter, disabled Netlify route, atomic daily quota and browser transport are prepared but disconnected from the active frontend. No production key or enabled flag was configured. The active frontend, consent, CSP and version remain the v0.2.1 baseline; the activation draft is retained privately until acceptance. Existing Overture and scoring code are unchanged. Production quota is at most 850/day and preview quota 100/day, with provider account hard cap 1,000/day as the final boundary. A single rolling private counter contains day/count only. No new history database, map framework or provider cascade.

API v2 uses a single-item batch POST with bearer header, no URL query, no data appends and no retries. The [retention policy](https://www.geocod.io/data-retention-policy) identifies detailed metadata retention up to 45 days; batch use minimizes address query logging but is not a claim that all provider logging disappears. No visitor IP or contact is forwarded by the adapter. Account review found no card, subscription upgrade or purchased credits. A hard cap within the free allowance was saved before evaluation.

Only rooftop-class results with valid coordinates and matching house, street, locality, state and country are eligible. Explicit warnings cover building ranges beginning at the exact requested door, omitted suffix/direction completion with matching ZIP/locality, and ZIP correction. Arbitrary range membership, contradictory directions, different houses/streets, city aliases and interpolation stay rejected. Precision labels now explicitly say provider-reported: independent evidence found entrance/edge points labeled building centroids.

## Live evidence and provider decision

The authorized original case resolved in about 0.7 seconds. The coordinate lies in the target municipal parcel and mapped building, 16.83 m from the official municipal address point. The unchanged live Overture pipeline generated 6.8. This is local live evidence, not production acceptance. Sensitive incident input, raw outputs and municipal evidence remain outside Git.

The independent official-retailer corpus contains 30 public commercial addresses, 22 states, three retailer categories and multiple address conventions. Initial strict normalization returned 18 candidates. Narrow, disclosed formatting improvements recovered five more. Independent review of the final 23 candidates found:

| Outcome | Count |
| --- | ---: |
| Correct property/address-level match | 22 |
| Incorrect building | 1 |
| Unresolved | 7 |
| Provider error | 0 |
| Remaining location-unverified | 0 |

Eighteen correct candidates and independent retailer POIs share a mapped building polygon. Four additional cases received manual building/POI/aerial review, including two entrance/edge points counted only as address/property-level matches, not building centers. The sample is purposive, with a furniture-retail skew; it is not a national accuracy estimate. Response times: minimum 586 ms, median 631.5 ms, nearest-rank p95 870 ms, maximum 972 ms. No failed or unresolved case was removed from the denominator.

The incorrect case reports accuracy 1, rooftop, building_centroid but falls in another current business's building. Three input variants and reverse lookup repeat the error. The [current business's official contact page](https://www.hotelmarcel.com/contact-us) identifies a different address; official retailer source, independent geometry and aerial review corroborate the mismatch. A stale address/building association is the supported hypothesis; the upstream source-update mechanism remains unconfirmed. Neither confidence thresholds nor forward/reverse agreement fix this failure class. The Photon benchmark returned candidates for 20/30, but those are not certified accurate counts. Photon-first fallback still reaches the incorrect Geocodio case and therefore is not a demonstrated fix.

An additional Geoapify public demo was justified by this finding. It returns the intended retailer for the incorrect Geocodio case (and a second same-address amenity requiring ambiguity handling), but its original-incident point lies outside the official target parcel. That point has not passed the required precision gate. No Geoapify key/account was created, and no provider has been selected merely on confidence. [Geoapify pricing](https://www.geoapify.com/pricing/), [terms](https://www.geoapify.com/terms-and-conditions/) and [privacy](https://www.geoapify.com/privacy-policy/) were reviewed: free commercial usage has limits and attribution obligations; provider request retention must be disclosed if later selected. Google billing remains unauthorized and its exact downstream-use permission unresolved. Apple still requires additional map integration and credential/license review.

## Release gate and next action

A permanent offline review gate prevents provider metadata from self-certifying acceptance, retains incorrect/unresolved/error outcomes, requires evidence for every offered candidate, and never emits release PASS automatically. Synthetic regressions cover a high-confidence wrong-building finding. No address-specific exception, blacklist, centroid substitution or tuned distance threshold was introduced.

After explicit owner authorization on 2026-10-08 PDT, the public-commercial report was sent to the official support address through the owner's existing email session. Gmail confirmed sent; provider acknowledgement, case ID and correction are not yet verified. The web report form introduced a separate liability waiver, so it was not submitted; email avoided accepting additional terms. The report excludes the owner incident, credentials and visitor data. After any upstream correction, rerun the incorrect case, original case, full sample, full regression and clean checks, then preview and controlled production acceptance. Do not relax the independent location gate to ship.

Current result: **NOT READY / INCIDENT OPEN**. Candidate staging and production acceptance have not run, because the live provider-quality gate failed. Production remains the validated v0.2.1 release.
