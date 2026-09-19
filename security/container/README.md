# Container Security

Container and repository security scanning is performed using Trivy.

## Scanning strategy

### Framework repository
The Playwright automation repository is scanned for:

- dependency vulnerabilities
- configuration weaknesses
- exposed secrets

High and Critical findings are reviewed as security gate candidates.

### OWASP Juice Shop image
The Juice Shop container image is scanned separately.

Because OWASP Juice Shop is intentionally vulnerable, findings against the
target image are treated as security observations rather than framework
build failures.

Reports generated during CI are available as GitHub Actions artifacts.