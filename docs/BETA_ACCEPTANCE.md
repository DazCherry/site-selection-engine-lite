# v0.3.0-beta.1 acceptance

## Candidate evidence

Original commercial corpus: 30 tested, 21 correct properties, 9 uncertain withheld, 0 no-match, 0 provider errors. Known raw wrong-building findings: 1, withheld. Separate holdout: 10 tested, 7 correct properties, 3 uncertain withheld, 0 no-match, 0 provider errors. Known raw wrong-building findings: 1, withheld. Zero known wrong candidates offered after containment. Read ADR 0008 for selection bias and holdout-driven correction. Real inputs, coordinates and detailed third-party evidence remain outside Git.

Original incident: independent municipal address/parcel/building evidence confirms the candidate property. Actual local browser confirmation and Overture retrieval returned 6.8. New production workflow not yet tested.

Adversarial review: maximum-confidence wrong building, mixed reliable/held source response, missing source, approximate/interpolated points, inconsistent street/door/state, malformed response, service failure, quota collision/failure, consent, stale results, withheld sharing/replay and secret-in-client boundaries. A stale future-review note when switching to a synthetic sample was found and fixed by resetting first. Review performed in this session; no separate reviewer-agent claim.

Executed pre-promotion gates: 117/117 tests in the working and clean canonical checkout; pinned frozen dependency installation, identical vendor rebuild, site build, publication/history/secret checks and whitespace checks pass. Final runtime candidate 7fa9efc passed GitHub Actions 37852371676 and 37852364298. Netlify preview 6ac8161fe881eb000886025f is ready.

Actual preview browser: original incident confirmation → live Overture → 6.8; address-free share output; both known wrong-building cases uncertain, no candidates/score/share/replay; future-interest CTA truthfully unavailable; feedback and interest acknowledgements verified in private preview Blobs, analytics receipts and four expected aggregate events verified. Geocoder quota contains only day/count. 390px viewport has scrollWidth=390, withheld flow works, synthetic regression returns 7.5 and clears the withholding note. Chrome desktop and in-app mobile-width coverage only, not physical-device coverage.

A local synthetic upstream fault harness exercised empty candidates, HTTP 503 and quota 429 in the actual browser UI: no-match, service-unavailable and rate-limit messages remain distinct; all withhold scores. Malformed array records were found during review and corrected to schema/service failure instead of false missing coverage. Full 117-test gate reran after the fix. These are injected failures, not an observed real upstream outage.

Owner-only production export authenticated successfully with the replacement credential; four output files outside Git have mode 0600. Mail, export, sharing, voluntary forms and the scoring model are unchanged from the validated v0.2.1 baseline, with applicable regression tests passing. Owner previously confirmed actual immediate, daily and production recovery emails in the inbox; this Beta does not claim a new inbox observation.

Production promotion and new workflow acceptance remain pending. No production PASS inferred from preview.
