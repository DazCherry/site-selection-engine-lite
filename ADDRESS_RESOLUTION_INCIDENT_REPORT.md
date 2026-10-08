# Production recovery — 2026-10-08

Original reported case: recovered in actual production v0.3.0-beta.1 after independent property verification, explicit candidate confirmation and live Overture score 6.8. Photon lacked a usable exact address point; its unrelated successful examples did not close this incident. The server-side Geocodio replacement resolves this case. Benchmarking separately revealed two high-confidence wrong-building source datasets; those are temporarily withheld across each dataset. Both known wrong-building examples were tested in actual production and cannot enter scoring. Upstream correction remains outstanding, but no longer blocks bounded Beta release under the owner's updated product decision. No confidential input is committed here. Detailed release evidence: docs/BETA_ACCEPTANCE.md and ADR 0008.

## Historical incident record

# Address resolution incident — open

2026-10-07. Baseline v0.2.0; candidate branch `sitebuddy-reliability-operations`. Production now runs v0.2.1 with the validated matching/diagnostic mitigation; the coverage incident remains open. The exact privately reported address is deliberately omitted from this public repository.

## Evidence and root-cause status

The existing validator accepts the reported comma-separated shape; requiring an explicit country was misleading error copy, not an actual country-presence check. Source inspection confirms all empty normalized candidate lists produced that same message, so the message alone cannot identify coverage, malformed fields, filtering or rank truncation. The existing normalizer required house/street/city/country, discarded state/ZIP from labels, requested only five upstream candidates and never checked returned number/street against input. This last issue is an independently verified false-positive risk, not evidence of what happened in the reported search.

The owner explicitly authorized the exact private incident address to Photon on 2026-10-07. Earlier missing approval was not an owner refusal. Live free-text calls at limits 5 and 10 returned HTTP 200: three features (one bridge tagged as type house and two streets), all without a house number. Expanded street/state spelling returned only two street features. Official structured queries with house, street, city, country and, separately, state/postcode also returned HTTP 200 and only streets without house numbers. Thus the tested provider responses lack a usable address point; this is not proof that every underlying map database lacks the address. Increasing rank limits, punctuation changes and structured query parsing did not resolve this case. No structured fallback is deployed merely because it exists.

Actual v0.2.0 production browser reproduction displayed the original “Add the street number, city, and country” message and withheld the score. Code inspection verified that Find location calls Photon only; Overture runs only after a separate candidate confirmation. A browser approval initially misclassified the combined disclosure as immediate Overture transmission; production-source evidence allowed the Photon-only reproduction without broadening consent. No candidate was confirmed and no Overture request for this case was initiated. The private input was cleared afterward and is excluded from fixtures, screenshots and repository evidence.

Root cause established: the tested Photon lookup supplied street/bridge-level results rather than a complete address-level match; normalization correctly refused them, while production recovery copy incorrectly suggested missing input fields. The address remains unresolved. UI mitigation and success at unrelated addresses do not close the coverage incident.

An independent public example from the [Census geocoder API documentation](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html), 4600 Silver Hill Rd, Washington, DC 20233, was queried directly against Photon with limit 10 on this date: valid FeatureCollection, zero features. That establishes an upstream no-result outcome for this public example, not the root cause of the private incident and not universal provider coverage.

## Bounded systemic changes

Normal US state/ZIP input can omit commas. Common street suffixes and direction abbreviations compare consistently; a suite token may be omitted from the provider query while house/street/locality constraints remain. Candidate number and supplied street/city/state/ZIP must agree; nearby numbers and centroids are rejected. Candidate labels include state and postcode. Ten upstream candidates are checked, still displaying at most five. No per-address workaround, fuzzy coordinate guess, extra scoring dimension or model change exists. Empty-result copy explains provider limitations and recovery instead of blaming the user for an allegedly missing country. A nonempty response containing no acceptable address now produces a distinct precision/mismatch explanation; a bridge tagged as house is still rejected without a house number. Synthetic regression cases cover both outcomes.

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

