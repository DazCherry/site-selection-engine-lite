# Test strategy

## Automated gate

Run `node --test tests/*.test.mjs` and `node scripts/publication-check.mjs`. Node 22+ is sufficient; no package installation or live provider is required. HTTP integration tests bind a temporary loopback port. A restricted environment must permit the bind; an EPERM error is an environment failure, not a passed test.

The suite covers independent calculation, input validation, normalization, unknown values, stale/future dates, deduplication, conflicting records, geographic boundaries, monotonicity/bounds, snapshot replay, provider errors/timeouts/size limits, caching/concurrency, publication leakage detection, static HTTP delivery and traversal/method rejection.

## Independent cross-validation

The mixed fixture uses four shop groups, three service groups and a stop 0.001 degrees east on the equator. Independently compute equatorial arc length `R × radians(0.001)`, then average 8, 6, and `10 × (1 − distance / 750)`; expected displayed result is 7.5. This avoids deriving the expected value from the production distance function. Metamorphic checks verify duplicate/reordering invariance and monotonic category additions. These prove implementation properties, not real-world predictive accuracy.

## Browser acceptance

1. Open the app from a local HTTP server. Inspect initial working surface, labels, focus and narrow layout.
2. Select mixed fixture: 7.5, synthetic label, three dimensions, explanations and provenance.
3. Select sparse fixture: no total, two explicit unknowns, no lingering previous score.
4. Try incomplete and malicious-looking input: no usable result and no HTML execution.
5. Submit a public civic address with consent, verify candidate address/coordinates, confirm, retrieve context and inspect total or explicit unavailability.
6. Check provider failure clears previous results and permits recovery to an example.
7. Download a synthetic snapshot and independently replay it. Check browser errors.
8. Repeat critical synthetic flow from a fresh checkout. The live check is separate because public infrastructure is nondeterministic.

Optional WebMCP exposes only synthetic example selection. Validate registration, valid and invalid input through a supported browser context when available. If none is exposed, record that validation unavailable; it does not block ordinary UI release.

## Clean environment and deployment

Create a fresh checkout with no installed packages, run both automated commands, and serve only its `dist` directory. Confirm the root, modules, stylesheet and favicon return correct MIME types. Run the synthetic UI flow against that checkout. A host must preserve the file paths, `.mjs` JavaScript MIME, CSP and provider connections. Inspect terminal deployment status before claiming a live demo.

Every material failure blocks its affected gate until fixed or honestly reported as an external limitation. Do not call synthetic-only success live-provider success. Record actual runs and limitations in the development log and final report.

## Stable live-data gate

Run the opt-in `node scripts/live-validation.mjs --live` against seven public civic addresses, serialized with provider-friendly spacing. `LIVE_SNAPSHOT_DIR` may point to an existing scratch directory for independent replay; never commit raw outputs. Validate each candidate's house number, street, city and coordinates. Record every failure, including dense-tile rejection, rather than dropping failed cases. Repeat with fresh provider instances after fixes. Exercise browser consent, confirmation, visible score, source date and download; repeat against the deployed product. Compute every saved score independently in a separate language using spherical-vector distance rather than the production Haversine implementation.

Additional tests cover release discovery, spherical tile coverage including dateline/high latitude, missing taxonomy, operating status, source redaction, exact byte ranges, ETags, response/decompression bounds, bounded retries, 429 pauses and cancellation. Browser bundle reproduction uses the frozen dependency lock and CI checks exact output. A green suite does not replace repeated real-data acceptance.
