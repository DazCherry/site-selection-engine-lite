# SiteBuddy distribution readiness report

Status: IN PROGRESS / NOT DISTRIBUTION READY. Updated 2026-10-07 UTC.

## Executive summary and positioning

SiteBuddy Free provides a limited first look at public U.S. mapped surroundings through the frozen v0.1.0 retail variety, everyday amenities and transit proximity rubric. No Paid intelligence or Private Engine was implemented. This report records executed evidence only.

## Source, release and environments

Canonical repository: https://github.com/DazCherry/site-selection-engine-lite. Stable release: v0.1.0, 72654445edbc2dde7f949aa0fecdb816f967ef85. Distribution release is not yet promoted. Dedicated staging: https://sitebuddy-staging.netlify.app, GitHub branch sitebuddy-staging, latest validated feature candidate 593e64360722c86ca17cfca52d9c43efba6b260e. Final production URL and release identifier: pending.

## Architecture since v0.1.0

The scoring module is byte-for-byte frozen. Added SiteBuddy branding, an address-free fragment summary, optional isolated browser modules, same-origin Netlify Functions and private Netlify Blobs. Build metadata distinguishes public production from noindex staging. Canonical GitHub source, frozen dependency installation, tests and publication checks gate builds. See docs/ARCHITECTURE.md, docs/ANALYTICS.md, docs/FEEDBACK_AND_INTEREST.md and docs/DATA_POLICY.md.

## Sharing, measurement and privacy

Sharing contains model version, date, kind and scores only; sender-provided content is unverified. Manual copy remains available. Analytics defaults off on each page; fixed event/channel/category/failure labels exclude addresses, coordinates, email and raw URLs. Private daily counts have bounded UUID deduplication and scheduled 30-day deletion. Event schema is in dist/analytics-schema.mjs; full interpretation is in docs/ANALYTICS.md. Anonymous counts do not identify distinct people and opt-in limits coverage.

Feedback uses fixed choices. Future-interest capture permits one to three categories, broad role and optional email with separate contact consent; no future capability is offered as available. Private idempotent records have scheduled 90-day deletion. No automatic email is sent. Netlify and map providers receive request network information. The app does not retain an address history. Local replay downloads include location and must be handled separately from summary sharing.

## Discoverability and launch package

SiteBuddy README, public privacy page, static 1200×630 card, canonical/OG/Twitter/JSON-LD metadata and production sitemap are implemented. Hosted validation remains pending. Launch drafts and research are in docs/launch/LAUNCH_KIT.md and docs/research/DISTRIBUTION_STRATEGY.md. Start with a small feedback group, then relevant technical/professional communities, then broader launch if reliability and usefulness support it. No external posts were made. Final production screenshots and URLs remain pending.

## Executed validation

- Original 45 regressions plus frozen-model integrity and sharing: 51 passed locally, clean checkout and staging live/recipient/mobile checks.
- Measurement: 59 local/clean tests; private staging object showed exact expected 18-event core journey, consent behavior and deduplication; malformed and cross-origin payloads rejected.
- Feedback/interest: 65 local/clean tests; staging private destination contained exact synthetic responses and explicitly consented example-domain email. Analytics reached expected 24 events without contact data. Duplicate/conflict/oversize/read tests returned expected status.
- Discoverability/bootstrap: 69 local tests passed; core-module-missing browser fixture displayed safe disabled intake. Final origin validation change still requires rerun.
- Local 390-pixel feedback layout and staged 390-pixel share-recipient layout inspected without horizontal overflow. Desktop Chrome used. No physical-device or other-browser coverage claimed.

Complete evidence, build failures and fixes are in docs/DEVELOPMENT_LOG.md. Test files cover input/provider failures, normalization, scoring, unknowns, replay, publication, sharing, measurement, submissions and metadata. Retention boundary logic was tested; no claim of observing a real 30/90-day cycle.

## Adversarial findings and fixes

Fixed pnpm staging installation failure with frozen/ignore-scripts installation; stale async share completion with snapshot identity; narrow email field with responsive width; potential core-script native GET fallback with disabled intake, POST and CSP. Optional collector/module failure does not prevent scoring. Final independent review and complete production journey remain open.

## Open acceptance and dependencies

Final clean checkout, full latest CI/staging gate, GitHub-approved production deployment, actual public production live journey, destination receipts, mobile/desktop checks, SEO/social headers/assets, final security/publication review, screenshot assets and identifiable release are pending. No current owner action is needed. Dependencies include Photon, Overture public storage, Netlify Functions/Blobs and GitHub. Provider coverage/outages, consent-biased analytics, service quotas and owner monitoring remain limitations. No feature can be marked production PASS merely because deployment succeeds.

## Deliberately deferred and commercial decisions

No demographics, competitive intelligence, footfall, trade-area model, financial feasibility, restaurant/retail/beauty-specific report, billing or private enterprise feature was built. Those categories are unvalidated demand hypotheses. Owner chooses future investment using real engagement and voluntary responses; this phase makes no commercial commitment.
