# ADR 0004 — Minimal opt-in measurement in the existing host

Status: selected for staging implementation; destination acceptance required. Public-approved distribution capability, no scoring or Paid intelligence changes.

## Decision

Use an optional first-party Netlify Function and a private Netlify Blobs store for allowlisted aggregate funnel counts. The existing hosting account provides authenticated server storage without a new account or browser secret. A separate analytics module cannot block core application initialization. Consent defaults off on every page load; no cookies, local storage, searched addresses, coordinates, referrer URLs, email or cross-page visitor IDs enter analytics. Fixed acquisition-channel labels are derived in memory; unknown values become other. The owner views/downloads daily count JSON in the authenticated Netlify Blobs interface. No public reporting endpoint exists.

Each accepted event increments daily totals and channel/event/category counts using conditional writes. A random event ID prevents duplicate retry counting; no shared session ID is stored. Daily storage is capped, writes use bounded retries, payload size/schema/origin are checked, and platform request rate limiting is enabled. Raw request bodies and addresses are never logged by application code. Netlify still necessarily processes network metadata including IP for hosting and abuse protection. Counts describe opted-in page visits/actions, not unique people or the entire audience.

Keep at most 30 days of daily aggregates and random deduplication IDs through a scheduled cleanup function. Store names and separate staging/production projects isolate QA. The browser uses bounded requests, no offline persistence and no retries with new IDs. Opting out aborts pending requests; already accepted counts cannot be tied back to a person for individual removal. Service failure leaves scoring and sharing usable.

## Alternatives and tradeoffs

A hosted analytics vendor would provide richer dashboards but adds an account, configuration/financial dependency and another recipient. Plausible requires configured custom goals; installing its script alone is insufficient evidence. Using form submissions as telemetry would mix product counts with spam processing and contact records. A public analytics dashboard would disclose business learning. A full analytics platform is unnecessary for this controlled experiment. The selected small aggregate collector needs explicit concurrency, duplication, abuse, retention and actual destination tests; it is not fraud-proof market research.

Feedback and Early Access will be a separate material feature and private destination. Analytics receives only fixed success/category events, never form fields or email. Synthetic use is separately categorized and excluded from real-address conversion reporting.

## Acceptance

Test opt-out, schema rejection, no private fields, concurrency, duplicate delivery, malformed/oversized/cross-origin requests, bounded provider failure, retention boundaries, browser failure isolation and actual Netlify receipt. Confirm counts through the authenticated storage UI. Until then this capability remains UNVALIDATED.

## Sources

- https://docs.netlify.com/build/data-and-storage/netlify-blobs/ — automatic function authentication and conditional writes.
- https://docs.netlify.com/build/functions/api/ — request handlers, rate-limit configuration and scheduled functions.
- https://plausible.io/docs/custom-event-goals — custom event setup and measurement.

Accessed 2026-10-07 UTC.
