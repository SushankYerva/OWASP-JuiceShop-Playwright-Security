# Playwright Security Validation Framework

[![Playwright Tests](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/playwright.yml/badge.svg)](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/playwright.yml)

[![SAST - Semgrep](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-sast.yml/badge.svg)](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-sast.yml)

[![SCA - Dependency Security](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-sca.yml/badge.svg)](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-sca.yml)

[![Container Security - Trivy](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-container.yml/badge.svg)](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-container.yml)

[![DAST - OWASP ZAP](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-dast.yml/badge.svg)](https://github.com/SushankYerva/OWASP-JuiceShop-Playwright-Security/actions/workflows/security-dast.yml)

## Overview

This project is an enterprise-style Quality Engineering and Application
Security automation framework built with Playwright and TypeScript against
OWASP Juice Shop.

The framework combines functional, API, UI and security regression testing
with external AppSec tooling including Semgrep, npm audit, Trivy and OWASP
ZAP.

The CI/CD pipeline distinguishes between vulnerabilities intentionally
present in OWASP Juice Shop and security regressions introduced by the
automation framework itself.

## Automated Test Coverage

| Area | Coverage |
| --- | --- |
| Authentication | Registration, valid login, invalid login, logout |
| Products | Search and product selection |
| Basket | Add, increase, decrease and remove |
| Checkout | Address, payment and order flow |
| API | Authentication, products, basket and contracts |
| Contract Testing | Zod schema validation |
| Accessibility | Axe WCAG automated checks |
| Responsive UI | Mobile and tablet layouts |
| Visual Regression | Product catalogue, login and basket |
| Authorization | Protected administration functionality |
| Session Security | Logout persistence and JWT tampering |
| HTTP Security | Security header regression |
| Input Validation | API and browser input handling |
| API Security | Authentication, HTTP methods and CORS |

## Security Automation

| Security Layer | Tool | CI Policy |
| --- | --- | --- |
| Application Security | Playwright | Regression gate |
| SAST | Semgrep | Blocking |
| SCA | npm audit | High/Critical blocking |
| Supply Chain | Dependabot | Automated update PRs |
| Repository Security | Trivy | High/Critical blocking |
| Secret Scanning | Trivy | High/Critical blocking |
| Container Security | Trivy | Juice Shop report only |
| DAST | OWASP ZAP | Baseline-aware security gate |

## Security Baseline Strategy

OWASP Juice Shop is intentionally vulnerable.

Security findings against the target application are therefore not blindly
suppressed and are not treated as defects in the Playwright framework.

Known target vulnerabilities are explicitly documented and baselined.

Framework security regressions remain blocking.

New findings outside the approved baseline require review before they can
be accepted.

Baseline documentation:

- `security/baselines/known-findings.yml`
- `security/dast/zap-baseline.conf`
- `security/dast/zap-full.conf`

## Current Security Baseline

### Semgrep

Current framework SAST baseline:

- 0 findings

### npm Audit

Current dependency baseline:

- 0 known vulnerabilities

### Trivy

Current framework baseline:

- 0 High/Critical dependency vulnerabilities
- 0 detected secrets

### OWASP ZAP

Current full DAST scan:

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
- Content Security Policy Header Not Set
- Cross-Domain Misconfiguration
- Missing cross-origin policy headers
- Dangerous JavaScript Functions
- Deprecated Feature Policy
- Unix Timestamp Disclosure

Full scanner reports are retained as GitHub Actions artifacts.

## CI/CD Security Architecture

```mermaid
flowchart TD
    A[Code Push / Pull Request]

    A --> B[Playwright]
    A --> C[Semgrep SAST]
    A --> D[npm Audit SCA]
    A --> E[Trivy]

    B --> F[Functional / API / UI / Security]
    C --> G[SAST Gate]
    D --> H[Dependency Gate]
    E --> I[Framework Security Gate]

    J[Scheduled / Manual] --> K[OWASP ZAP]
    K --> L[Juice Shop DAST]
    L --> M[Known Baseline]
    L --> N[New Finding Gate]

    O[Dependabot] --> A