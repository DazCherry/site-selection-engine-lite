# ADR 0006 — Address integrity and owner operations

Date: 2026-10-07. Status: implementation candidate, NOT production accepted.

## Address resolution

Keep the existing licensed Photon/OSM path while investigating the incident. Match returned house number, normalized street, supplied city/state/ZIP before displaying candidates; preserve directions, do not approximate numbers, and show state/ZIP. Normalize common US suffixes and suite tokens without replacing absent upstream data. Request ten candidates in one explicit-submit request, not keystroke traffic or uncontrolled retries. Confirmation remains mandatory. This is a bounded integrity/UX improvement, not a coverage guarantee.

Google is preferred by the owner but not enabled. Google's [general terms, section 3.2.3(c)](https://cloud.google.com/maps-platform/terms) restrict creation of derived content and explicitly discuss coordinate-based spatial analysis. SiteBuddy's use of coordinates to select Overture records and calculate a score creates a material compatibility question. Permission to display results without a map does not resolve that restriction. Do not implement a direct Google-coordinate scoring path without written provider clarification under the applicable billing-region terms. This is a conservative integration decision, not a legal opinion. No Google credentials, billing or API have been enabled.

The [Geocoding-specific terms](https://cloud.google.com/maps-platform/terms/maps-service-terms) permit no-map use and specify caching exceptions; they are not blanket permission for every downstream analysis. [Places policies](https://developers.google.com/maps/documentation/places/web-service/policies) require Google Maps attribution and have a narrow exception for a user-selected street address in that user's transaction, not all returned content. Autocomplete alone plus independent geocoding would add cost/complexity without resolving independent coverage. Google Address Validation targets mailing validation and is not needed for this limited score. No scraping, silent cross-provider coordinate substitution or Google content in replay exports is implemented.

[Census](https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html) returns interpolated address-range coordinates. We will not silently replace an address point/building center with an estimated road-range location in a 600-meter score. [OpenCage](https://opencagedata.com/pricing) requires paid production use and does not itself establish coverage of the reported address. Neither is enabled. Self-hosting Photon would not repair missing source addresses and adds operational infrastructure.

## Disclosure

[Photon's published usage guidance](https://github.com/komoot/photon) allows reasonable project traffic, can throttle/ban extensive usage and provides no uptime guarantee. It does not state a mandatory checkbox. Whether a particular legal basis is sufficient depends on jurisdiction and operator circumstances; no universal legal conclusion is asserted. Retain explicit opt-in as a privacy-preserving product choice while shortening the wording and linking the detailed policy. Nothing is sent while typing. Browser-direct providers receive IP/network information. No proxy privacy claim is made.

## Notifications

Private Blobs remain authoritative. An after-persistence hook schedules optional mail work via Netlify waitUntil. Missing dependency, queue write or provider failure does not change a durable submission acknowledgement. A scheduled scanner recovers missed outbox creation from recent eligible records after the activation timestamp. Per-job CAS leases, immutable payload hashes, provider idempotency keys, conservative global attempt reservations and bounded retry provide duplicate resistance, not exactly-once delivery.

Choose a disabled Resend adapter for simplicity and explicit 24-hour idempotency semantics. Stop ambiguous retry after 23 hours; never reset it automatically. Keep accepted/terminal tombstones 91 days, beyond submission retention. Store references rather than extra lead-body copies. Render plain text with fixed subject and server-configured sender/one recipient. No public API can supply a destination, body or owner-read operation. No visitor email.

Netlify scheduled work checks every five minutes. New consented contacts attempt immediate notification after persistence; burst/quota/outage delays are possible. Previous UTC-day summaries are prepared on the first run at or after 00:05 UTC and backfilled up to seven days. Empty periods are suppressed unless a warning exists. Counts are submissions, never unique people; synthetic records are excluded. Dedicated QA store isolates inbox tests.

Owner-only local export uses an existing authorized Netlify token, strict columns, retention filtering, formula-safe CSV, exclusive mode-0600 writes outside the repository, and no public endpoint. No CRM, paid analysis, model change, customer context, or commercial qualification is introduced.
