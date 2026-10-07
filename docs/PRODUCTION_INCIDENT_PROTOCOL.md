# Production incident protocol

1. Reproduce the reported behavior at the actual deployment and capture version, time, sanitized outcome and provider status. Obtain explicit permission before sending a confidential incident address to another party. Keep sensitive evidence outside Git.
2. Separate observation from hypothesis. Check input normalization, request parameters, raw-response structure, filtering/ranking, rendered candidates and deployed/source parity. Record unavailable evidence as unvalidated.
3. Establish root cause and blast radius. Identify the failure class; do not assume upstream fault. Preserve reliable production behavior while investigating.
4. Design a systemic fix and consider adjacent failures: ambiguity, mismatched numbers/localities, malformed input, missing fields, stale results, retries, quota, runtime dependency and timeout. No address-specific patches or centroid substitution.
5. Classify scope and provider rights before implementation. Keep the model frozen and credentials/data private. Obtain owner authorization for account, financial and legal commitments.
6. Implement, locally debug, add synthetic regression fixtures and independently cross-check invariants. Use independently sourced public civic addresses for live checks.
7. Adversarially review, fix material findings, run the complete baseline and new suites, publication/security/privacy/cost/license/IP checks, and a clean checkout build.
8. Validate Netlify staging and Deploy Preview. Promote only an accepted checkpoint. Test production desktop/mobile and actual destination receipt, not merely request dispatch. Repair or roll back material regressions and repeat affected gates.
9. Document cause, evidence, rejected approaches, residual limitations, prevention and operational recovery. Record exactly which tests ran and their environment/version. Preserve old release tags.
10. Monitor recurrence through address-free aggregate diagnostics. Distinguish observed events from unknown activity when analytics is declined. Never close an incident solely because one example now succeeds.

An unresolved material finding reopens development. Missing external authorization is BLOCKED / UNVALIDATED, never PASS. Email API acceptance and a delivery webhook do not prove owner inbox receipt.
