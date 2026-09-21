# Security Automation

This repository combines Playwright security regression testing with
external application-security tooling.

## Security Tooling

| Layer | Tool | Purpose | CI Behaviour |
| --- | --- | --- | --- |
| Application security | Playwright | Authentication, authorization, session, input and API controls | Regression gate |
| SAST | Semgrep | Static analysis of framework and GitHub Actions | Blocking |
| SCA | npm audit | Dependency vulnerability scanning | High/Critical blocking |
| Supply chain | Dependabot | Dependency and GitHub Actions updates | Automated PRs |
| Repository/container | Trivy | Vulnerability, secret and misconfiguration scanning | High/Critical framework gate |
| DAST | OWASP ZAP | Runtime vulnerability assessment of Juice Shop | Baseline-aware gate |

## Security Philosophy

The automation framework itself is expected to remain secure.

OWASP Juice Shop is intentionally vulnerable and is therefore handled
differently. Known vulnerabilities are recorded in:

`security/baselines/known-findings.yml`

Machine-enforced ZAP baselines are stored in:

`security/dast/zap-baseline.conf`

`security/dast/zap-full.conf`

New findings that are not part of the approved baseline require review.

## CI Evidence

GitHub Actions publishes security evidence including:

- Semgrep SARIF
- npm audit JSON
- Trivy SARIF
- Juice Shop container vulnerability report
- ZAP HTML report
- ZAP JSON report
- ZAP Markdown report
- Playwright reports and failure artifacts

Generated reports are not committed to the repository. They are provided
as workflow artifacts so the repository remains clean while security
evidence remains available for review.