# SiteBuddy project state

## Current production — v0.3.0-beta.1 (2026-10-08)

**READY for controlled Free Beta distribution.** Production: https://sitebuddy-free.netlify.app/. Canonical repository: https://github.com/DazCherry/site-selection-engine-lite. PR #4 runtime merge 0c1e7f78c49711481c2e9106ca8fcb0537495e84, accepted Netlify deploy 6ac8174273c0a40008b33888. Release tag v0.3.0-beta.1 identifies the final record checkpoint. Read BETA_ACCEPTANCE and ADR 0008 before continuing; older pending-authorization/release entries below are historical.

Original incident is recovered in actual production: independently checked property, explicit confirmation, live 6.8. Thirty-address corpus: 21 correct candidates / 9 withheld. Separate ten-address holdout: 7 correct / 3 withheld. Two raw wrong-building findings are safely contained using dataset-level holds; some correct points are consequently withheld too. No address exceptions or scoring changes.

117-test regression suite, clean checkout, frozen dependencies/vendor build, publication/privacy/history checks, CI, actual Deploy Preview, production desktop and 390px workflows, private receiving records, share recipient and owner export passed. Existing Resend fixed-owner operations remain intact with prior owner-confirmed inbox evidence. Known limitations: geocoder coverage/quality, source-wide withholding, small purposive samples, no physical-device coverage, no observed elapsed 30/90-day retention cycle. No further owner setup or new paid integration is required for this Beta.

## Active recovery goal — 2026-10-07 PDT

Branch address-resolution-recovery contains disabled Geocodio evaluation code and private benchmark tooling. Full 105-test mock/regression gate passes. Thirty official commercial-address references across 22 states are prepared outside Git. No actual Geocodio result exists; account/terms/key authorization is the next necessary owner action. Production is unchanged v0.2.1 and the original address incident remains OPEN. Read ADR 0007 before continuing.

## Current work — reliability and owner operations (2026-10-07)

Production is v0.2.1, merged PR #3 at 277e3389dd19378f4de595de8e7ffa10f298d4cb, deploy 6ac71ed4dc21140008637c60. The owner explicitly approved controlled production acceptance after automatic merge review required clarification of validation order. Resend immediate QA and daily QA messages reached the owner inbox. Production form notification and automatic recovery reached provider acceptance; the owner explicitly confirmed both notices in the inbox. Authenticated private export, production desktop/live/share and 390px synthetic feedback checks passed. The reported address remains unresolved by Photon; production now gives accurate insufficient-detail diagnostics and withholds scores. No Google billing or chargeable API is authorized. Older entries below are historical.

## Historical v0.2.0 checkpoint

Version: v0.2.0. Status: DISTRIBUTION READY for a controlled external test. Frozen baseline: released v0.1.0, scoring lite-map-context-1.0.0. Final clean 69-test gate, CI, staging/Deploy Preview and actual production acceptance passed. Release tag v0.2.0 identifies the final documentation checkpoint.

## Source and deployment

Canonical repository: https://github.com/DazCherry/site-selection-engine-lite. Production: https://sitebuddy-free.netlify.app, GitHub main. Staging: https://sitebuddy-staging.netlify.app, sitebuddy-staging. PR #1 merged the staged candidate as 2948c429a0ff521280874c9d73cd705f231b4bbe. Production deploy 6ac5f811f46cce13e426e0ed passed its actual user journey and private destination checks. Netlify production flag is SITEBUDDY_PUBLIC_RELEASE=1; deploy-preview/branch contexts force zero. No domain purchase or upgrade. Original Sites prototype remains unchanged.

## Architecture and boundary

Static browser ES modules provide consented public-address lookup, Overture normalization and frozen three-dimension scoring. Unknowns withhold the total. Address-free sharing encodes only a strict summary in a URL fragment. Optional isolated modules post allowlisted events and fixed-choice feedback/interest to same-origin Netlify Functions. Private Blobs stores separate aggregates from contacts and production from previews. Daily scheduled cleanup targets 30-day aggregates and 90-day submissions. No address history, browser persistence, automatic email, Paid capability or Private Engine exists. See ARCHITECTURE, DATA_POLICY, ANALYTICS and FEEDBACK_AND_INTEREST.

## Validated capabilities

Branding/share, analytics, feedback/interest, SEO/social/privacy and launch drafts each passed staged gates. Original 45 tests remain; 69 total tests pass in clean Node/pnpm environments, including exact scoring-file integrity. Actual production retrieved two public addresses (9.6 and 9.7), shared an address-free summary to a fresh recipient, repeated analysis, rejected malformed input, withheld sparse total, and received mobile synthetic feedback/interest. Private receiving destinations showed exact records and 22 expected QA events with no location/email analytics. Desktop Chrome and 390-pixel viewport were inspected; no other-browser/physical-device claim.

