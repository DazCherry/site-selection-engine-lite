# Owner operations — v0.2.1 production

Resend Free, verified domain, restricted key and production activation are configured. QA immediate and daily digest messages were owner-confirmed in the inbox. Production form and scheduled recovery notices were accepted; final inbox confirmation is pending. Private Blobs remains the system of record. No new setup approval is needed. Historical setup entries below are superseded by this status and the latest development log.


## One-time approved setup

1. Owner approves Resend Free only and accepts applicable terms personally; no upgrade, overages, payment method or auto-recharge.
2. Owner approves a sending domain/subdomain and its DNS verification. Verify SPF/DKIM and appropriate DMARC configuration; preserve existing mail records. Recipient identity alone is not sender authorization.
3. Create a sending-only API key restricted to the verified domain. Configure through secure Netlify environment settings, production context only (Free-plan scope details below): `RESEND_API_KEY`, `SITEBUDDY_MAIL_FROM` (bare verified email), `SITEBUDDY_OWNER_EMAIL` (the one destination privately specified by owner), `SITEBUDDY_MAIL_ENABLED_SINCE` (UTC ISO timestamp), then `SITEBUDDY_MAIL_ENABLED=1` only after acceptance. No client recipient input is supported. No key in chat or Git.
4. Keep previews/staging disabled, including a separate staging project's production context. Never copy production secrets into preview contexts. Recheck provider quota, Free plan, no overages and tracking disabled in the actual dashboard.

## Daily behavior

Opted-in public interest is durably stored, queued and attempted after response using waitUntil. Failures preserve the submission and user success acknowledgement. Five-minute scheduled recovery discovers missed eligible queue records from the preceding seven days after activation. Reports for the previous UTC day are prepared at the first scheduled run at or after 00:05 UTC, with up to seven days' backfill. Digests exclude QA, aggregate roles/capabilities/usefulness, and identify submission counts rather than people. No empty message unless an operational warning exists. At least 1.1 seconds between globally reserved attempts; bursts wait for recovery. There is no guaranteed notification latency.

## Delivery states and repair

`queued` → `sending` (60-second lease) → `accepted`, `retry`, or `terminal`. Accepted means a validated provider response with message ID; it does not mean delivery or inbox placement. Six attempts maximum, exponential delay starting at one minute up to one hour, seven-day unattempted queue expiry, and a 23-hour ambiguous retry window. Failed writes after provider success are retried using the same idempotency key. Changed payload/sender/recipient after a first attempt stops for review.

For outages inspect Netlify sanitized warnings, private `mail/` state, provider dashboard and `operations.json` export. Fix configuration/provider availability; ordinary retries recover automatically. Do not reset an ambiguous job's first-attempt time, ID or fingerprint. For an expired ambiguous attempt, inspect Resend and the owner inbox before deciding anything. If acceptance cannot be excluded, do not resend; the original contact remains available in the owner export. This is duplicate resistance, not exactly-once delivery. No automated visitor outreach exists.

If Blobs is unavailable, even the operational failure counter can fail; sanitized Netlify logs then provide the remaining signal. Counts are not exhaustive outage telemetry. `sitebuddy_submission_storage_failed`, `sitebuddy_mail_deferred`, `sitebuddy_operational_count_unavailable`, and `sitebuddy_mail_worker_failed` contain no record payloads.

## Private export

Use Node 22+ from the repository after its pinned dependency install. Authorize an existing least-privilege Netlify owner token for this project and make `NETLIFY_AUTH_TOKEN` and `SITEBUDDY_SITE_ID` available securely to the local process. Do not paste credentials into command history, Git, browser code or chat. No token is automatically discovered or read by Codex.

Run `node scripts/owner-export.mjs --out /absolute/private/folder-outside-repository` using a new empty folder. It writes feedback, professional-interest, analytics-summary CSV and aggregate operations JSON. Owner-only authentication happens through Netlify, never a public read endpoint. QA is excluded by default; formulas are escaped and files use mode 0600. Existing files are not overwritten. The command rejects repository destinations and sanitizes errors. Delete exports after use; copies do not inherit automatic server deletion. Analytics cover consenting visits only, not total traffic or unique visitors.

