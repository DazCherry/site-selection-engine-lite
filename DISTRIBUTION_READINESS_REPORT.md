# SiteBuddy distribution readiness report

**DISTRIBUTION READY — v0.2.0, for a controlled external product-learning test.** Updated 2026-10-07 UTC. No external launch posts or outreach have been published.

## Executive summary

SiteBuddy Free makes the existing public mapped-context experiment easier to understand, share and measure. The v0.1.0 three-dimension scoring module remains byte-for-byte unchanged. The original 45 regressions and 24 added tests pass. Actual Netlify production returned two live scores, opened an address-free shared summary, supported repeat analysis, handled invalid/unknown inputs, and received optional feedback, contact consent, preferences and the exact expected analytics events in private storage. There is no known open material regression, privacy defect or publication-safety finding from the executed review.

This is readiness for a small learning experiment, not proof of commercial validity, universal provider availability or representative customer demand. The owner decides future investments.

## Product positioning and URLs

SiteBuddy provides a free, transparent first look at retail variety, everyday amenities and transit proximity around a public U.S. location. It describes mapped context, not business success.

- Production: https://sitebuddy-free.netlify.app/
- Canonical GitHub: https://github.com/DazCherry/site-selection-engine-lite
- Release identifier: v0.2.0. The release tag identifies the final documentation checkpoint.
- Final runtime checkpoint: 1551dbcb256ab19b10d1be626f8ad771a8b02e02, production deploy 6ac65353c57314000835f649.
- Full production journey runtime: 2948c429a0ff521280874c9d73cd705f231b4bbe, deploy 6ac5f811f46cce13e426e0ed. Only version labeling, documentation and screenshots changed afterward; scoring/provider/share/measurement/form modules are identical.
- Dedicated staging: https://sitebuddy-staging.netlify.app/; branch sitebuddy-staging.
- Final production-project Deploy Preview: https://deploy-preview-2--sitebuddy-free.netlify.app/, deploy 6ac652ec81d3e10008e631f0.
- Frozen baseline: v0.1.0 at 72654445edbc2dde7f949aa0fecdb816f967ef85.

PR #1 promoted the feature candidate after its staged gates. PR #2 promoted the final version/assets checkpoint after six successful and four neutral checks. Both merges used expected-head protection. The earlier Sites prototype was not changed in this phase.

## Architecture and deployment

The core remains a static browser ES-module application. The user consents to geocoding, confirms an address, retrieves bounded Overture map tiles, normalizes only approved public fields and runs the frozen equal-weight rubric locally. Unknown required inputs withhold the total. No new intelligence dimension was added.

Distribution adds independent optional browser modules, same-origin Netlify Functions and private Netlify Blobs stores. The core does not depend on analytics or submission availability. GitHub main is the production source; the staging branch has a separate Netlify project and PR Deploy Previews. Frozen pnpm installation, Node 22, the complete tests and publication scan run during builds. CI additionally reproduces the pinned browser dependency bundle with no diff.

Production uses SITEBUDDY_PUBLIC_RELEASE=1 and Netlify's actual URL for canonical metadata. Deploy Preview and branch contexts force zero and receive noindex. No custom domain, account upgrade, purchase or automatic recharge was enabled. A future material defect requires a fix through staging, complete affected gates, redeployment and another production smoke. Netlify retains previous deploys for owner rollback; no destructive rollback drill was performed.

## Branding, sharing and discoverability

The header, title, copy and public identity are SiteBuddy Free. The three dimensions and limitations remain visible. Professional categories are clearly future ideas with no availability, price or launch promise.

Explicit sharing encodes only version, model, date, public/synthetic kind, three scores and total in a URL fragment. It excludes the address, coordinates, observations, tracking query and contacts. Recipient summaries are labeled sender-provided, editable and unverified; the recipient's address field starts blank. Copy is bounded and manual text/link remains available. Native operating-system share is deliberately not implemented. Browser copy success and visible-link recipient behavior were verified; no separate claim about every OS clipboard or share target is made.

Production canonical, OG/Twitter large-image metadata, free WebApplication JSON-LD, sitemap, robots behavior, privacy/credits routes and the static 1200×630 image were checked over HTTPS. The structured-data hash matches CSP. Production is indexable; previews remain noindex while allowing crawlers to read that directive. No address-specific result page or dynamic result image exists. Metadata and image are crawler-readable; no external platform post, cache refresh or platform-rendered card was claimed or performed.

README now documents SiteBuddy's actual capability, limitations, clean setup, public source and licensing. The source remains publicly inspectable without a newly granted general reuse license. Third-party licenses remain intact.

## Analytics, schema and interpretation

Optional measurement starts off on every page. Consent enables subsequent actions and one page_view. Turning it off aborts pending requests; turning it back on does not repeat that view. There is no cookie, durable queue, address history or cross-page visitor identifier.

