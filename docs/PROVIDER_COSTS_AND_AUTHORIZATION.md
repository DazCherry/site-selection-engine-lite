# Provider costs and authorization

Reviewed official sources 2026-10-07. The owner subsequently authorized Resend Free and dedicated sender-subdomain preparation, signed in personally, and the authenticated dashboard shows Transactional 3,000 emails at $0/month with no payment methods. The sending domain is created but DNS verification is pending; TLS is Enforced. No API key, actual sending, DNS change, billing upgrade or paid commitment has been activated. Google remains unapproved.

## Google: not recommended for activation until license compatibility is established

[Official price list](https://developers.google.com/maps/billing-and-pricing/pricing): Autocomplete Requests includes 10,000 monthly requests then $2.83/1,000 at the first paid tier; Geocoding and Place Details Essentials each include 10,000 then $5/1,000. Address Validation Pro includes 5,000 then $17/1,000. Do not assume a higher-tier field is covered by Essentials.

[Session billing](https://developers.google.com/maps/documentation/places/web-service/session-pricing): an Essentials Details completion charges up to twelve autocomplete requests and the final Details call; later requests in that session are not charged. Abandoned sessions and IDs-only completion revert to per-request autocomplete charges. Address Validation session termination has different, higher-tier billing. Geocoding is not a qualifying session terminator.

Planning scenario: 1,000 searches/month, five suggestions per search and one Essentials Details result implies 5,000 autocomplete and 1,000 Details calls, within the listed individual free allowances if unused elsewhere. At 12,000 searches with the same pattern, simple first-tier arithmetic is $141.50 autocomplete plus $10 Details = $151.50/month before taxes/other usage. This is an illustrative volume scenario, NOT maximum exposure.

If later approved, propose a dedicated project, minimum API-specific key scope, server protection appropriate to hosting, per-IP request limits, six suggestions per search, and durable global monthly ceilings of 8,000 autocomplete / 2,000 Details attempts. Cancel stale UI work but count every issued request. Fail closed on quota-store failure. Add provider-side minute/day quotas where supported, project alerts and a kill switch. These are a design proposal, not configured controls. [Quota guidance](https://developers.google.com/maps/documentation/geocoding/usage-and-billing) and [key security guidance](https://developers.google.com/maps/api-security-best-practices) must be applied to the actual approved project.

A budget alert is not a spending cap. Charges can continue beyond allowances. Shared account usage, other enabled SKUs, key compromise and quota configuration mean no zero-spend guarantee is established. Current exposure from this integration is zero because it is not enabled; no contractual future zero-spend guarantee is asserted. Recheck region-specific terms before any approval request.

## Resend: Free approved; domain verification and credentials pending

[Resend pricing](https://resend.com/pricing): Free currently provides 3,000 transactional emails/month and 100/day at $0. Pro starts at $20/month for 50,000 and permits paid extra volume when enabled. Proposed configuration: Free only, no paid plan, no payment method, no transactional overages, no automatic upgrade, no click/open tracking. The actual Billing page confirms the monthly Free subscription; the Usage page rendered zero-valued counters, so its daily remaining counter is not treated as verified. Paid transactional overage controls are disabled and unchecked. No extra usage is authorized.

Expected pilot volume: ten consented contacts/day plus one daily digest, about 341 messages in a 31-day month. Code reserves at most 90 attempts/day and 2,500/month (failed/ambiguous attempts count), with no reservation refunds. A stable global CAS document also spaces attempts by at least 1.1 seconds. Proposed real QA sends use a separate store and one stable test identity; limit owner test to one message before any additional authorization. Provider Free account limit is the outer guard across stores and other apps. If this account is upgraded or shared, these assumptions must be re-reviewed. The app cannot promise a contractual zero-spend ceiling for Netlify usage or changed third-party plans.

At the proposed account plan, email subscription cost is $0 and sends must stop at its limit; technical delivery can stop before then. No paid overage/upgrade is authorized. Existing Netlify compute/storage/credit limits also apply; the worker remains disabled until approval. Five-minute scheduling is 288 invocations/day when active; scans are bounded at 10,000 records per prefix and must be revisited before high-volume distribution. Failure logs/backlog diagnostics and account usage alerts must be monitored. Application caps limit mail attempts, not all hosting costs.

[Verified sending domains](https://resend.com/docs/dashboard/domains/introduction) require ownership verification. The recipient's domain is not automatically an authorized sender. Use a dedicated owner-approved sending subdomain, sending-only key restricted to that domain, and secrets scoped to Netlify Functions production. Do not expose key values in build logs, source, chat or browser bundles. DNS additions, terms acceptance, credential access and service activation need owner approval.

[Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys) lasts 24 hours. The implementation uses a 23-hour retry safety window, immutable payload hash and six-attempt maximum. Ambiguous expiration is terminal/manual review, never silent resending.

## Alternatives evaluated

[Postmark](https://postmarkapp.com/pricing): free developer tier 100/month; Basic starts $15/month with listed paid overages. Too small for the illustrative pilot on Free. [Amazon SES](https://aws.amazon.com/ses/pricing/): outbound baseline $0.10/1,000 plus applicable data/add-ons; IAM, sender verification and account/sandbox operations add setup. Resend Free is now the owner-approved option; the alternatives were not activated.

## Exact-incident query and alternative-data investigation

The official [Photon API reference](https://raw.githubusercontent.com/komoot/photon/master/docs/api-v1.md) documents structured lookup. Authorized testing of both structured and free-text paths did not recover the private incident address; a second query is not added to every production search without an evidenced benefit.

The [USDOT National Address Database](https://www.transportation.gov/gis/national-address-database) offers address-point data, but its [disclaimer](https://www.transportation.gov/mission/open/gis/national-address-database/national-address-database-nad-disclaimer) includes incomplete coverage, accuracy limitations and an indemnification clause. It is not silently adopted as a zero-obligation fallback. No private input was sent to this or any new provider. The exact incident remains unresolved by the authorized Photon path; Google billing and downstream-use compatibility remain separate open gates.
