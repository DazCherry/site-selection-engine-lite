# v0.1.0 release acceptance record

Date: 2026-10-06. Runtime acceptance: PASS for v0.1.0. Release tag identifies the final source.

## Live public-address matrix

All addresses are public civic locations, unrelated to customer cases. Tests use real geocoding, current release discovery, bounded public file reads, normalization and the browser's scoring engine. First-round Chicago failure is retained, not removed from the test set.

| Civic location | Public address | First run | Repeated run | Repeated normalized records |
| --- | --- | --- | --- | --- |
| San Francisco | 1 Dr. Carlton B. Goodlett Place | 9.6 | 9.6 | 297 |
| Chicago | 121 North LaSalle Street | Decompression limit, withheld; fixed and retested 9.8 | 9.8 | 1,001 |
| Seattle | 600 4th Avenue | 9.7 | 9.7 | 376 |
| Boston | 1 City Hall Square | 9.7 | 9.7 | 626 |
| Honolulu | 530 South King Street | 8.9 | 8.9 | 205 |
| Anchorage | 632 West 6th Avenue | 8.5 | 8.5 | 187 |
| Burlington, Vermont | 149 Church Street | 9.6 | 9.6 | 256 |

Release: `2026-09-23.1`. Repeated full-address runs took 7.1–18.3 seconds, used 0.7–10.6 MB of wire data, and required no transport retries. Timing is environmental, not a guarantee. Fresh provider instances prevent application-cache hits from masquerading as repeat retrieval. These are compact civic settings, not a representative validation of all U.S. land use.

Address references: [Chicago](https://webapps1.chicago.gov/landmarksweb/web/landmarkdetails.htm?lanId=1277), [Seattle](https://www.seattle.gov/council/meetings/visiting-city-hall), [Boston](https://content.boston.gov/departments/mayors-office/contact-boston-city-hall), [Honolulu](https://www.honolulu.gov/mayor/townhall/), [Anchorage](https://www.muni.org/Pages/default.aspx), [Burlington](https://www.burlingtonvt.gov/FormCenter/Residents-9/Contact-Us-56).

## Independent cross-validation

A separate Python implementation used spherical-vector atan2 distance instead of production Haversine, independently accumulated category sets and reproduced all seven repeated-run totals exactly. It also reproduced the Chicago browser download (9.8). Node replay matched that entire stored assessment. Exports contain normalized public records, required licenses and provenance. No raw POI names or contact information was committed.

## Browser evidence

Chrome local UI: Chicago confirmation -> 9.8, all dimensions, source release and license disclosure; Seattle -> 9.7 with the same complete visible path. Initial Chicago over-limit failure displayed no score and recovered after repair. Successful Chicago path had no browser warning/error logs. The download includes attribution, declared transformations and license texts.

## Automated and adversarial evidence

45 automated tests pass, including model regressions, spherical tile coverage at high latitude/dateline, stale/future releases, category validation, redaction, partial archive failure, exact ranges/ETags, bounded retry, no retry on 429, cancellation and gzip inflation rejection. Publication/history scans pass. Pinned-package advisory audit reported zero vulnerabilities. This does not prove absence of unknown vulnerabilities.

Review found and fixed missing optional taxonomy rejection, insufficient dense-tile capacity, absent archive-layer schema validation and unbounded CLI replay size. Aggregate bounds remain enforced. No new score dimension, private economics, proprietary coefficients or customer-derived examples were introduced.

## Clean and deployed acceptance

A fresh local clone passed all 45 tests and publication/history scans. Frozen-lock dependency installation reproduced the committed decoder bundle byte for byte. Clean-clone browser synthetic examples returned 7.5 and an explicitly withheld sparse total.

The publicly deployed replacement runtime completed full user journeys for Honolulu (8.9), Anchorage (8.5), and Chicago (9.8), with correct confirmation, dimensions, record counts and release provenance. Its 390 px viewport had 390 px document width with no horizontal overflow. Malformed HTML-like address input was rejected and cleared the old result. No app-origin warnings/errors were observed; an unrelated Chrome extension logged a message-channel error before deployment testing.

## Final clean-environment and source evidence

GitHub [run 37497771105](https://github.com/DazCherry/site-selection-engine-lite/actions/runs/37497771105) passed for public runtime commit `e302c1bc33cea2135bf20e89a7f585e585fdd8f5`: Node 22, frozen dependency installation, exact vendor rebuild, 45 tests, publication/history audit. This independent clean runner supplements the completed local clean-clone checks. The existing clean-clone browser also completed Burlington at 9.6 from real providers.

An anonymous clone of the public source has runtime files byte-identical to the final deployment source. The earlier local clean clone differs only in version/banner text and synthetic provenance wording; its provider, model and vendor modules are unchanged. Final deployment was successful and the corrected synthetic wording was inspected in Chrome.

A redundant later local test invocation was not executed because automatic approval review reached its usage limit. No pass is claimed for that invocation, and the approval was not bypassed. Previously completed local clean-clone tests and the successful GitHub clean runner are the executed evidence. CI reported a non-blocking action-runtime deprecation warning and an upcoming runner-image notice.

## Definition-of-Done audit

| Gate | Evidence |
| --- | --- |
| 1. Public repository | Public GitHub source linked above |
| 2. Reproducible checkout | Local clone and independent Node 22 CI; exact vendor rebuild |
| 3. End-to-end assessment | Seven repeated public civic addresses; deployed UI journeys |
| 4–6. IP firewall and no private content | Pre-implementation boundary; manual source review; publication/history scan |
| 7. Explicit missing data | Sparse fixture withholds overall score; failure-path tests |
| 8–9. Automated and regression tests | 45 passing tests locally and in CI |
| 10. Security/publication | Transport/decompression/schema bounds; scan and manual review |
| 11. Adversarial review | Recorded failures, fixes and limitations above and in ADR 0002 |
| 12. Clean-environment end-to-end | Existing clean-clone browser, Burlington 9.6; clean-runner integration suite |
| 13. Accurate README | Monthly sources, three dimensions, explicit unknowns and limitations |
| 14. Development history | Git checkpoints, ADRs and dated development log |
| 15. Deployment instructions | Buildless static server and successful HTTPS deployment |
| 16. Public demo | Published runtime and verified live UI |
| 17. Versioned release | v0.1.0 package/UI; immutable release tag |
