# Data policy

Only public locations and independently created synthetic examples belong in this product. Do not enter confidential candidate addresses or upload private datasets. There is no upload feature, database or application telemetry.

Before a live lookup the interface requires explicit consent. Photon receives the query; Private.coffee receives selected coordinates and a bounded map query. Both providers receive ordinary connection metadata including IP address and may keep their own service logs under their policies. The app sends no cookies or authorization header and suppresses referrer information. The web host may separately keep request logs. No claim of anonymous or zero-retention provider use is made.

Data lives in page memory. A cache holds at most 20 normalized responses for five minutes; closing the page clears it. Downloading a snapshot is an explicit user action. Downloads are not committed as test data or sent to a server.

## Sources and usage review

Reviewed 2026-10-05 from public primary project/operator materials:

- [Photon project and demo policy](https://github.com/komoot/photon): permits reasonable project requests; extensive usage can be throttled or banned; no availability guarantee. Address submission only, no autocomplete or bulk search.
- [Private.coffee instance listing](https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances): lists permission to use the service in projects and requests advance contact for large-scale use. [Operator service directory](https://private.coffee/services.html) confirms the Overpass service. This small manual demo uses no bulk processing or automatic retry/failover.
- [OpenStreetMap copyright and license](https://www.openstreetmap.org/copyright): map data is ODbL. Display attribution and the license link; retain attribution/license in downloads. Derived map databases remain subject to applicable ODbL requirements. We do not publish a provider dataset in the repository.

The main overpass-api.de instance was not selected because its documentation discourages reliance as a general application backend. This is a small exploratory demo, not a promise of free infrastructure at commercial scale. Recheck provider terms and arrange capacity before expanding usage. No paid API purchase, commercial quote, or individualized legal approval is represented by this review.

Synthetic fixture data is independently generated and dedicated under [CC0](https://creativecommons.org/publicdomain/zero/1.0/). No real store or private reference case was anonymized to make these fixtures.
