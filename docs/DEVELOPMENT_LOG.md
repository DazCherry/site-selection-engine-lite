# Development log

## 2026-10-05 — Boundary and authorization checkpoint

Read the owner request and confidential background document without importing them. Resolved contradictory sequencing in favor of independent Public Lite first; rejected private-methodology extraction and private decision bands. Established the capability classification before implementing scoring. Added durable development rules.

Environment checks: Git is available; GitHub CLI is unavailable; no GH_TOKEN or GITHUB_TOKEN is configured; no GitHub connector tools are exposed. A GitHub plugin is discoverable but connection requires owner action.

Tests: no application tests executed; application not implemented. Boundary document checked for required classifications and pre-implementation capability table. No public release or repository creation claimed.

Blocker: public repository authorization. Owner request explicitly treats missing GitHub access as an owner-only blocker and directs waiting after reporting it. Requested action: create an empty public site-selection-engine-lite repository and grant access. No manual scaffold needed.

Next work after access: verify repository and authorization; research public data and location-intelligence architecture; finalize public model and stack; build and pass each required feature gate; publish only after full review. All implementation, runtime validation and final release gates remain open.

## 2026-10-05 — GitHub connection verified

The GitHub connector is now connected and authenticated. The prior connector-connection blocker is resolved. Repository search found no matching accessible repository; a direct lookup of the requested repository under the authenticated account returned 404. Available connector operations can edit existing repositories but do not include repository creation. Browser fallback reached a sign-in page, so it cannot currently create the repository either.

Remaining owner action: create an empty public repository named site-selection-engine-lite and grant the connected app access, then provide the URL. Do not scaffold files manually. This is the repository-creation blocker explicitly anticipated by the owner request, not a request to approve a development phase.

No application tests or release gates are claimed complete. The pre-implementation IP boundary remains established. Resume independent research and feature implementation once the requested repository is available.

## 2026-10-05 — Gate 1 passed

Public repository created through the authenticated browser; connector confirms public visibility and write access. Added independent model ADR, pure scoring and normalization modules, and fictional fixtures. Completed source-to-assessment integration and snapshot replay. Fifteen model tests passed, including an independently derived equatorial distance/score calculation, duplicate and ordering invariants, malformed records, stale data, missing data, radius boundaries, dateline and polar geometry, and output redaction.

Adversarial findings addressed: repeated categories cannot inflate variety; contradictory duplicate identities fail closed; missing categories remain unknown; only recognized categories enter scoring. Individual feature recency remains unknown and is documented. A test invocation initially used the parent directory; corrected the working directory and reran successfully. No application defect was implied by that invocation error.

First working static preview responds HTTP 200 and was handed to the app. Next gate: public adapters and address confirmation; then complete browser integration and publication controls.

## 2026-10-05 — Gate 2 adapter review

Added Photon address normalization and a replaceable Overpass adapter. Only address-level results can be confirmed; incomplete or malformed candidates are omitted. Bounded streaming reads, timeout, provider response validation, sanitized errors, five-minute memory cache, single in-flight request, and cooldown protect the small public demo. No silent failover or fabricated data.

Twenty-four model and adapter tests initially passed. Adversarial review found that a shared cooldown would block immediate address confirmation; changed cooldown bookkeeping to each provider and added a regression for the actual two-provider journey. The combined regression is rerun before checkpoint. No personal addresses or provider records are committed as fixtures.

## 2026-10-05 — Application and security checkpoint

Completed the visible browser journey, plain-text rendering, explicit address confirmation, score explanation, provenance, local snapshot download and optional synthetic-only WebMCP hook. Thirty-two automated tests pass after adding strict calendar-date validation and enforced HTTP 429 cooldown. Local HTTP tests required an authorized loopback bind after an initial sandbox EPERM; they then passed.

Actual browser checks: mixed fixture shows 7.5; sparse fixture withholds total and shows unknowns; 390 px mobile layout has no horizontal overflow; desktop layout inspected; public civic address geocoding returns address candidates; selected map retrieval times out and leaves no previous score; example recovery works. Downloaded synthetic snapshot independently recalculated in Python gives 7.5. Optional document.modelContext is unavailable in the tested browser, so WebMCP execution validation remains unavailable.

Live-provider limitation: Node geocoding encountered HTTP 429; browser geocoding succeeded. Private.coffee map retrieval timed out in browser and a small direct diagnostic query. One documented alternate provider also timed out; it was not installed as hidden failover. No successful live map assessment is claimed yet. Continue release preparation while keeping that acceptance item open.