Exact event fields: v=1, random per-event UUID, event, kind, channel, category and failure. Extra fields are rejected. Events are page_view, analysis_started, address_submitted, address_confirmed, analysis_succeeded, analysis_withheld, analysis_failed, repeat_analysis, share_clicked, share_copied, share_manual, deeper_analysis_clicked, feedback_submitted, early_access_submitted and capability_interest. Fixed labels exclude addresses, coordinates, email, raw URLs/referrers, query strings, scores and form response IDs. See docs/ANALYTICS.md and dist/analytics-schema.mjs for the exact allowlists.

Private daily aggregates use conditional writes and UUID deduplication, five bounded write attempts, 10,000 events/day and platform rate limits. Production and preview stores are separate; staging and production projects are also separate. Scheduled cleanup targets aggregate days at least 30 days old. The application does not log request bodies or persist IP addresses, though Netlify necessarily processes network information.

Actual production storage showed exactly 22 expected QA events: two opted-in page views; two address submissions/confirmations/live successes; a third start and input failure; one repeat; share click/copy; one deeper CTA; feedback; Early Access interest; two preference categories; and a synthetic start/withholding. No address, coordinate or email was present. Counts are actions from consenting sessions, not unique people or total traffic. Exclude synthetic and channel=qa from real-address learning. Invalid/abusive submissions cannot be eliminated by these controls and must not be treated as validated demand.

## Feedback, Early Access and privacy

Fixed-choice feedback asks usefulness, intuitive sense, decision context and missing capability. Interest accepts one to three future categories, a broad role and optional email with separate contact consent. No automatic email or outreach occurs. Same-origin JSON handlers enforce exact schemas, body bounds, honeypot, consent and idempotence; no public read endpoint exists. Client timeouts retain values for retry and preserve request identity.

Actual private production records matched synthetic feedback and an explicitly consented example-domain contact with demographics/competition preferences. Email without contact consent was rejected in the deployed UI. Contact storage is separate from analytics; no searched address is attached. Scheduled cleanup targets submissions at least 90 days old. Outages can delay cleanup, so the privacy statement says scheduled deletion rather than guaranteeing an exact deletion instant.

Public privacy documentation matches actual implementation. Map providers receive the consented address/area and network metadata. Replay downloads include location and normalized records; shared summaries do not. The app does not persist address history in browser storage or its backend. Owner access to real contacts stays in Netlify; never publish signed download URLs or real record screenshots. The public privacy page explains the currently available private-contact request route without inviting sensitive data into public issues.

## Tests and validation evidence

| Environment / check | Executed result |
| --- | --- |
| Frozen baseline | Exact scoring-module integrity plus all original 45 regressions pass |
| Added tests | Five share, one frozen integrity, eight measurement, six submission and four discoverability tests; 69 total pass |
| Clean environment | Frozen install, pinned vendor reproduction without diff and all 69 tests passed; final clean version/assets checkout also passed 69 and publication/history checks |
| CI | Feature push and PR quality gates passed; PR #2 showed six successful and four neutral checks, no conflicts |
| Staging | Live Burlington 9.6, share recipient, repeat reset, sparse withholding, destination receipts, malformed HTTP, desktop and 390px checks passed |
| Deploy Preview | PR #1 sparse rendering; PR #2 final label, canonical and noindex; successful Netlify builds |
| Production desktop | 149 Church Street Burlington → confirmed → live 9.6 / 256 records → copy/manual link → fresh address-free recipient; repeat with 28 Church Street → confirmed → live 9.7 / 226 records |
| Production mobile width | Chrome 390px, document width 390, synthetic score, demand forms, consent rejection, successful submissions and sparse withholding; no overflow observed |
| Production private destinations | Exact 22-event QA count and two exact synthetic submission records viewed in authenticated Blobs UI |
| Production HTTP integration | Duplicate 200, conflicting payload 409, extra field 400, public read 405, foreign origin 403 |
| Production final smoke | Final deploy 1551dbc renders v0.2.0, synthetic 7.5 and measurement off after fresh load |
| Security/privacy/publication | Strict schema/origin/body/CSP/rendering review, hostile-input tests, secret/private-path/history scans and manual synthetic-image review passed |

Test coverage includes normalization, scoring, explicit unknowns, replay, provider rate limits/timeouts/network errors/invalid streams/stale releases, bounded retrieval and cancellation, concurrency/deduplication, consent, retention boundaries, clipboard failure/manual recovery, submission timeouts and metadata. Local browser fixtures exercised a missing collector, missing analytics module and missing core module. Optional failures preserved scoring/sharing; missing core kept intake disabled with a clear message.