## Authorized inbox acceptance

Only after activation authorization, supply the same approved variables plus authorized Netlify token/site ID to `node scripts/owner-mail-qa.mjs --send`. A fixed synthetic contact goes only to the configured owner recipient with `[QA]` subject. It uses a separate QA store, one stable idempotency identity, and cannot change destination via command arguments. Repeating the command does not deliberately create a new notification. Do not submit a real customer record for tests.

Inspect the owner inbox, subject and content. Only after actual receipt has been observed, run `node scripts/owner-mail-qa.mjs --confirm-receipt` to record the owner verification time. A provider `accepted` response alone is not PASS. Verify no duplicate, then exercise the actual production form with a clearly synthetic test case and isolate/remove its test artifacts under the authorized QA procedure before launch reporting. Both QA message types passed owner-confirmed inbox acceptance; production acceptance is recorded in the development log.

## Retention and limits

Submissions: 90 days; notification tombstones: 91 days; operational counters: 30 days, via scheduled retention even when mail is disabled. Mail-control budget stores only current date/month/counts. No addresses/coordinates/analytics IDs enter mail. Resend service logs and owner inbox copies have independent retention; configure/delete those separately. A scan exceeding 10,000 records fails closed and logs a worker failure; review capacity before increasing limits. Keep existing account spending safeguards; application mail caps do not cap hosting charges.

### Current account setup evidence

Authenticated Resend Billing shows the $0/month 3,000-message subscription and no payment methods. The dedicated sending subdomain exists, verification has not started, receiving is off and TLS is Enforced. Exact DKIM TXT and two sending CNAME records were delivered privately to the owner; unrelated root MX/SPF/DMARC must remain untouched. Tracking has not been configured; confirm its final disabled state before activation. Domain-restricted API key selection currently offers only All domains because verification is pending, so no key was created.

The Netlify personal-token UI offers a seven-day expiry but no project-level read-only scope. A prepared owner handoff explains that account-level access explicitly; it must not be represented as a project-restricted credential. No token was generated or discovered. Live export acceptance remains pending.

## DNS and hosting setup update — 2026-10-08 UTC

After explicit owner authorization to edit DNS directly, the three dedicated sender records were added in GoDaddy. Owner completed both requested SMS checks. The authoritative nameserver returns the exact CNAME targets; DKIM is publicly visible. Resend records DNS verified but domain provisioning remains pending. Root MX/SPF and website records were preserved; no receiving or tracking domain was enabled.

Production-only sender and fixed-recipient configuration values were saved in Netlify; no key, activation timestamp or enabled flag was saved. The current Netlify plan disables Functions-only variable scope behind an upgrade. No upgrade is permitted or attempted. The compatible plan is production-context-only secret values with existing untrusted-deploy approval, pinned dependencies without install scripts, and a build that explicitly copies static assets and never serializes server mail environment values. A synthetic-sentinel build regression checks every public output and build stdout for accidental secret/recipient serialization. This does not prevent malicious future build code; retain review gates before production changes. Previews and local contexts receive no mail configuration.

Actual private export still requires an explicitly approved temporary account-level Netlify credential; no credential has been created. Actual email, inbox receipt and production release acceptance remain unvalidated.


## Resend provider acceptance — 2026-10-08 UTC

The owner created and securely supplied the approved single-domain sending key. Local file mode is 0600. Actual private QA lead processing returned accepted; the owner explicitly confirmed inbox receipt, recorded in private QA state. Reprocessing retained one attempt without another send. A separate QA daily aggregate was accepted and explicitly confirmed in the owner inbox. QA data is isolated from product-learning stores. No visitor received email.

The key is saved as a Netlify Secret in production context only, with builds/functions/runtime scopes. HTTP 422 was traced to unsupported post_processing scope for secrets; excluding that scope succeeded with HTTP 201. No upgrade or secret disclosure occurred. The 97-test suite passed again, including frozen scoring, retries, quotas, privacy and public-asset secret isolation. Preview synthetic result remains 7.5. Candidate version is v0.2.1; production triggers and scheduler acceptance remain pending. The address coverage incident remains open.
