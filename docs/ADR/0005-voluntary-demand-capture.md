# ADR 0005 - Voluntary feedback and future-capability interest

Status: selected before implementation; staging acceptance required. PUBLIC APPROVED distribution capability.

Use a separate Netlify Function and private Blobs stores for short fixed-choice feedback and optional Early Access contact. This reuses the already validated host/storage without another account, browser credential, paid plan or unsolicited message. The owner reads records in the authenticated Netlify UI. No public read endpoint exists.

Netlify Forms was evaluated, but a small shared collector provides strict server-side schema validation, explicit idempotence and bounded error responses without routing valid QA through a separate spam-classification system. Rate limiting and a honeypot reduce abuse but cannot prove submissions are genuine people. Do not use this experiment as representative market research.

Feedback asks usefulness, intuitive agreement, decision context and one expected missing capability. Interest asks up to three future capability preferences, broad role, optional email and separate contact consent. No free text, address or project details. Email is never sent to analytics. Future capabilities are explicitly unavailable; no price, launch date or delivery promise. Contact capture does not send mail or authorize external outreach by Codex.

Each submission has a random idempotency ID and one private record. Repeat requests with the same content do not duplicate it; changed content uses a new ID. Size/type/origin/schema checks and platform limits apply. Client timeout preserves entered values and the retry ID, never claims success without a validated receipt, and writes no browser storage. A failed optional module cannot break scoring. Scheduled cleanup removes records after 90 days; the owner can remove individual records earlier through Netlify.

Staging/preview stores remain separate from production. Synthetic QA uses reserved example-domain contact data only. Verify actual private receipt, duplicates, malformed/oversized requests, timeout recovery, contact consent, zero email telemetry and the complete visible desktop/mobile path before PASS.
