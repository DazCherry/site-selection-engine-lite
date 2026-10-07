# Security and privacy

## Threat model

Untrusted address input, untrusted provider payloads, ambiguous geocodes, oversized or stale responses, injected markup, private-data publication, and misleading scores are the principal risks in this static demo. The scoring flow has no account or private engine. Distribution adds private host-managed aggregate and voluntary contact stores, with no public read endpoint or browser credentials.

## Controls

- Explicit provider consent and address confirmation; no automatic location or keystroke transmission.
- Input length and type validation, finite coordinate checks, exact enums and UTC timestamp validation.
- Fixed provider origins; CSP disallows arbitrary connections, external scripts, objects and form posting.
- All external strings rendered with `textContent`; no HTML injection sinks or dynamic code execution.
- Geocoding: 25-second timeout and 1.5 MB streamed-response cap. Context: 45-second overall deadline, 10-second requests, 4 MiB compressed range, 32 MiB total wire data, 32 MiB per decompressed tile, 96 MiB cumulative decompression, 100 requests, 100,000 inspected features and 10,000 retained records. Range status/length and stable ETags must match.
- One request at a time, provider cooldown, small transient cache, at most two transient context retries in total (at most one per request), and no endpoint rotation. HTTP 429 enforces a pause rather than retry.
- Analytics off by default, exact fixed-field schema, no addresses/emails/raw URLs, same-origin checks, bounded requests, idempotent counts and rate limits.
- Voluntary contact requires explicit consent, private destination, idempotent submission and scheduled retention. No user-supplied file imports or browser storage.
- Intake is disabled until core initialization; POST-only forms and form-action CSP prevent fallback GET address/email leakage. Optional module failure does not block core scoring.
- Secret/private-path/forbidden-term scanning of publication files and Git history; manual IP review remains required.
- Static hosting headers deny framing and browser location/camera/microphone access where the host honors them. Meta CSP remains a fallback; configure equivalent HTTP headers on other hosts.

The local Node server is for development, binds loopback and serves only `dist`. It rejects directory traversal, unsupported methods and unknown files; production uses a maintained HTTPS static host.

## Limits and reporting

Pattern scanners cannot identify all customer names or semantic IP leakage. The hashed denylist covers known restricted terms and is not a secret-vault substitute. Novel sensitive content requires human classification. The public source contains only synthetic fixtures and independently authored logic.

Geocoders may return incorrect addresses. Users must check the candidate address and coordinates. Raw provider content may be inaccurate, malicious or obsolete; schema validation cannot establish truth. A database timestamp is not feature validation. A public-provider failure produces no score.

Report non-sensitive defects through repository issues. Never paste credentials, private candidate addresses or confidential snapshots in a public issue. Contact the repository owner privately for sensitive concerns.
