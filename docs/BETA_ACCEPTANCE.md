# v0.3.0-beta.1 acceptance

## Candidate evidence

Original commercial corpus: 30 tested, 21 correct properties, 9 uncertain withheld, 0 no-match, 0 provider errors. Known raw wrong-building findings: 1, withheld. Separate holdout: 10 tested, 7 correct properties, 3 uncertain withheld, 0 no-match, 0 provider errors. Known raw wrong-building findings: 1, withheld. Zero known wrong candidates offered after containment. Read ADR 0008 for selection bias and holdout-driven correction. Real inputs, coordinates and detailed third-party evidence remain outside Git.

Original incident: independent municipal address/parcel/building evidence confirms the candidate property. Actual local browser confirmation and Overture retrieval returned 6.8. New production workflow not yet tested.

Adversarial review: maximum-confidence wrong building, mixed reliable/held source response, missing source, approximate/interpolated points, inconsistent street/door/state, malformed response, service failure, quota collision/failure, consent, stale results, withheld sharing/replay and secret-in-client boundaries. A stale future-review note when switching to a synthetic sample was found and fixed by resetting first. Review performed in this session; no separate reviewer-agent claim.

Full current automated gate, clean checkout, CI, Deploy Preview, desktop/mobile and production acceptance: pending. No PASS inferred from implementation or prior v0.2.1 tests.
