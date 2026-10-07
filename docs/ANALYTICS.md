# Optional product-learning measurement

Status: core funnel passed staging receipt validation at ea4d011; demand events also passed staging; final production acceptance is in progress.

Consent defaults off on each page load. Opting in measures subsequent actions and one page_view. Turning it off aborts pending requests; enabling it again does not duplicate that page view. No history is replayed, cookies/local storage used, or visitor ID shared across pages. A blocked module never gates scoring. Requests have a three-second client deadline and no automatic retry. Counts can be incomplete due to consent, blocking, disconnection, rate limits or service failure. They are neither unique people nor total traffic.

## Schema

Every event has exactly v (1), a random per-event UUID, event, kind, channel, category and failure. Extra fields are rejected. No addresses, coordinates, email, input values, referrer URLs, query strings, fragments or scores enter analytics. Kind is none/public/synthetic. Channel is direct/github/producthunt/hackernews/community/outreach/search/shared/other/qa. Only fixed utm_source labels are accepted. Other values become other. A share fragment maps to shared without retaining its contents.

Events: page_view, analysis_started, address_submitted, address_confirmed, analysis_succeeded, analysis_withheld, analysis_failed, repeat_analysis, share_clicked, share_copied, share_manual, deeper_analysis_clicked, feedback_submitted, early_access_submitted, capability_interest. Category is none or an approved future-capability label. Failure is none/input/geocoding/context/integration.

## Private destination

Netlify Functions writes sitebuddy-measurement-v1 (sitebuddy-measurement-preview-v1 outside the production deploy context). Separate staging and production projects isolate QA. No public read endpoint exists. In the authenticated Netlify project, open Data & storage, Blobs, the store, then use Download on a daily date JSON. In tested Chrome this opens a short-lived authenticated JSON view; treat that temporary link as private and do not publish it. Count keys are event|kind|channel|category|failure. events is the accepted event count; ids supports idempotence and is not a visitor list.

Daily records are capped at 10,000 events, with five conditional-write attempts. Platform rate limiting permits 60 requests/minute per IP/domain. IP is not copied into application storage. A scheduled function runs at 03:17 UTC and removes daily records aged at least 30 days. Netlify still processes network metadata for hosting and protection. Application code does not log request bodies. Account access and platform retention follow Netlify controls; this is not zero third-party processing.

## Interpretation

Exclude synthetic events and channel=qa from real-address conversion metrics. Compare successful/withheld/failed analyses to starts, repeat and sharing actions, then deeper-interest/submission actions. Events are not unique users or causal attribution. The owner can download count files without engineering setup. These aggregates inform customer discovery, not scoring calibration or automatic Paid investment decisions.

Record tests and actual destination evidence in DEVELOPMENT_LOG and the final readiness report. A fired request alone is not acceptance.
