# Public data policy

## Consent and privacy

Before live lookup, require explicit consent. Photon receives the public address. Overture's catalog host and Amazon S3 public storage receive ordinary connection metadata; range requests reveal the approximate area of interest. Providers and the static host can keep their own access logs. Requests omit credentials and referrers. The app uses no cookies, geolocation, browser storage, automatic uploads or persisted address history. Optional aggregate measurement defaults off. Voluntary feedback and optional email use separate private Netlify storage; see ANALYTICS and FEEDBACK_AND_INTEREST. Shared summaries omit location; replay files include it.

Raw place names, websites, contacts, arbitrary tags and source confidence metadata are transient and discarded. Only normalized public IDs, points and broad category flags travel into scoring. The optional user-requested snapshot includes the public address, coordinates, release, attribution and license texts. Never use confidential inputs or commit downloaded datasets.

## Sources and use

- [Photon](https://github.com/komoot/photon): reasonable-use demo geocoder, without availability guarantees. Manual submissions only, five-second per-provider cooldown, bounded responses, no keystroke search or bulk production interface.
- [Overture public catalog and object storage](https://docs.overturemaps.org/getting-data/cloud-sources/): openly published files accessed through standard byte-range requests. Places and Base maximum-detail tiles are retrieved for a 600-meter area. No query-server compute or paid account is needed. This is limited public context, not mobility or commercial performance intelligence.
- [Overture licenses and attribution](https://docs.overturemaps.org/attribution/): Places contains data under CDLA-Permissive-2.0, Apache-2.0 and CC0; Base infrastructure is OSM-derived under ODbL. Full notices and relevant license texts are displayed in `dist/credits.html` and carried in live downloads. Filtering, category translation and point normalization are declared modifications. Data-provider names are required attribution, not customer examples.
- Synthetic fixtures are independently authored, conspicuously fictional, and CC0.

## Freshness and completeness

The app discovers the current release, validates its date and rejects dates more than 45 days old. This bound accommodates monthly publication without pretending to offer real-time place verification. The release date is never an individual-feature inspection date: some contributing observations are older. Closed places identified by source status are omitted; unidentified closures can remain. Missing categories, unsupported geometry or absent observations remain unknown. Failed or partial retrieval never returns a score.

The 45-day policy applies only to Overture release cadence. Legacy OSM normalization retains its seven-day database-age rule. Historical snapshot replay intentionally does not claim current freshness.

## Capacity and limits

Bounded transport, limited retry, cache and cooldown are implemented and tested. There is no service-level agreement for public providers. Growing or business-critical usage requires ongoing terms/capacity review; no infrastructure can guarantee every address or every request. The stable gate requires repeated successful live execution and explicit failure behavior, not fabricated complete coverage.

No confidential reference material, privately derived rubric, proprietary outcome or customer data is part of these sources or transformations.
