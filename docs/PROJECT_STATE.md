# SiteBuddy project state

Version: v0.2.0 candidate. Frozen baseline: released v0.1.0, scoring lite-map-context-1.0.0. Final checkpoint validation is in progress; do not infer readiness from deployment alone.

## Source and deployment

Canonical repository: https://github.com/DazCherry/site-selection-engine-lite. Production: https://sitebuddy-free.netlify.app, GitHub main. Staging: https://sitebuddy-staging.netlify.app, sitebuddy-staging. PR #1 merged the staged candidate as 2948c429a0ff521280874c9d73cd705f231b4bbe. Production deploy 6ac5f811f46cce13e426e0ed passed its actual user journey and private destination checks. Netlify production flag is SITEBUDDY_PUBLIC_RELEASE=1; deploy-preview/branch contexts force zero. No domain purchase or upgrade. Original Sites prototype remains unchanged.

## Architecture and boundary

Static browser ES modules provide consented public-address lookup, Overture normalization and frozen three-dimension scoring. Unknowns withhold the total. Address-free sharing encodes only a strict summary in a URL fragment. Optional isolated modules post allowlisted events and fixed-choice feedback/interest to same-origin Netlify Functions. Private Blobs stores separate aggregates from contacts and production from previews. Daily scheduled cleanup targets 30-day aggregates and 90-day submissions. No address history, browser persistence, automatic email, Paid capability or Private Engine exists. See ARCHITECTURE, DATA_POLICY, ANALYTICS and FEEDBACK_AND_INTEREST.

## Validated capabilities

Branding/share, analytics, feedback/interest, SEO/social/privacy and launch drafts each passed staged gates. Original 45 tests remain; 69 total tests pass in clean Node/pnpm environments, including exact scoring-file integrity. Actual production retrieved two public addresses (9.6 and 9.7), shared an address-free summary to a fresh recipient, repeated analysis, rejected malformed input, withheld sparse total, and received mobile synthetic feedback/interest. Private receiving destinations showed exact records and 22 expected QA events with no location/email analytics. Desktop Chrome and 390-pixel viewport were inspected; no other-browser/physical-device claim.

## Limitations and future work

Map coverage, geocoder availability, monthly releases and individual feature age remain uncertain. Public score is illustrative, not commercial prediction. Consent-based counts are not unique users or total traffic. Abuse controls reduce but cannot eliminate fabricated submissions. Retention service outages can delay deletion; monitor scheduled function failures. No real 30/90-day elapsed retention cycle has been observed. Future capability categories are unvalidated demand hypotheses; owner decides future Free/Paid/Private investments.

## Resume and owner operations

Read AGENTS, PUBLIC_PRIVATE_BOUNDARY, DISTRIBUTION_ACCEPTANCE, DEVELOPMENT_LOG and DISTRIBUTION_READINESS_REPORT.md. Final checkpoint must have clean tests, publication/privacy review, staging and production smoke before release. Private receiving records are accessible in Netlify Data & storage → Blobs; never publish signed download URLs or real contacts. Launch kit contains drafts only; no community post or outreach is authorized.
