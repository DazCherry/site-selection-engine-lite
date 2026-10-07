# Address resolution incident — open

2026-10-07. Baseline v0.2.0; candidate branch `sitebuddy-reliability-operations`. Production remains the existing release. The exact privately reported address is deliberately omitted from this public repository.

## Evidence and root-cause status

The existing validator accepts the reported comma-separated shape; requiring an explicit country was misleading error copy, not an actual country-presence check. Source inspection confirms all empty normalized candidate lists produced that same message, so the message alone cannot identify coverage, malformed fields, filtering or rank truncation. The existing normalizer required house/street/city/country, discarded state/ZIP from labels, requested only five upstream candidates and never checked returned number/street against input. This last issue is an independently verified false-positive risk, not evidence of what happened in the reported search.

Exact reported-address live reproduction is BLOCKED pending explicit authorization to transmit that private input to Photon. No request was made after automatic approval review rejected that transmission. No provider outage or missing-address conclusion is asserted for the exact incident.

An independent public example from the [Census geocoder API documentation](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html), 4600 Silver Hill Rd, Washington, DC 20233, was queried directly against Photon with limit 10 on this date: valid FeatureCollection, zero features. That establishes an upstream no-result outcome for this public example, not the root cause of the private incident and not universal provider coverage.

## Bounded systemic changes

Normal US state/ZIP input can omit commas. Common street suffixes and direction abbreviations compare consistently; a suite token may be omitted from the provider query while house/street/locality constraints remain. Candidate number and supplied street/city/state/ZIP must agree; nearby numbers and centroids are rejected. Candidate labels include state and postcode. Ten upstream candidates are checked, still displaying at most five. No per-address workaround, fuzzy coordinate guess, extra scoring dimension or model change exists. Empty-result copy explains provider limitations and recovery instead of blaming the user for an allegedly missing country.

Blast radius: all address searches, especially comma-free US entry, units, ambiguous names and upstream near matches. Conservative comparison can withhold legitimate postal aliases or incompletely tagged addresses; users can correct the input, but the application does not relax mismatches automatically. Explicit candidate confirmation remains necessary. Photon coverage and uptime are still limitations.

## Provider, financial and privacy decision

See ADR 0006 and PROVIDER_COSTS_AND_AUTHORIZATION. Google is not enabled or asserted compatible with derived Overture-based scoring. Its general terms raise a material downstream-analysis issue requiring clarification; a no-map allowance is not sufficient. Census interpolation is not silently substituted. The existing lawful Photon path is improved within bounded scope while coverage remains unresolved. No billing, keys, new accounts or sender DNS changes have occurred.

Shortened explicit disclosure remains a product privacy choice; no claim that every jurisdiction legally requires the checkbox. Nothing transmits while typing. Browser-direct Photon receives the address/network information; Overture requests reveal approximate area/network information. No server address history or analytics address property is added.

## Validation

Address tests cover common formatting, unit handling, direction, Alaska/Hawaii, strict number/street/city/state/ZIP disagreement, missing fields, centroid exclusion, deduplication, control characters and bounded request count. Existing provider/model tests pass locally, including frozen scoring integrity. Full local suite currently passes; later clean/staging/production evidence must be recorded in DEVELOPMENT_LOG before release. No production acceptance of this candidate or exact-incident closure is claimed.

## Prevention

AGENTS now requires PRODUCTION_INCIDENT_PROTOCOL. Keep sensitive reproductions out of Git, collect raw-response shape and filtering evidence before blaming a provider, use independent public/synthetic fixtures, preserve unknowns, and repeat the complete affected gate after every material finding. Address-free opted-in funnel diagnostics remain available; opt-out traffic is unknown.

### Executed preview evidence

Preview #3 at d54721b, deployment 6ac6c74cd7767700081b1ce1: actual comma-free public civic lookup resolved the correct 149 Church Street, Burlington, Vermont 05401, then retrieved Overture and displayed 9.6. The independent Census public example returned no candidates and left the score unavailable with the new recovery message. Desktop Chrome and 390px layout were inspected. This validates the bounded candidate change, not missing Photon coverage or the exact reported incident. CI/clean tests passed at the recorded checkpoint. Production is not promoted.
