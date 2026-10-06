# Location intelligence benchmark

Research date: 2026-10-05. Public primary sources only; no private methodology, vendor access, paid contract or reverse engineering. Product descriptions are vendor claims, not independent audits.

## What mature systems demonstrate

Placer's [trust center](https://www.placer.ai/company/trust-center) describes upstream identifier removal, POI-level aggregation and extrapolation, with privacy thresholds. Its [API introduction](https://docs.placer.ai/reference/welcome-to-papi) describes programmatic delivery and enrichment. Its [data version 2.1 announcement](https://docs.placer.ai/changelog/data-version-21-releasing-to-the-api) describes demographic/geographic/operating-system debiasing and alignment with external ground truth. These public descriptions do not disclose enough to reproduce a calibrated mobility product. Panel composition, licensing, historical coverage and outcome validation are substantive dependencies.

Lite has no device panel, mobility trajectories, visit estimates, catchment inference or population extrapolation. Public map features are not foot traffic. Software architecture can be simple and reproducible without claiming equivalent data intelligence.

| Capability | Decision | Lite treatment |
| --- | --- | --- |
| Provider abstraction and schema checks | BUILD | Small replaceable adapters, exact types, bounded inputs |
| Address/entity resolution | BUILD + PUBLIC DATA | Photon candidates and explicit human confirmation; no claim of unique storefront truth |
| Geographic normalization | BUILD | WGS84 coordinate validation, Haversine radius, duplicate-ID checks |
| POI categories | PUBLIC DATA | OSM categories; names removed; completeness unknown |
| Privacy minimization | BUILD | No device tracking, account, analytics or durable input store |
| Enrichment with demographics | DEFER | Geographic aggregation and vintage comparability need separate design; no proxy values |
| Licensed visitation aggregates | BUY | Consider only in a separately scoped product with rights and proven value; no purchase here |
| Raw device panel | NOT APPROPRIATE FOR LITE | Excluded |
| Sampling/extrapolation/debiasing | NOT APPROPRIATE FOR LITE | No representative sample or validation basis; do not simulate it |
| Trade-area inference | DEFER | The 600 m radius is a calculation window, not a customer trade area |
| Provider API delivery | BUILD | Adapter contracts and pure modules; no hosted public scoring API promised |
| Statistical validation against outcomes | DEFER | Synthetic correctness tests are not commercial validation |

## Public-source choices

[Photon](https://github.com/komoot/photon) offers an OSM geocoder and a reasonable-use demo endpoint without guaranteed availability. [Overpass documentation](https://dev.overpass-api.de/overpass-doc/en/preface/commons.html) describes shared-resource protection and discourages general application reliance on the main public instance. The [maintained instance table](https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances) lists Private.coffee's project-use policy and large-scale contact request; its [operator directory](https://private.coffee/services.html) lists the service. [OSM licensing](https://www.openstreetmap.org/copyright) requires attribution and applicable ODbL obligations.

Inference from these sources: a small, manually operated showcase can demonstrate normalization and transparent scoring, but cannot credibly promise reliable commercial intelligence on volunteer services. Use synthetic fixtures for deterministic QA, retain explicit errors for live outages, and move to contracted or self-hosted capacity before scale. No vendor prices or quotes are asserted.

## 2026-10-06 reliability update

The live context adapter now uses [Overture monthly release tiles](https://docs.overturemaps.org/examples/overture-tiles/) after query-server diagnostics and validation. Places supplies generic retail/service categories; Base supplies point transit/public-amenity context. The same three dimensions remain. No source confidence, business intelligence, mobility, financial or private methodology was added. Provider rights and exact bounds are in DATA_POLICY and ADR 0002. This is **PUBLIC DATA** plus a **BUILD** normalization/transport adapter, not a substitute for paid mobility intelligence.
