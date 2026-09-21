# CI/CD Quality and Security Gates

This repository uses multiple automated quality and security controls.

## Quality Gates

| Gate | Tool | Failure Policy |
| --- | --- | --- |
| Functional/API/UI regression | Playwright | Any unexpected test failure |
| Static Application Security Testing | Semgrep | Blocking code finding |
| Dependency Security | npm audit | High or Critical vulnerability |
| Framework Security | Trivy | High or Critical vulnerability, secret or misconfiguration |
| Dynamic Security | OWASP ZAP | New finding outside approved baseline |

## Report-Only Scans

The OWASP Juice Shop container image is intentionally vulnerable.

Container vulnerabilities discovered inside Juice Shop are therefore
reported as security evidence but do not fail the framework CI pipeline.

Known OWASP ZAP findings are recorded in the DAST baseline.

## Baseline Policy

Known vulnerabilities must never simply be ignored.

They are documented and classified as:

- framework regression
- known target vulnerability
- false positive
- informational observation

New findings require review before being added to an approved baseline.

## CI Evidence

GitHub Actions retains artifacts including:

- Playwright reports
- Semgrep SARIF
- npm audit JSON
- Trivy SARIF
- Juice Shop Trivy JSON
- ZAP HTML
- ZAP JSON
- ZAP Markdown
- ZAP console logs

## Dependabot

Dependabot monitors:

- npm dependencies
- GitHub Actions dependencies

GitHub Actions updates are grouped and third-party actions are pinned to
immutable commit SHAs.