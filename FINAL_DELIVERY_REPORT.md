# Public Lite delivery report

## Executive summary

Site Selection Engine Lite implements an independent, deliberately limited, brand-agnostic Universal Site Score. The original release candidate's live-data failure has been repaired by replacing the stalled query service with bounded reads of openly licensed monthly map releases. Repeated live acceptance passes for seven U.S. civic addresses, and the deployed browser reproduces three geographically different cases. Automated quality gates pass locally and on GitHub; a clean checkout completes a live browser assessment. The release is versioned **v0.1.0**, with the final release tag resolving its complete source.

## Deliverables

- Public source: https://github.com/DazCherry/site-selection-engine-lite
- Public demo: https://site-selection-engine-lite.cherrry577.chatgpt.site
- Final release: [v0.1.0](https://github.com/DazCherry/site-selection-engine-lite/releases/tag/v0.1.0); [immutable tagged source](https://github.com/DazCherry/site-selection-engine-lite/tree/v0.1.0).
- Public runtime commit: `e302c1bc33cea2135bf20e89a7f585e585fdd8f5`. Subsequent release-record edits change documentation only.
- Provider implementation checkpoint: `c0fa2ec5cd0778c793b2bb3db036df7e2b1fa8e3` in the deployment source history.
- Runtime: committed `dist/`, requiring no package installation, API key, account or database.
- Detailed evidence: [release acceptance](docs/RELEASE_VALIDATION.md), [development log](docs/DEVELOPMENT_LOG.md), [provider decision](docs/ADR/0002-live-provider-reliability.md).

## Architecture and public methodology

Plain browser ECMAScript modules separate address validation, provider retrieval, normalization, scoring and presentation. Photon returns address-level candidates; users explicitly confirm the address and coordinates. Overture Places and Base PMTiles are read with exact bounded HTTP ranges, stable archive identities, validated schemas, geographic coverage and point filtering. A small pinned decoder bundle is committed with upstream licenses; runtime installation is unnecessary.

The independently authored illustrative rubric retains three equally weighted dimensions: retail variety (two points per category, capped at ten), five everyday service groups (two points each), and transit proximity (10 × (1 − distance / 750), with a qualifying stop within 600 m). The final mean is rounded once. Any missing dimension withholds the total. Category mappings and limitations are disclosed in the [model card](docs/MODEL_CARD.md). No private coefficients or business outcome calibration are used.

## Data sources and rights

Photon supplies OSM-derived geocoding. Overture supplies openly licensed monthly Places and Base data, with applicable CDLA-Permissive-2.0, Apache-2.0, CC0 and ODbL notices. [Data policy](docs/DATA_POLICY.md) and [credits](dist/credits.html) preserve attribution and license obligations. Downloaded live snapshots include full license texts, source release, provider, normalized records and declared transformations. Synthetic examples are independently generated and CC0. No customer records or downloaded live dataset is committed.

## Verification

- **45 automated tests pass**, including numerical regressions, geographic invariants, provider bounds, malformed/stale data, contradictory records, throttling, cancellation, replay, HTTP and publication checks.
- GitHub [quality run 37497771105](https://github.com/DazCherry/site-selection-engine-lite/actions/runs/37497771105) succeeds for the exact public runtime commit on a clean Ubuntu/Node 22 runner, including frozen dependency reproduction, all 45 tests and publication/history scans.
- A fresh local clone passes tests and history scans. Frozen-lock installation and a decoder rebuild produce no bundle difference. The package advisory audit reports zero known vulnerabilities; unknown vulnerabilities remain possible.
- Seven public civic addresses across the continental U.S., Hawaii and Alaska pass repeated real provider retrieval. One initial dense Chicago response exceeded the decompression cap; the failure withheld a score, was repaired within explicit aggregate bounds, and subsequent CLI/browser/repeated runs pass.
- A separate Python spherical-vector implementation independently reproduces all seven repeated scores and the Chicago browser snapshot. Node replay also exactly matches the downloaded browser assessment.
- Deployed Chrome journeys: Honolulu 8.9, Anchorage 8.5, Chicago 9.8, with confirmation, dimension explanations, record counts and release provenance. A 390 px viewport has no horizontal overflow. Malformed address input clears the previous result and is rejected.
- The previously approved clean-clone server completes Burlington at 9.6 from real providers. The anonymously cloned public runtime is byte-identical to the final deployment source. Its difference from the locally tested clean clone is limited to version/banner text and corrected synthetic provenance text. Final deployed smoke verifies the corrected synthetic wording.
- A later additional local clean-clone test invocation was not executed because the automatic approval service hit an account usage limit. It is not counted as passing; the already completed local clean-clone suite and independent successful GitHub clean-runner suite provide the automated clean-environment evidence.
- Mixed synthetic example returns 7.5; sparse synthetic data withholds the total. Provider failures never substitute synthetic output.
- No app-origin browser errors observed in deployed checks. An unrelated browser extension reported a message-channel error earlier in the session.

## Root cause and fixes

The previous Overpass host completed connection/TLS but its API returned no bytes even for minimal requests. An independent public endpoint returned HTTP 504. This establishes service-path unavailability; the upstream server-internal cause is unknown. Increasing retries or concealing errors was not a reliable repair. The replacement retrieves existing release files, avoiding that on-demand query dependency.

Review also found and fixed: optional missing taxonomy being treated as invalid rather than unclassified; dense-tile decompression capacity; missing archive-layer metadata validation; unbounded CLI snapshot size; property-order-sensitive replay comparison; and synthetic provenance wording that incorrectly implied monthly observations. Earlier fixes include provider-specific cooldown, enforced 429 waiting, strict calendar dates and cached-source freshness checks.

## Adversarial and publication review

Reviewed product correctness, formulas, geographic coverage, provider failure paths, record redaction, stale releases, range/ETag validation, decompression and total resource budgets, dependencies, UI output, replay, documentation and IP boundaries. The app rejects incomplete or unvalidated responses, uses text-only rendering, and retains no browser-persistent assessment history. Providers receive the disclosed address/area and IP; visitors consent before requests.

Publication scans cover allowed artifacts, secret patterns, restricted customer-term fingerprints, private paths and Git history. Manual review found no proprietary methodology, customer data or private reference documents. Generic civic test locations are public examples. Scanning cannot prove absence of every semantic disclosure. No additional score dimensions, richer paid intelligence or private engine features were added.

## Limitations and deferred capabilities

This is a stable software target for a limited public demo, not a validated commercial decision model or an SLA-backed location-intelligence service. Releases are monthly; individual feature recency and completeness are unknown. Scores favor mapped mixed-use settings and are not comparable calibrated estimates of business success. Point-only geometry avoids inventing destination coordinates but omits useful polygon/line features. Public providers can fail, throttle or change schemas; the app withholds results when required data cannot be validated. Modern browser fetch, streaming decompression and abort APIs are required.

No demand, demographic, mobility, footfall, route-frequency, competition-quality, visibility, rent, revenue, brand-fit, calibration or learning capability is included. Optional experimental WebMCP was unavailable in the tested browser; ordinary UI is the supported path and no WebMCP execution success is claimed.

## Deployment and future work

Run `node scripts/serve.mjs`; open its loopback URL. Run `node --test tests/*.test.mjs` and `node scripts/publication-check.mjs` before publishing. Serve only the contents of `dist/` over HTTPS with JavaScript MIME and equivalent CSP/security headers. A backend, database and API secrets are unnecessary. Rebuild the pinned decoder using the README procedure only when needed.

Before broad commercial traffic, arrange provider capacity and review then-current terms. Build any future Private Engine in a separate private repository with its own approved data and validation; reuse only approved generic utilities. Private methodology must never flow back into Public Lite.