## Limitations and future work

Map coverage, geocoder availability, monthly releases and individual feature age remain uncertain. Public score is illustrative, not commercial prediction. Consent-based counts are not unique users or total traffic. Abuse controls reduce but cannot eliminate fabricated submissions. Retention service outages can delay deletion; monitor scheduled function failures. No real 30/90-day elapsed retention cycle has been observed. Future capability categories are unvalidated demand hypotheses; owner decides future Free/Paid/Private investments.

## Resume and owner operations

Read AGENTS, PUBLIC_PRIVATE_BOUNDARY, DISTRIBUTION_ACCEPTANCE, DEVELOPMENT_LOG and DISTRIBUTION_READINESS_REPORT.md. Every subsequent material change must repeat the applicable clean tests, publication/privacy review, staging and production gates. Private receiving records are accessible in Netlify Data & storage → Blobs; never publish signed download URLs or real contacts. Launch kit contains drafts only; no community post or outreach is authorized.

Final runtime checkpoint: 1551dbcb256ab19b10d1be626f8ad771a8b02e02, production deploy 6ac65353c57314000835f649. Final version-label smoke shows v0.2.0, synthetic 7.5 and measurement off after refresh. Runtime modules are unchanged from the fully exercised production journey.

Reliability candidate validation checkpoint: draft PR #3, public runtime d54721b / local c49437c, successful clean 93-test gate and CI 37696283954, Netlify preview 6ac6c74cd7767700081b1ce1. Actual preview address/Overture score, no-result recovery, 390px forms, idempotency/conflict/origin/schema denials and private store existence were checked. See latest DEVELOPMENT_LOG for later refinements. Real notification receipt/export and the exact private incident remain blocked; do not merge or create a release. Production main remains 1ef172b / v0.2.0.

## 2026-10-07 — owner approvals and exact-incident reproduction

Owner authorized the private incident input to Photon, Resend Free for the sole fixed owner recipient, and dedicated sender-subdomain preparation. Financial restrictions and no visitor mail remain mandatory; Google billing is not authorized. Prior missing approval was not a refusal. Resend login/terms handoff is pending; no key, DNS change or real message has been made.

Actual production v0.2.0 reproduced the misleading country/input error. Photon HTTP 200 free-text results contained only a bridge/street set without house numbers; expanded spelling and documented structured searches likewise produced no exact address point. No private address or raw response is retained in Git. The requested address is still unresolved and the incident remains open. Candidate code distinguishes nonempty but unusable results from empty coverage, with synthetic bridge and mismatch tests. No new provider, extra retry, approximate fallback or scoring change was introduced. Production remains unchanged; this new candidate delta still requires its full validation checkpoint.

Candidate validation: all 96 local tests passed, including the unchanged v0.1.0 model integrity gate; publication/history scanning and git diff whitespace checks passed. New response-diagnostic tests use only fictional fixtures. Actual production baseline failure was reproduced, not repaired or promoted.

## Executed candidate acceptance — 42d2686

Local checkpoint d0015c3 and public PR #3 checkpoint 42d268699af9034f3aafebb51ff39483a15ef39b have equivalent trees. Local and clean-checkout suites both passed 96/96; vendor rebuild and site build passed without tracked changes. GitHub Actions run 37708781754 passed. Netlify Deploy Preview 6ac6e5e4f8db3d00084c9122 succeeded.

Actual reported address on this preview produced the new nonempty-but-unusable explanation and withheld the score. Desktop Chrome was tested. A 390px in-app-browser viewport repeated that failure path with scrollWidth equal to innerWidth and unknown score; this is responsive-width coverage, not a physical-device claim. Chrome viewport override did not take effect and is not counted as mobile coverage. Public civic regression lookup still resolved 149 Church Street, Burlington and produced 9.6 from live Overture data. Private input was cleared and excluded from permanent evidence. Production v0.2.0 was reproduced separately and remains unchanged. The source coverage incident is OPEN, not fixed by messaging.

Resend owner login is complete; $0/month and no payment methods verified. Manual sender DNS records delivered privately; Enforced TLS applied. DNS verification, domain-restricted credentials, actual inbox receipt and authenticated export remain pending. No real mail, private export, merge, new release or production promotion occurred. Netlify token preparation explicitly discloses its account-level permission and seven-day expiry; creation is reserved for the owner's action.

## DNS and hosting setup update — 2026-10-08 UTC

After explicit owner authorization to edit DNS directly, the three dedicated sender records were added in GoDaddy. Owner completed both requested SMS checks. The authoritative nameserver returns the exact CNAME targets; DKIM is publicly visible. Resend records DNS verified but domain provisioning remains pending. Root MX/SPF and website records were preserved; no receiving or tracking domain was enabled.