## 2026-10-05 — Clean-checkout and release-candidate decision

Fresh local clone with no installed packages: all 32 tests pass. Browser against its separately served static assets reproduces 7.5 and rejects markup input without executing it or retaining the previous score. The source checkpoint is public. Provider status diagnostics complete TLS but receive no response bytes; live-context acceptance remains unresolved. Optional WebMCP execution remains unverified because the browser does not expose the proposed API.

Decision: label the application 0.1.0-rc.1 and display the open live-validation limitation. Do not claim final Definition of Done or issue a stable release while this acceptance item remains open. Prepare the deployable showcase and full delivery report so the remaining provider action is concrete.

Final adversarial review identified a cached response crossing the source-age threshold. Fixed the cache-hit freshness check and added test 33. GitHub Actions run 37426140032 passed the earlier 32-test source checkpoint. Full 33-test clean-candidate rerun follows before publication; no live-provider success is claimed.


## 2026-10-05 — Hosted candidate and final verification

All 33 tests pass in the final source and fresh checkout. Browser reload of the clean candidate confirms 7.5, synthetic labeling and the preview-release limitation. Publication/history scans pass. Sites packaged the exact validated static source and reports a successful owner-only deployment at https://site-selection-engine-lite.cherrry577.chatgpt.site. Packaging initially lacked Node on the child process PATH; added the bundled runtime directory and reran successfully. A short-lived source credential expired and was refreshed through the same Site's normal workflow, without saving it to source or disk.

Automatic approval review rejected making this specific hosted demo public, requiring explicit sharing approval. The owner-only demo is available for review and approval was requested separately. The public GitHub repository is already authorized and remains public. No access-review rejection was bypassed.

Stable release remains withheld pending successful live map-context acceptance. Final candidate tagging and public-source verification follow.


The owner explicitly approved public access to the specific hosted demo. Updated its audience to public through the normal Sites access tool. The demo now permits anyone with the link. The earlier approval-review blocker is resolved; live context-provider validation remains the release limitation.


## 2026-10-06 — Candidate released

Published v0.1.0-rc.1 as an explicit GitHub prerelease at commit d1be8818fad54e7f96b269753219512c56a499fc. An anonymous clone of that exact public commit passes all 33 tests and publication/history checks. GitHub Actions runs 37426886117 and 37426997657 both report success for the same commit. All eight deployed runtime files match the public checkout byte for byte. Report and README now link the public demo and verified release.

Open blocker: live Overpass data retrieval has not passed acceptance because provider requests time out after successful connection/TLS. No stable-release completion is claimed. Options are recovery of the public provider or an owner-approved reliable Overpass-compatible service, followed by live browser acceptance and regression. Do not remove the preview label without that evidence. No paid service or credentials have been obtained.

## 2026-10-06 — Stable-release reliability work resumed

Re-read the Master Instruction, repository rules and IP boundary. The RC is not complete. Isolated network sandbox DNS failure from actual upstream API stalls using authorized public-address diagnostics. Verified geocoding, fast TLS/homepage responses, stalled minimal map queries even with 55-second deadlines, and a second host's 504. Ruled out a responding endpoint whose service terms do not support this public app. Prototyped browser-readable Overture place tiles: complete 600-meter place coverage returned in approximately 1.55 seconds in the measured warm-network probe. Documented evidence and remaining gates in ADR 0002. No private source artifacts entered the repository. Next: validate transit infrastructure and select a bounded, reproducible provider architecture, then full implementation/feature gates. Stable release remains unproven.

## 2026-10-06 — Replacement adapter and repeated live acceptance

Implemented bounded Overture Places/Base retrieval after PUBLIC APPROVED classification. The same three dimensions and formula remain; normalization is separately versioned. Added release/range/ETag/schema checks, deadlines, download/decompression/feature budgets, bounded transient retry and 429 pause. Live data revealed uncategorized records and dense Chicago tiles; repaired both without proxy data or disabled limits. Seven civic addresses now return complete scores repeatedly. Chrome Chicago and Seattle display matching live scores. Python reproduces seven repeated-run snapshots and the browser download independently. Added full data/software notices, pinned vendor build, package audit (zero reported vulnerabilities), and 12 adversarial tests (45 total passing). Updated architecture, policy, model documentation and validation matrix. No paid/private functionality or confidential data was introduced. Remaining: final browser regression, clean reproduction, deployed validation and stable release audit.

