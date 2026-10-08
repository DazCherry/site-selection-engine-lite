# Feedback and future interest

Status: staging and production receipt gates passed. Actual private records matched the synthetic feedback and explicitly consented example-domain contact submitted through the deployed UI.

The optional result CTA opens two short forms. Feedback uses fixed usefulness, intuitive agreement, decision-context and missing-capability choices. Interest accepts one to three future categories, broad role, optional email and separate contact consent. These capabilities are unavailable ideas, not delivered Paid products. No automatic visitor email or marketing outreach occurs. A disabled owner-only notification candidate is described in OWNER_OPERATIONS; activation requires separate authorization.

Both forms POST JSON to /api/interest. The server validates the exact schema, same-origin header, type, body size, empty honeypot and explicit email consent. Request values never become HTML, URL parameters, telemetry properties or application logs. Only a validated receipt produces success. Failed or timed-out submissions retain entered values in page memory; retry uses the same random ID. No browser persistence exists. Starting another analysis clears the forms.

One private record per submission is stored in sitebuddy-submissions-v1; non-production deploy contexts use sitebuddy-submissions-preview-v1. The separate staging project isolates QA. No public read endpoint is available. In the authenticated Netlify project open Data & storage, Blobs, the store, feedback or interest, then Download for a JSON record. In tested Chrome, Download opens a temporary private JSON view. Never publish its signed URL or real contact records. Interpret synthetic records as QA, not demand.

The scheduled cleanup runs daily at 03:37 UTC and deletes records at least 90 days old. Service outages can delay cleanup; check failed function runs before asserting retention completed. The owner can delete a record sooner in the Netlify UI. Hosting still processes IP/network metadata; the application does not retain IP in records. Platform rate limiting allows ten requests/minute per IP/domain. This reduces abuse and does not guarantee authentic or representative respondents.

Analytics, only if separately opted in, receives fixed submission/category events. It never receives email, contact consent, response content or submission IDs. Contact storage remains a separate private destination. Future commercial decisions remain the owner's responsibility.
