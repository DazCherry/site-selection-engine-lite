# Public Lite delivery report

## Executive summary

Site Selection Engine Lite is implemented as an independent, brand-agnostic static application with a transparent mapped-context rubric, synthetic demonstrations, public provider adapters, explicit unknowns, reproducible snapshots and publication safeguards. It is delivered as **0.1.0-rc.1**, not a stable release.

**The full Definition of Done is not yet satisfied:** public address resolution succeeds, but live map-context requests timed out during acceptance testing. Synthetic end-to-end journeys and automated integration pass; those are not substitutes for a successful live-data acceptance check. The interface and README disclose this limitation.

## Deliverables

- Public repository: https://github.com/DazCherry/site-selection-engine-lite
- Reviewed implementation checkpoint: `cad92bed15097f0a061657835c68a392ab2a03ac` (32-test checkpoint).
- Release-candidate target: `v0.1.0-rc.1`; the tag is the immutable reference for final candidate source after publication. Stable release remains withheld.
- Deployable browser application: `dist/`, without build or package installation.
- Hosted demo: https://site-selection-engine-lite.cherrry577.chatgpt.site
- Sites deployment succeeded for the validated runtime source. The owner explicitly approved public sharing of this specific hosted demo; access is now public.

## Architecture and public methodology

Plain browser ECMAScript modules; Node built-in tests and development server; no runtime dependencies, database, LLM, account or API key. Photon resolves address-level candidates; a confirmed coordinate drives a bounded Private.coffee Overpass query. The model keeps only recognized categories, geographic points and OSM identities. Public-data metadata and normalized inputs can be downloaded locally.

Three equally weighted dimensions use an independently authored illustrative rubric: retail group variety (two points per group, capped at ten), five everyday service categories (two points each), and nearest mapped transit proximity (10 × (1 − distance / 750), within a 600 m window). The mean is rounded once. Any missing dimension withholds the total. Full approved disclosure appears in `docs/MODEL_CARD.md`.

## Data sources and licensing

OSM-derived map data via Photon and Private.coffee, with visible OSM/ODbL attribution and license links in snapshots. Small manually triggered requests only. Synthetic fixtures are independently generated, explicitly labeled, and CC0. The repository contains no real customer cases or downloaded public map dataset. Provider reasonable-use conditions and scaling limitations are documented in `docs/DATA_POLICY.md` and benchmark research.

## Verification evidence

- 32 automated tests passed in the development tree and in a fresh clone with no installed packages.
- GitHub Actions [run 37426140032](https://github.com/DazCherry/site-selection-engine-lite/actions/runs/37426140032) completed successfully for the 32-test implementation checkpoint.
- Final review added a cache-freshness boundary regression. All **33 tests pass**, including in the fresh release-candidate checkout; its browser reproduces the synthetic result and shows the preview limitation.
- Browser: fictional mixed-use example 7.5; sparse example withholds total; address confirmation; malicious-looking input rejected without HTML execution; old result cleared; recovery to synthetic example; downloadable snapshot; desktop and 390 px responsive inspection without horizontal overflow.
- Downloaded synthetic browser snapshot independently recalculated in Python: 7.5. Node snapshot replay matches.
- Source normalization and model tests cover malformed/incomplete data, duplicate identities and conflicting duplicates, input order, coordinate bounds, dateline/poles/antipodes, radius edge, stale/future/invalid dates, unknown tags and unretained names.
- Transport tests cover provider errors, HTTP 429, timeout, invalid JSON, response size, caching, concurrency and immediate cross-provider confirmation. HTTP tests cover static asset MIME and availability, traversal and unsupported methods.
- Publication checks inspect approved file types, secret patterns, private paths, hashed restricted terms and all local Git history. Manual public/private review found no proprietary calculations or customer data in the release source.

## Bugs found and fixed

1. Shared cooldown blocked immediate confirmed-location context retrieval. Fixed with provider-specific cooldown plus regression.
2. HTTP 429 advice did not itself enforce the full wait. Added enforced cooldown, honoring numeric Retry-After with a minimum minute.
3. JavaScript date parsing can normalize invalid calendar dates. Added strict round-trip date validation.
4. An in-memory cached response could cross the seven-day source-age limit. Added freshness validation on cache hits plus regression.

Test execution initially hit an incorrect working-directory invocation and a restricted loopback bind; both were corrected and rerun. These were environment/invocation failures and were not represented as passed tests.

## Adversarial release review

Product, formulas, schema boundaries, publication safety, output handling, privacy, deployment assets and maintenance were reviewed. No private methodology was imported; map names and brands are stripped from normalized features; address text is rendered safely; ambiguous candidates require confirmation; no absent signal is fabricated. The source has zero external package dependencies and no authentication secrets.

**Open material gate:** successful real-address → live map data → normalized assessment → browser result, followed by the same clean-checkout acceptance. Both browser and small direct context queries timed out. Status diagnostics connected and completed TLS but received no response bytes. A separate publicly documented alternative also timed out and was not added as hidden failover. The Node geocoder returned 429 in one check; browser address resolution succeeded.

Optional WebMCP execution validation was unavailable because the tested browser does not expose `document.modelContext`. Ordinary UI works independently; no WebMCP success is claimed.

## Known limitations and deferred capabilities

Public infrastructure has no SLA. Map coverage and individual feature recency are unknown. Address points/building centers are approximate. No footfall, demand, demographic, competition, route, visibility, financial or predictive data is measured. No bulk use or cross-market calibration. Synthetic tests validate computation, not commercial outcomes. Scanners cannot detect all semantic IP leakage or every future customer identifier.

Private features remain outside this repository. No paid data, personal mobility data, calibration, learning, private financial logic or brand recommendations are implemented.

## Deployment and next steps

Run `node scripts/serve.mjs` for local inspection. Deploy only the contents of `dist/` to an HTTPS static host, preserving JavaScript MIME and CSP/security headers. No build, install, database, API secret or backend process is needed. Run `node --test tests/*.test.mjs` and `node scripts/publication-check.mjs` before publication.

To promote the candidate: restore or provide a reliable, CORS-enabled, appropriately permitted Overpass-compatible endpoint; update the adapter, disclosure and CSP if the provider changes; pass live browser acceptance and clean-checkout regression; then create a stable tag. A commercial service must arrange provider capacity before scaling.

Next step toward a Private Engine: start a separate private repository and independently validate its business requirements and data permissions. Reuse only approved generic public utilities. No confidential methodology should be contributed back here.