## 2026-10-06 — Deployed live acceptance

All 45 tests and publication/history scans pass in a clean local clone. Frozen dependency installation reproduces the committed decoder bundle. The public deployment now passes full Chrome user journeys at Honolulu (8.9), Anchorage (8.5) and Chicago (9.8), agreeing with independent calculations. Narrow layout has no horizontal overflow; malicious-looking address input is rejected and clears an earlier score. Synthetic fixture provenance wording was corrected to avoid implying monthly real-world observations. No app-origin error logs occurred. Final public-checkout acceptance, CI and stable tagging remain next.

## 2026-10-06 — Stable release audit

The exact public runtime commit e302c1bc33cea2135bf20e89a7f585e585fdd8f5 passed GitHub quality run 37497771105 on Node 22, including 45 tests, dependency reconstruction and publication/history scans. Anonymous checkout runtime matches deployment source byte for byte. The already running clean-clone browser completed Burlington at 9.6. Final deployment succeeded and synthetic provenance wording is correct.

A later redundant local test request was not executed because automatic approval review reached an account usage limit; no passing result is claimed for that attempt. The earlier completed local clean-clone suite and independent GitHub clean runner are the actual evidence. No approval control was bypassed. Runtime, scoring and provider code remain unchanged by this final documentation checkpoint. The v0.1.0 release completes the deliberately limited public scope; monthly coverage uncertainty, provider availability and lack of commercial calibration remain explicit limitations.

## 2026-10-07 UTC — SiteBuddy distribution phase opened

Received the new master goal and its missing continuation, including 43 distribution acceptance conditions. Preserved v0.1.0 and based the development branch on canonical public GitHub history. Added pre-implementation Free/Paid/Private distribution classifications, acceptance matrix and project state. An exact v0.1.0 model-integrity test passes. Netlify account sign-in is now available; included plan capacity was inspected without purchasing or changing billing. No new functionality is live and no distribution gate is marked passed. Next: provider/privacy architecture, staged implementation and destination-verified acceptance.


## 2026-10-07 UTC — First distribution slice staging validation

Implemented SiteBuddy identity and strictly allowlisted address-free shared summaries. The link uses a fragment, contains only rubric version, source kind, date and scores, and explicitly states it is sender-provided and editable. No result directory, address history or added scoring dimension exists. Clipboard denial, absence and timeout have a manual fallback; native sharing was deliberately omitted after unreliable browser behavior. No operating-system clipboard-content verification or native-share support is claimed.

All 51 tests passed locally and in a fresh clone (the original 45 plus frozen-model integrity and five sharing tests). GitHub Actions runs 37582794064 and 37583476328 passed. Netlify staging deploy 6ac5eaa9b8f668750623077c initially failed because pnpm refused an esbuild installation script. Added frozen-lockfile/ignore-scripts flags, matching the already validated CI installation; deploy 6ac5eb0133c1c500089b1826 succeeded at b6bdf6b. Netlify's label “production” here refers to the default branch of the dedicated staging project, not promotion of the final product.

Actual https://sitebuddy-staging.netlify.app checks: HTTP 200; noindex/nofollow response header; CSP, no-referrer, frame and content-type protections; live Burlington civic address confirmation, retrieval and 9.6 result; copied-summary UI and visible link; recipient showing 9.6 with no location and empty new-address field; another-address reset; sparse sample withholding total; desktop visual inspection; 390×844 recipient screenshot with document width 390. No physical mobile-device coverage is claimed.

Adversarial review found a pending copy could re-show an old share panel after choosing another result. Added snapshot-identity guard after the asynchronous copy and reran all 51 tests successfully. This final fix still needs hosted revalidation before the slice checkpoint. Analytics, forms, full SEO, launch assets and final production acceptance remain unimplemented/unvalidated. Not Distribution Ready.

Reference for deployment flags: https://docs.netlify.com/build/configure-builds/manage-dependencies/ (accessed 2026-10-07 UTC).

## 2026-10-07 UTC - Optional measurement, staging pending

Added an independent optional browser module, strict schema, same-origin collector and private daily aggregates with pinned @netlify/blobs 11.1.3. No address, coordinates, email, raw URL, fingerprint or cross-page ID enters the schema. Fixed-channel attribution discards arbitrary input. Conditional writes, deduplication, daily limits and scheduled retention bound storage. Preview stores and the separate staging project isolate QA.

