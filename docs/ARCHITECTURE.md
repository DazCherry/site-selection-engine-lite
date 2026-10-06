# Architecture

A static browser application uses plain ECMAScript modules. Node's built-in test runner exercises exactly the same calculation modules as the browser. No bundler, third-party runtime package, database, account system, LLM, or hidden server-side model is present.

```text
User consent and address form
  -> Photon adapter -> address-level candidates -> user confirmation
  -> Overpass adapter -> bounded response -> validation and normalization
  -> pure mapped-context model -> visible result and optional local snapshot
Synthetic fixtures -> same normalization and model -> clearly marked result
Snapshot -> Node replay -> same deterministic public calculation
```

`dist/model.mjs` owns validated coordinates, Haversine distance, source date checks, category mapping, deduplication, and pure scoring. `dist/providers.mjs` owns transport, public endpoints, input limits, response limits, timeout, cooldown and short memory caching. `dist/app.mjs` renders plain text DOM nodes and coordinates user state. `dist/samples.mjs` is entirely synthetic. `scripts/serve.mjs` is a development-only static server; deploy only `dist/`.

Requests are serialized within the provider instance. The cache holds at most 20 normalized results for five minutes in page memory. No cross-tab/global quota service exists; provider capacity must be reviewed before a scaled deployment. Endpoints are fixed in source and CSP. Provider replacement requires editing the adapter and CSP, checking terms, and rerunning the adapter/browser gates.

Scoring does not depend on current time after normalization. A snapshot freezes public normalized inputs and the rubric version for replay; live provider refreshes can legitimately change results. No raw POI names or tags are exported. The origin and selected public address remain in a downloaded snapshot by user action.

The public modules may later be reused in a separate private system. This repository defines no private engine contracts, calculations, customer schemas or synchronization path.
