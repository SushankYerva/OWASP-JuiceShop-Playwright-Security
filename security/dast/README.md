# Dynamic Application Security Testing

OWASP ZAP is used to perform dynamic security testing against
OWASP Juice Shop.

## Strategy

- Baseline scan: passive security assessment
- Full scan: active DAST against the local/CI Juice Shop instance
- Known Juice Shop vulnerabilities are documented and baselined
- New unexpected findings can be used as CI security gates
- Generated reports are stored as GitHub Actions artifacts

The target application is intentionally vulnerable, so ZAP findings against
Juice Shop are not automatically treated as framework failures.