# ADR 0001 — Independent mapped-context rubric

Accepted for Public Lite v0.1.0. All capabilities below are PUBLIC APPROVED under the boundary table, before implementation.

Use three equally weighted dimensions: retail category variety, everyday service category variety, and straight-line proximity to a mapped transit stop. A 600 m radius is a deliberately small, reproducible geographic window, not a measured trade area or walking route. This independent illustrative rubric has no private-derived coefficients or success calibration.

Retail uses twelve published groups. Services use five published groups. Each observed group contributes two points, capped at ten. A mapped transit stop contributes max(0, 10 × (1 − distance / 750)); only stops at most 600 m away qualify. Round only the mean of the three unrounded scores to one decimal. A dimension with no usable observations is unknown, not zero. Withhold the total unless all three are available. Empty, incomplete, contradictory, future-dated or stale provider responses must not become a fabricated score.

Use plain ECMAScript modules with zero runtime packages. The same pure calculation module runs in the browser and Node tests. Browser adapters use Photon and the Private.coffee Overpass instance with explicit user consent; synthetic examples require no network. No server stores addresses. Sources, timestamps, normalized records and the public model version travel in a user-requested local JSON download for reproduction. No upload/import feature.

Default endpoints are fixed in source and restricted by CSP. No URL query parameter can replace them. Manual requests only; small area, timeouts, bounded responses, in-memory cache, cooldown and no automatic retries or endpoint rotation. A larger service must arrange its own provider capacity.

Limitations: map completeness and recency of individual features are unknown; building centers are approximations; missing bus data prevents totals; more mapped categories are not evidence of more demand. Retail and services may be correlated. This intentionally narrow rubric favors urban mixed-use settings and is unsuitable for investment or cross-market rankings.