Coverage limits: Chrome desktop and a 390px browser viewport were tested, not physical mobile hardware or every browser/extension. Provider failure behavior was tested through automated transport/pipeline tests; an actual third-party production outage was not deliberately induced. Actual production malformed-input and sparse-data failure paths were exercised. Scheduled retention boundary logic passes; no real elapsed 30/90-day retention cycle is claimed. Detailed chronological evidence and failed attempts remain in docs/DEVELOPMENT_LOG.md.

## Adversarial review, bugs and limitations

A separate source/invariant review checked persistence schemas, URL/referrer leakage, rendering sinks, consent defaults, stale asynchronous actions, duplicate identities, optional-module isolation, malformed inputs, model integrity, Free/Paid/Private language and clean deployment. This is not a claim of external human review or penetration testing.

Resolved findings: pnpm staging install-script failure; stale asynchronous share completion after another result; narrow email field; unsafe native-form fallback if core JavaScript failed; screenshots returned as JPEG despite PNG filenames. Each affected gate was rerun. The screenshot mismatch was fixed before public push. No material finding remains open.

Known limitations remain explicit: incomplete map coverage; monthly release freshness and unknown individual feature age; illustrative uncalibrated rubric; straight-line rather than walking distance; external provider outages; consent-biased counts; service quotas and abuse; no automatic notification emails; manual owner review of private feedback. Netlify's optional preview drawer is blocked by strict CSP; the app itself works, and security was not weakened for that drawer.

## Launch package, research and measurement plan

Complete drafts and synthetic screenshots are in docs/launch/LAUNCH_KIT.md. It contains one-line/short/medium/long descriptions, Free capability/limitations, FAQ, technical summary, GitHub launch copy, Product Hunt, Show HN, relevant community and social drafts, founder/operator outreach, feedback request and first-test checklist. The static card is dist/social-card.png. Screenshots show the validated candidate before the final version-label update.

Sourced research and rationale are in docs/research/DISTRIBUTION_STRATEGY.md. Start with a small feedback group, investigate failures, then relevant technical/professional communities, then broader launch if usefulness and reliability justify it. Respect each community's rules; no vote requests or automatic posts. Use fixed acquisition labels only. Read starts/successes/withholding/failures, repeat/share, deeper interest, preferences and submissions together with voluntary feedback. Do not optimize for stars, votes or email count alone.

Deferred hypotheses: demographics, competition, footfall, trade area, financial feasibility and sector-specific intelligence/reports. No Paid dimension, subscription, one-time paid report, billing, customer-specific model or Private Engine was implemented. The owner decides whether evidence favors better Free distribution, a particular Paid direction, more discovery or eventual private opportunities.

## Definition of Done traceability

| Conditions | Status and evidence |
| --- | --- |
| 1 identity | PASS: SiteBuddy title/header/copy/URL |
| 2–4 frozen model and tests | PASS: exact model, original 45 and all 69 tests |
| 5–7 boundary and private IP | PASS: classified features, synthetic fixtures, source/publication review |
| 8–12 canonical source, Netlify, no purchase, reproducibility | PASS: canonical main, reviewed PRs, CI/staging, pinned build, *.netlify.app |
| 13–14 share and privacy | PASS: actual sender/recipient, no address/coordinates |
| 15–17 analytics, privacy and funnel | PASS: actual receiving destination, exact 22 events, strict schema |
| 18–21 feedback/interest/preferences/future distinction | PASS: actual records, consent rejection, categories, truthful copy |
| 22–23 SEO/social | PASS within supported scope: actual metadata/assets/indexability; no platform-post claim |
| 24–27 README/assets/research/sequence | PASS: repository showcase, complete launch kit, sourced strategy |
| 28–30 privacy/security/publication | PASS: implemented policy, reviews, tests, scans |
| 31–32 clean/staging | PASS: clean gates and actual staging/PR previews |
| 33–36 production/journey/mobile/desktop | PASS: actual deployed journeys at stated coverage |
| 37 third-party failure behavior | PASS at stated test levels: transport/pipeline and optional-service failure isolation |
| 38–39 no material open defect | PASS: documented findings fixed and retested |
| 40–42 durable docs/report/identifiable checkpoint | PASS: current state/log/report and release v0.2.0 |
| 43 owner can start controlled test | PASS: public URL, functioning private destinations, launch copy and owner checklist; no extra engineering setup |

## Owner actions and operations

No owner-only blocker or additional engineering setup remains. The owner may choose when and where to distribute; drafts are not published automatically. In the authenticated production Netlify project, open Data & storage → Blobs to review daily counts and feedback/interest. Exclude QA/synthetic records, protect contacts, and monitor hosting/provider errors and scheduled cleanup failures. Keep future commercial investment decisions separate from this readiness conclusion.