Eight new tests cover payload rejection, attribution redaction, concurrency/duplicates, bounded contention/capacity, HTTP validation/service failure, retention and consent. All 59 tests and publication checks passed; production dependency audit found no known vulnerabilities. A local browser without a collector showed measurement unavailable while still rendering synthetic 7.5. Hosted receipt and feature PASS remain pending.


## 2026-10-07 UTC - Core measurement staging gate passed

Candidate ea4d011e7cb1d845946081920beb3229278f727f, Netlify deploy 6ac5edb1a6c59b000873f3cc. Clean frozen install and all 59 tests pass. Actual authenticated Blobs view showed 3 initial events exactly once, then the full expected 18 events: one opted-in view; synthetic starts/success/withheld; share click/copied; repeat; real-address start/submitted/confirmed/success; rejected input start/failure; and four distinct synthetic QA probe events. Turning consent off, using a sample, then enabling again added neither the off-period actions nor another view. Concurrent duplicate probe requests produced only four unique QA counts, not six. Stored data contained only fixed counts and random event IDs, no address or coordinates.

Actual staging endpoint rejected extra fields with 400, a foreign origin with 403, and read attempts with 405. Burlington again returned 9.6; invalid markup cleared the prior score. An isolated local copy with the analytics module missing still scored 7.5 and shared successfully, with measurement disabled. A separate missing-collector test showed graceful unavailability. This is tested missing-module behavior, not claimed coverage of every browser blocker extension.

The Blobs Download action opens a short-lived JSON view in tested Chrome; use the authenticated UI, and never copy those private temporary URLs into public evidence. Scheduled retention logic passed boundary unit tests; no claim of observing a 30-day real-time retention cycle. Core funnel staging gate passes. Demand-specific events await their feature; final production acceptance remains open.

## 2026-10-07 UTC - Feedback and demand implementation

Added optional post-result fixed-choice feedback and future-interest forms, explicit contact consent, private idempotent submission storage and scheduled retention. No future capability is implemented. Six new tests cover schema/privacy, email consent, duplicate/conflicting submissions, endpoint failures, timeout retry identity and expiry. All 65 tests passed. Local missing-backend browser test retained selections and showed a truthful retry state. Desktop inspection found and fixed a narrow email field; the 390-pixel layout was then visually checked with no overflow. Hosted destination acceptance remains pending.


## 2026-10-07 UTC - Feedback and interest staging gate passed

Candidate 593e64360722c86ca17cfca52d9c43efba6b260e, Netlify deploy 6ac5f10602bd870008cf137b. All 65 tests passed locally and from a clean checkout. The deployed UI accepted synthetic fixed-choice feedback; refused a supplied example-domain email without contact consent; then accepted the same interest form with explicit consent. Authenticated private storage showed the exact feedback choices and a separate synthetic contact record with two categories, broad role and consent, without a searched address. No automatic email was sent.

The private analytics object increased from the prior 18 to exactly 24 events: page view, deeper CTA, feedback, interest and two preference categories. It contained no email or form-record ID. Actual endpoint replay returned duplicate without creating a second record; conflicting content returned 409; extra fields 400; oversized body 413; public read 405. Unit tests cover timeout retry and retention; local missing-service UI retained choices. Mobile-width form layout was visually checked at 390 pixels; final production mobile journey remains pending.

The feature staging gate passes. The public v0.1.0 model remains frozen. Final metadata, privacy page, launch package, production pipeline and full final acceptance remain open. Not Distribution Ready.


## 2026-10-07 UTC - Discoverability and launch candidate

Added static brand social card, canonical/OG/Twitter metadata, free WebApplication structured data, production sitemap, staging noindex, public privacy explanation and draft launch assets/research. No external launch posts were sent. The social card contains no real location or results. Preview crawling remains allowed so crawlers can observe noindex.

Adversarial review identified a native HTML form fallback risk if core JavaScript failed. Intake now starts disabled and only enables after the core module initializes; native form method is POST and CSP disallows native submission. In a local browser with app.mjs deliberately missing, the address/consent/search/example controls stayed disabled and a clear reload message appeared. Optional measurement remained independent. All 69 tests passed before the final origin-port restriction; rerun follows. Hosted metadata and final acceptance remain pending.


