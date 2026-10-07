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

## Production evidence update

Actual production: https://sitebuddy-free.netlify.app. GitHub main 2948c429a0ff521280874c9d73cd705f231b4bbe, deploy 6ac5f811f46cce13e426e0ed. The complete runtime journey passed: public 149 Church Street Burlington → confirmation → live 9.6 → address-free recipient; repeat with 28 Church Street → live 9.7; malformed-input rejection; mobile 390-pixel feedback/consent/interest; sparse withholding. Private destination showed exactly 22 expected QA events and both exact synthetic submission records. Production canonical, indexability, sitemap, privacy/credits, static PNG and structured-data CSP hash passed HTTPS checks. Integration probes passed duplicate/conflict/schema/origin/read rejection checks.

Social preview is validated as crawler-readable metadata plus a static image. No external platform post, scraper cache refresh or platform-rendered card is claimed. Scheduled retention logic passes boundary tests; scheduled functions are deployed, but a real 30/90-day elapsed cycle is not claimed. Provider failure logic is exercised in automated transport/pipeline tests and local missing-module/service browser fixtures; a third-party production outage was not deliberately induced. Actual production malformed-input and sparse-data failure paths were exercised.

### Final adversarial review method

A separate source/invariant review checked fields accepted at every persistence boundary, URL/referrer paths, rendering sinks, consent/defaults, stale asynchronous actions, duplicate event/submission identities, blocked optional modules, failure messages, frozen model hash, Free/Paid/Private copy and deployment reproducibility. No new material finding remained after the documented fixes. This is not a claim of external human review or penetration testing.

### Definition of Done traceability

| Conditions | Evidence / status |
| --- | --- |
| 1 identity | SiteBuddy title, header, copy and public URL; PASS |
| 2–4 frozen model and tests | Exact original module; original 45 plus 24 new tests pass; final checkpoint rerun pending |
| 5–7 Free/Paid/Private and IP | Classified capabilities; exact model; synthetic fixtures; source and publication review PASS |
| 8–12 GitHub/Netlify/no purchase/reproducibility | Canonical main, reviewed PR, GitHub CI, staging/preview, pinned build, *.netlify.app; PASS |
| 13–14 sharing/privacy | Actual copy/manual-visible link and fresh recipient, no address/coordinates; PASS |
| 15–17 analytics/funnel/privacy | Actual private production 22-event receipt; strict schema and consent; PASS |
| 18–21 feedback/Early Access/preferences/availability | Actual private production records, consent rejection, two categories, future-only language; PASS |
| 22–23 SEO/social | Production canonical, sitemap, indexability, OG/Twitter/static image, JSON-LD; PASS within supported scope above |
| 24–27 GitHub showcase/assets/research/sequence | README, static card, synthetic desktop/mobile screenshots, launch kit and sourced strategy; final checkpoint pending |
| 28–30 privacy/security/publication | Actual data-policy match, source review, strict handlers/CSP, tests/scanner; final checkpoint rerun pending |
| 31–32 clean environment/staging | Frozen install, vendor reproduction, 69 tests, staged runtime and PR Deploy Preview; PASS |
| 33–36 production/journey/mobile/desktop | Actual production desktop live/share/repeat plus 390-pixel forms/sparse flow; PASS on candidate |
| 37 failure behavior | Provider transport/pipeline, blocked optional integration, timeout/retry and deployed malformed/sparse paths; PASS at stated levels |
| 38–39 no material regression/privacy defect | No known open material finding after review; final checkpoint still required |
| 40–43 durable docs/report/release/owner-ready | Final version-label and documentation checkpoint, release identity and final smoke pending |

No owner-only blocker exists. No external distribution has begun.
