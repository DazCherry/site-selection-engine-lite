# Site Selection Engine Lite

**Release candidate 0.1.0-rc.1.** Synthetic scoring and regression gates pass. Live map retrieval is not yet validated end-to-end because the public context provider timed out during acceptance testing. This is not a completed production release.

A deliberately limited, brand-agnostic **Universal Site Score** describing the mapped context around a public address. Enter an address, confirm a geocoded match, and inspect retail variety, everyday amenities, and transit proximity within 600 meters. Missing observations stay unknown; the overall score is withheld unless all three dimensions are available.

This independently designed public rubric is illustrative and uncalibrated. It is not a revenue forecast, lease recommendation, brand-fit model, or substitute for diligence. It favors mapped, mixed-use, transit-served settings. More complete mapping can raise scores without any change in the real place.

[Public demo](https://site-selection-engine-lite.cherrry577.chatgpt.site) · [Release candidate](https://github.com/DazCherry/site-selection-engine-lite/releases/tag/v0.1.0-rc.1) · [Delivery report](FINAL_DELIVERY_REPORT.md)

## Run locally

Requires Node.js 22 or newer and a modern browser. There are **no runtime or development package dependencies** and no API keys.

```sh
git clone https://github.com/DazCherry/site-selection-engine-lite.git
cd site-selection-engine-lite
node --test tests/*.test.mjs
node scripts/publication-check.mjs
node scripts/serve.mjs
```

Open `http://127.0.0.1:4173`. Alternatively use `npm test`, `npm run check:publication`, and `npm start`. The local server binds only to loopback. Choose another local port with the `PORT` environment variable if needed. Tests open one temporary loopback port and require permission to do so.

## Try it

- **Mixed-use neighborhood:** entirely fictional records, reproducible score **7.5 / 10**.
- **Sparse mapped context:** one observed dimension, two unavailable, overall score withheld.
- **Public address:** enter street number, street, city, and country separated by commas. Explicitly consent to the two public providers, then confirm the returned address and coordinates. No address is sent before submission and consent. No city-centroid fallback.

Live requests depend on Photon and the Private.coffee Overpass service. Both may be unavailable, change, throttle, or return incomplete data. No successful live request is guaranteed. A provider failure never substitutes synthetic results. Examples continue working without providers once the app assets are loaded.

## Reproduce a result

Download the assessment snapshot from the interface, then run:

```sh
node scripts/replay.mjs /path/to/site-assessment.json
```

The snapshot contains normalized map observations, coordinates, source/retrieval timestamps, source license, model version, and result. Replay is historical: it does not claim the inputs are still current. It fails for unsupported versions, invalid records, or a stored result that differs from the recomputation. Do not commit downloaded snapshots or confidential inputs.

## Deploy

This is a buildless static application. Serve the **contents of `dist/`**, preserving `.mjs` as JavaScript and the existing content-security policy. Never serve the repository root. Any static HTTPS host can deploy it; Cloudflare-compatible hosts can consume `dist/_headers`. Other hosts should configure equivalent headers. No server code, database, secrets, or paid service is required. The deployment test procedure is in [TEST_STRATEGY](docs/TEST_STRATEGY.md).

For a smoke test of the exact hosted assets, run `node scripts/serve.mjs` and use both synthetic examples plus a public civic address. For a growing or business-critical service, obtain dedicated provider capacity and review current terms before promotion. The demo is not a production location-intelligence service.

## Engineering record

[Product](docs/PRODUCT_SPEC.md) · [Architecture](docs/ARCHITECTURE.md) · [Model card](docs/MODEL_CARD.md) · [Data dictionary](docs/DATA_DICTIONARY.md) · [Data policy](docs/DATA_POLICY.md) · [IP boundary](docs/PUBLIC_PRIVATE_BOUNDARY.md) · [Security](docs/SECURITY.md) · [Tests](docs/TEST_STRATEGY.md) · [Development log](docs/DEVELOPMENT_LOG.md) · [Benchmark research](docs/research/LOCATION_INTELLIGENCE_BENCHMARK.md)

Code is published for inspection; no general software reuse license has been granted. Synthetic fixture data in `dist/samples.mjs` is dedicated to the public domain under CC0. OpenStreetMap-derived data remains subject to ODbL and attribution; it is not relicensed as code. This repository contains no downloaded OSM dataset, confidential reference document, or private engine implementation.