## 2026-10-07 UTC - Discoverability staging gate and production candidate

Candidate 4ceff52d9d7fb25cf181d0f837fddb88515dbaab (local equivalent bc35fbd), staging deploy 6ac5f6c2c2e2d10009803870. Clean frozen install, all 69 tests, vendor reproduction with no diff and publication/history checks passed. GitHub Actions run 37588491178 passed. Deployed canonical origin, OG static image (PNG, 54,664 bytes), structured-data CSP hash, noindex headers and privacy page were checked over HTTPS. Live Burlington again returned 9.6 from 256 records. Desktop and 390-pixel synthetic screenshots were captured; document width remained 390.

PR #1 Deploy Preview 6ac5f7176b71e4000861e6bb rendered sparse unknowns and withheld total correctly. Netlify's optional preview drawer is blocked by the app's strict CSP; app behavior works and no security policy was weakened to enable the drawer. Source review of the exact schemas, consent, same-origin handlers, private storage, bounded bodies, no raw logging, CSP and retention found no new material issue. This is an independent invariant/source review by the implementing agent, not a claim of external human review.

PR #1 showed all checks passed (four successful, two neutral) and no conflicts, then merged with expected-head protection as 2948c429a0ff521280874c9d73cd705f231b4bbe. Production deployment and complete production acceptance remain pending. No launch posts were published.


## 2026-10-07 UTC - Actual production journey passed on candidate

Production https://sitebuddy-free.netlify.app is connected to canonical GitHub main. Candidate 2948c429a0ff521280874c9d73cd705f231b4bbe deployed as 6ac5f811f46cce13e426e0ed with SITEBUDDY_PUBLIC_RELEASE=1, no custom domain or purchase. The actual production response is indexable, canonical/OG URLs point to this origin, JSON-LD matches its CSP hash, static card serves image/png, sitemap and privacy/credits routes return 200, and no-referrer/security headers remain present.

First-time desktop journey with fixed QA channel: consent, 149 Church Street Burlington resolution/confirmation/live score 9.6 (256 normalized records), summary copy/manual link, address-free recipient showing 9.6 with blank intake, another-address reset, 28 Church Street resolution/confirmation/live score 9.7 (226 records). Malformed input was rejected without execution or stale score. A production 390-pixel browser rendered synthetic 7.5, opened the demand CTA, submitted feedback, rejected email without contact consent, then accepted explicit-consent interest with two categories; sparse data withheld the total. Actual document width was 390 with no overflow. This is browser viewport coverage, not physical mobile hardware coverage.

Authenticated production Blobs contained exactly the expected 22 QA events, including two page views, two live successes, repeat/share, input failure, sparse withholding, feedback, interest and two preference counts. No address, coordinates, email or response IDs were in analytics. Separate private records contained the exact synthetic feedback and example-domain contact/consent/preferences. Production HTTP probes returned duplicate 200, conflict 409, extra-field 400, public-read 405 and foreign-origin 403. No automatic email was sent.

Final version-label/documentation checkpoint and its final clean regression/redeployment checks remain pending. No material runtime finding remains from this candidate journey.


Final asset publication scan caught browser screenshots returned as JPEG bytes despite a .png filename. Converted the two synthetic screenshots to actual PNG without content changes; reran the gate before any public push. No failed scan was classified as passing.


## 2026-10-07 UTC - Final checkpoint acceptance

Local clean checkpoint cb93eda passed all 69 tests and publication/history checks with no working-tree changes. Public equivalent ed475ec86751e6339200bdbc72f231ad27be28e7 passed push/PR CI. Production-project Deploy Preview 6ac652ec81d3e10008e631f0 served v0.2.0 and retained noindex; dedicated staging rendered 7.5. PR #2 showed six successful and four neutral checks, no conflicts, then merged with expected-head protection as 1551dbcb256ab19b10d1be626f8ad771a8b02e02.

Actual production deploy 6ac65353c57314000835f649 published that commit. A fresh page rendered the final v0.2.0 label, synthetic 7.5, and optional measurement off. Only version labeling, documentation and screenshots changed since the full production journey; scoring/provider/share/measurement/forms modules remained identical. All material findings are resolved. Final documentation records Distribution Ready for a controlled test, with scope/coverage limits stated explicitly. Release v0.2.0 identifies the final documentation checkpoint. No external launch post, outreach, domain purchase, paid-service upgrade or Paid/Private implementation occurred.
