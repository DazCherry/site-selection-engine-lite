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
