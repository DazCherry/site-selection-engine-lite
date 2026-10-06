# Security and privacy

## Threat model

Untrusted address input, untrusted provider payloads, ambiguous geocodes, oversized or stale responses, injected markup, private-data publication, and misleading scores are the principal risks in this static demo. There is no private data store, login, tenant boundary, secret, or privileged backend.

## Controls

- Explicit provider consent and address confirmation; no automatic location or keystroke transmission.
- Input length and type validation, finite coordinate checks, exact enums and UTC timestamp validation.
- Fixed provider origins; CSP disallows arbitrary connections, external scripts, objects and form posting.
- All external strings rendered with `textContent`; no HTML injection sinks or dynamic code execution.
- HTTP timeout, bounded streamed reads (1.5 MB), query radius, server query budget and record cap.
- One request at a time, provider cooldown, small transient cache, no automatic retries or endpoint rotation.
- No analytics, browser storage, sensitive inputs, raw provider logging, or user-generated file imports.
- Secret/private-path/forbidden-term scanning of publication files and Git history; manual IP review remains required.
- Static hosting headers deny framing and browser location/camera/microphone access where the host honors them. Meta CSP remains a fallback; configure equivalent HTTP headers on other hosts.

The local Node server is for development, binds loopback and serves only `dist`. It rejects directory traversal, unsupported methods and unknown files; production uses a maintained HTTPS static host.

## Limits and reporting

Pattern scanners cannot identify all customer names or semantic IP leakage. The hashed denylist covers known restricted terms and is not a secret-vault substitute. Novel sensitive content requires human classification. The public source contains only synthetic fixtures and independently authored logic.

Geocoders may return incorrect addresses. Users must check the candidate address and coordinates. Raw provider content may be inaccurate, malicious or obsolete; schema validation cannot establish truth. A database timestamp is not feature validation. A public-provider failure produces no score.

Report non-sensitive defects through repository issues. Never paste credentials, private candidate addresses or confidential snapshots in a public issue. Contact the repository owner privately for sensitive concerns.
