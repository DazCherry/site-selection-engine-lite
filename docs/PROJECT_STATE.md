# SiteBuddy project state

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
