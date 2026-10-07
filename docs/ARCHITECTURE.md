# Architecture

A static browser application uses ECMAScript modules and a small pinned PMTiles/vector-tile decoder bundle. Node's built-in tests exercise the same calculation and adapter modules. The Free scoring flow needs no account, LLM, browser secret, paid API or private scoring backend. Optional distribution features use Netlify Functions and private Blobs stores, separate from scoring.

```text
Consent -> Photon address candidates -> explicit location confirmation
 -> latest Overture release catalog -> fixed Places/Base archive URLs
 -> exact byte ranges, ETag and response bounds -> complete covering tile set
 -> strict point/category normalization -> pure three-dimension rubric
 -> visible score or explicit unknown -> optional licensed local snapshot
```

`dist/model.mjs` owns coordinates, distance and pure scoring. Its original OSM normalizer remains for synthetic fixtures and historical compatibility. `dist/overture.mjs` owns current release discovery, bounded tile transport, taxonomy normalization and provider validation. `dist/providers.mjs` owns geocoding, single-flight orchestration, provider cooldown and cache. `dist/app.mjs` renders text safely. `dist/samples.mjs` contains fictional records only. `dist/data-licenses.mjs` carries public data notices with exports; `dist/credits.html` displays data and software licenses.

Read all maximum-detail tiles covering the spherical 600-meter bounding box, then filter points by great-circle distance. Place tiles use zoom 14; infrastructure tiles use zoom 13, matching the upstream full-tag profiles. Incomplete requests reject the entire context. An absent tile in a valid archive is empty, not a network success substitute. Point-only normalization avoids fabricating destination coordinates from clipped line/polygon geometries. Named stations in Places and point stops in Base can contribute to the same existing transit dimension.

A single assessment owns bounded wire/decompression/feature budgets, immutable archive ETag checks, a 45-second deadline and at most two transient retries. A 429 pauses further context requests. No provider rotation or hidden fallback dataset exists. Normalized results alone remain in page memory (20 entries, five minutes); cache hits revalidate the 45-day release-age limit. Public releases are monthly; this is not an assertion of feature recency. The catalog is rediscovered for uncached assessments, so expiring old release files are not pinned into the app.

The same normalized records reproduce the score independently of retrieval time. The rubric formula version remains unchanged; the category adapter is separately versioned `overture-lite-1`. Scores across provider versions are not market benchmarks. A source update can legitimately change observations.

Run committed assets without installation. Rebuild the decoder with pinned pnpm dependencies and `scripts/build-vendor.mjs`; CI verifies byte-for-byte output. Netlify copies `dist/` into generated `build/`, adds environment-specific metadata and indexability, and separately bundles `netlify/functions`. Only generated public assets are served, never the repository root. Local `scripts/serve.mjs` is a loopback development server. No raw place dataset is checked in.

Generic public components can later be reused in a separate private system. Private features, coefficients, contracts, customer schemas and synchronization remain excluded.


Distribution modules: bootstrap keeps intake disabled until core initialization completes; share contains strictly allowlisted fragment summaries; analytics is an independent opt-in module; interest handles optional fixed-choice forms. Server schemas validate all inputs. Private aggregate and submission stores have separate retention and no public read API. No browser secret or address history is introduced. See ADRs 0003-0005.