### Exact-case candidate validation

At public checkpoint 42d2686 / preview deployment 6ac6e5e4f8db3d00084c9122, the authorized reported case rendered the distinct no-complete-matching-address explanation and kept the score unknown on desktop Chrome and 390px in-app-browser width. The same candidate preserved the independently public civic 9.6 result. CI, local and clean checkout each passed the 96-test gate. This is a validated diagnostic mitigation; the reported address still has no usable Photon match. No incident closure or production promotion is claimed.


Production v0.2.1 acceptance repeated the exact authorized case after deployment: provider places remained insufficient for a complete matching address, the new diagnostic appeared, and the score remained withheld. The private input was cleared; no additional provider received it. This is a verified mitigation, not a coverage repair.

## Recovery evaluation — 2026-10-07 PDT

Incident remains OPEN. Photon coverage is not repaired by the v0.2.1 diagnostic. Municipal property evidence confirms the commercial site but contains a postal-code inconsistency; no incorrect point is accepted to work around this. ADR 0007 documents Geocodio as the first candidate for actual evaluation, not a selected or proven replacement. A disabled server adapter, private evaluation harness and eight mock regressions are prepared; all 105 tests pass. Thirty commercial addresses across 22 states have independent official address references, but no candidate-provider accuracy result exists yet. Owner account/terms/key authorization is required next. No production change.

Clean checkpoint 8725e5d: fresh clone, frozen dependency install with lifecycle scripts disabled, Node v24.19.0 / pnpm 11.25.0; all 105 tests and publication/history checks passed. Initial offline install lacked registry metadata; normal frozen install passed the supply-chain policy. No lockfile changes. This is local clean-environment evidence, not Netlify runtime validation.


## Candidate data-quality finding — 2026-10-08 PDT

Geocodio credentials authenticated and a free-tier hard cap was saved. The original incident passed independent municipal parcel/building verification and local live Overture handoff (6.8), but has NOT passed production. The 30-address commercial sample yielded 22 correct property/address matches, 1 confirmed incorrect building, 7 unresolved and 0 provider errors. Three query variants and reverse geocoding repeat the wrong-building result despite maximum provider confidence. Geoapify public-demo alternatives did not establish original-property precision. See ADR 0007 for evidence, timing, narrow normalization changes and rejected mitigations.

Active frontend remains v0.2.1. Candidate transport, disabled server route and quota remain isolated; no Netlify activation, public push or production deployment occurred. Provider-reported precision is explicitly labeled. The review gate rejects incorrect/unverified candidates and keeps every outcome in its denominator. A public-commercial supplier correction report is prepared outside Git but not sent; explicit communication authorization is needed. Subsequent clean/preview/production gates cannot turn this upstream quality failure into PASS. Earlier email/export acceptance remains unchanged; the address incident is OPEN.


Clean-checkout evidence — 2026-10-08 PDT: local checkpoint 501bb9b was cloned without hardlinks into a fresh directory. Frozen-lockfile installation with lifecycle scripts disabled passed; all 113 tests passed; publication/history scanning, vendor rebuild and preview-asset build passed; the checkout stayed clean. This was a local preview asset build, NOT a Netlify Deploy Preview. Public production homepage returned HTTP 200 and displayed v0.2.1; no new production address acceptance is claimed. No candidate push, remote CI run, staging deployment or production promotion occurred. Provider data-quality finding remains open. The provider-report browser session currently needs owner login, and submitting the prepared report awaits explicit communication authorization.


## Provider report sent — 2026-10-08 PDT

Owner explicitly authorized the correction report. The report was sent to Geocodio official support by email, with Gmail confirming sent. The web form was not submitted because it adds a liability waiver; no new legal terms were accepted. Content contains only the public benchmark case, returned point/metadata, reproduction variants and official reference links. No credentials, owner incident input or visitor data were sent. Provider acknowledgement, ticket identifier and remediation remain unverified. Production stays v0.2.1 and the incident remains OPEN. This is a documentation-only update; no tests or deployment were rerun.
