# Security Testing Strategy

## Objective

The project demonstrates how functional automation and application
security testing can be combined in a CI/CD pipeline.

The automation framework targets OWASP Juice Shop, an intentionally
vulnerable web application.

The objective is therefore not to make Juice Shop appear vulnerability
free. Instead, the framework distinguishes between known target
vulnerabilities and new security regressions.

## Security Layers

### Playwright Security Tests

Playwright covers application-level security behavior including:

- authentication rejection
- authorization controls
- privileged route access
- logout/session persistence
- modified token rejection
- HTTP security headers
- input validation
- malformed API authentication
- HTTP method handling
- CORS behavior

### Static Application Security Testing

Semgrep scans:

- TypeScript
- JavaScript
- YAML
- GitHub Actions

The Semgrep pipeline operates as a blocking SAST quality gate.

### Software Composition Analysis

npm audit evaluates dependencies in the Playwright framework.

High and Critical dependency vulnerabilities fail CI.

### Repository and Container Security

Trivy scans the automation framework for:

- dependency vulnerabilities
- secrets
- security misconfigurations

The Juice Shop container is scanned separately because vulnerabilities
inside the intentionally vulnerable target should not be represented as
vulnerabilities in the automation framework itself.

### Dynamic Application Security Testing

OWASP ZAP performs passive and active scanning against a disposable
Juice Shop environment created in GitHub Actions.

Known Juice Shop findings are represented in the ZAP baseline.

New ZAP rules not represented in the baseline can fail the DAST
security gate.

## Current DAST Baseline

The current full scan identified:

| Severity | Alert Types |
| --- | ---: |
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Informational | 5 |

Known findings include:

- Backup File Disclosure
- Bypassing 403
- CORS Misconfiguration
- Missing Content Security Policy
- Cross-Domain Misconfiguration
- Missing cross-origin policy headers
- Dangerous JavaScript functions
- Deprecated Feature Policy
- Unix timestamp disclosure

Full runtime reports are retained as GitHub Actions artifacts.

## Security Gate Model

Framework security regression:

`Finding → CI failure`

Known Juice Shop vulnerability:

`Finding → documented baseline → report → CI continues`

New target finding:

`Finding → CI failure/review → baseline updated only after approval`

## Evidence

Security evidence is available through GitHub Actions workflow runs and
GitHub Code Scanning.

Generated scan reports are deliberately excluded from source control.
Only configuration, baselines, policies and documentation are committed.