Production-only sender and fixed-recipient configuration values were saved in Netlify; no key, activation timestamp or enabled flag was saved. The current Netlify plan disables Functions-only variable scope behind an upgrade. No upgrade is permitted or attempted. The compatible plan is production-context-only secret values with existing untrusted-deploy approval, pinned dependencies without install scripts, and a build that explicitly copies static assets and never serializes server mail environment values. A synthetic-sentinel build regression checks every public output and build stdout for accidental secret/recipient serialization. This does not prevent malicious future build code; retain review gates before production changes. Previews and local contexts receive no mail configuration.

Actual private export still requires an explicitly approved temporary account-level Netlify credential; no credential has been created. Actual email, inbox receipt and production release acceptance remain unvalidated.

## Authenticated export acceptance and credential incident

The repeated 401 was investigated across Python, curl, identity, owned-site and Blobs endpoints. The generated token was registered and unexpired; Site ID matched the intended project. Local input contained three identical copies of the same token concatenated. Validating a single original copy returned identity HTTP 200; the local private file was normalized only after validation. No token rotation was needed and no credential was logged. The hidden-input helper now rejects repeated token prefixes before saving; single/double/triple-paste and 0600-permission regressions passed.

Actual owner export then succeeded against Private Blobs. Three CSVs and aggregate operations JSON use 0600 files in a 0700 directory outside Git. Current production records are QA-only: one feedback, one interest and sixteen analytics rows are available when explicitly including QA; default exports exclude them and contain zero eligible public rows. This validates authenticated read/export and real QA exclusion, not the presence of customer demand. Failed attempts produced no partial files.

Resend domain is now verified and ready for sending. A sending-only, single-domain API credential is prepared but not yet created; actual send/inbox and remaining production gates remain unvalidated. Production and the scoring baseline are unchanged.


## Current recovery checkpoint — 2026-10-08 PDT

Geocodio credentials authenticated and a free-tier hard cap was saved. The original incident passed independent municipal parcel/building verification and local live Overture handoff (6.8), but has NOT passed production. The 30-address commercial sample yielded 22 correct property/address matches, 1 confirmed incorrect building, 7 unresolved and 0 provider errors. Three query variants and reverse geocoding repeat the wrong-building result despite maximum provider confidence. Geoapify public-demo alternatives did not establish original-property precision. See ADR 0007 for evidence, timing, narrow normalization changes and rejected mitigations.

Active frontend remains v0.2.1. Candidate transport, disabled server route and quota remain isolated; no Netlify activation, public push or production deployment occurred. Provider-reported precision is explicitly labeled. The review gate rejects incorrect/unverified candidates and keeps every outcome in its denominator. A public-commercial supplier correction report is prepared outside Git but not sent; explicit communication authorization is needed. Subsequent clean/preview/production gates cannot turn this upstream quality failure into PASS. Earlier email/export acceptance remains unchanged; the address incident is OPEN.

Executed local checkpoint: 113/113 tests passed (baseline plus adapter, quota, transport and independent-review regressions); publication/history checks and diff whitespace checks passed. An initial sandbox run could not bind the localhost security-test port; the approved rerun passed. The actual private 30-case review gate returns FAIL with 22 accurate, 1 incorrect, 7 unresolved, 0 provider errors and 0 unverified. Clean checkout verification follows; preview/production activation is deliberately blocked by this material finding.


Clean-checkout evidence — 2026-10-08 PDT: local checkpoint 501bb9b was cloned without hardlinks into a fresh directory. Frozen-lockfile installation with lifecycle scripts disabled passed; all 113 tests passed; publication/history scanning, vendor rebuild and preview-asset build passed; the checkout stayed clean. This was a local preview asset build, NOT a Netlify Deploy Preview. Public production homepage returned HTTP 200 and displayed v0.2.1; no new production address acceptance is claimed. No candidate push, remote CI run, staging deployment or production promotion occurred. Provider data-quality finding remains open. The provider-report browser session currently needs owner login, and submitting the prepared report awaits explicit communication authorization.


## Provider report sent — 2026-10-08 PDT

Owner explicitly authorized the correction report. The report was sent to Geocodio official support by email, with Gmail confirming sent. The web form was not submitted because it adds a liability waiver; no new legal terms were accepted. Content contains only the public benchmark case, returned point/metadata, reproduction variants and official reference links. No credentials, owner incident input or visitor data were sent. Provider acknowledgement, ticket identifier and remediation remain unverified. Production stays v0.2.1 and the incident remains OPEN. This is a documentation-only update; no tests or deployment were rerun.
