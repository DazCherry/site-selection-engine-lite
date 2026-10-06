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
