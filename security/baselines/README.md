# Security Baselines

This directory contains approved security baselines for the automation
framework.

OWASP Juice Shop is intentionally vulnerable. A security finding against
the target application therefore does not automatically indicate a defect
in this repository.

## Baseline Philosophy

Security findings are classified into three categories.

### Framework Regression

A finding introduced by the Playwright framework, repository,
dependencies, CI/CD configuration, or supporting automation.

These findings can fail CI.

Examples:

- Semgrep SAST finding
- vulnerable npm dependency
- exposed repository secret
- insecure GitHub Actions configuration
- high or critical Trivy framework finding

### Known Target Vulnerability

A vulnerability that exists intentionally in OWASP Juice Shop.

These findings remain visible in reports but are baselined so that the
CI pipeline is not permanently red.

Examples:

- backup file disclosure
- CORS misconfiguration
- missing CSP
- 403 bypass behavior

### New Finding

A finding not currently present in the approved baseline.

New findings must be reviewed before they can be accepted into the
baseline.

## Rule

A failing security scan must never be fixed simply by suppressing the
finding.

The finding should first be classified as:

1. framework regression,
2. known target vulnerability,
3. false positive, or
4. new finding requiring investigation.

Baselines must be updated only after review.