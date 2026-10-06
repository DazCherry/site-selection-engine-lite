# Live-provider reliability investigation

Date: 2026-10-06. Status: replacement implemented; full stable-release audit in progress.

## Evidence and root-cause boundary

The release candidate's transport successfully geocodes a public civic address. Private.coffee resolves and completes TLS (~0.56 seconds), and its root returns HTTP 404 promptly (~0.64 seconds). Its status and minimal interpreter requests return no response bytes within 15–55 seconds, including GET and HTTP/1.1 diagnostics. This rules out the application's scoring, DOM, CORS enforcement, POST encoding and query size as necessary causes of the observed failure. The precise server-internal cause is not observable. An independent VK endpoint returned HTTP 504. Sandbox DNS restrictions are a separate diagnostic limitation, verified by repeating probes with network access.

Increasing application timeout alone is not justified: a tiny five-second query still produced no response in 55 seconds. Unbounded retries or rotating hosts to evade throttling are rejected. The main Overpass service is not suitable for this publicly deployed app under its published usage guidance. A responding government-hosted endpoint was also rejected after finding authorized-use restrictions; anonymous technical reachability is not permission for a public product.

## Alternative under validation

Overture distributes openly licensed release files and browser-readable PMTiles through object storage. Initial range fetch: HTTP 206, 127 bytes, under one second, with browser CORS and exposed range/ETag headers. A complete local 600-meter public civic-center place query retrieved 2,871 raw place features in ~1.55 seconds and exposed retail and everyday-service categories. No raw names, contact data, provider confidence values, or commercial entity records are publication fixtures.

This is an alternative delivery architecture, not an additional product dimension. Before selecting it, validate infrastructure transit coverage, tile completeness at maximum zoom, category mapping, licensing/attribution, bounded transfers and decompression, current release discovery, missing/stale data, diverse live addresses, browser behavior, deployed behavior, and replay. Overture is a monthly release source: any eventual freshness policy must explicitly describe that cadence and must not relabel a release date as a feature verification date.

## Sources

- [Overpass public instance policies](https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances)
- [Overpass resource guidance](https://dev.overpass-api.de/overpass-doc/en/preface/commons.html)
- [Overture data access](https://docs.overturemaps.org/getting-data/cloud-sources/)
- [Overture tile publication](https://docs.overturemaps.org/examples/overture-tiles/)
- [Overture places guide](https://docs.overturemaps.org/guides/places/)
- [Overture attribution and licenses](https://docs.overturemaps.org/attribution/)

The three scoring formulas remain unchanged. The local implementation now uses the validated Overture adapter, with a separately versioned normalization contract. A passing prototype alone does not satisfy the release acceptance gate.

## Implemented decision and first validation

Select current Overture Places zoom-14 and Base infrastructure zoom-13 tiles. Read the complete spherical bounding tile set, normalize only trustworthy point geometries, strip names/contacts/confidence, and calculate the original three dimensions. Do not mix in silent alternative providers. Enforce a 45-day release-date bound for monthly data, display release identity, and include source/license notices in exports. Keep strict byte-range/ETag checks, per-request and overall deadlines, size/count limits, and at most two transient retries; never retry a throttling response.

Real data exposed two defects: missing optional taxonomy initially rejected entire neighborhoods (fixed to explicit uncategorized omission), and dense Chicago tiles exceeded a 16 MiB decompression bound (measured approximately 40 MiB across its place tiles; raised per-tile cap to 32 MiB with an additional 96 MiB cumulative ceiling). Chicago then scored 9.8. San Francisco, Seattle, Boston, Honolulu, Anchorage and Burlington also produced complete scores. All 42 tests passed after integration, including the HTTP gate with required loopback permission. Independent Python spherical-vector calculation reproduced six first-round exported scores. Browser Chicago confirmation produced the same 9.8. Repeated-run, deployment and complete release audits remain required.
