# Requirements and Test Traceability Matrix

## Purpose

This document maps business, technical, UI and security requirements to automated tests, tools, CI workflows and evidence.

The objective is to make coverage visible and auditable without requiring a reviewer to inspect every test file.

## Traceability Model

```text
Requirement / Risk
        ↓
Test Layer
        ↓
Test File / Test Group
        ↓
Tool
        ↓
CI Workflow
        ↓
Evidence
```

## Functional Traceability

| ID | Requirement / Risk | Test Layer | Representative Test Area | Tool | CI Workflow | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| FUNC-001 | User can register successfully | Functional | `tests/functional/authentication/` | Playwright | Playwright Tests | HTML report / trace |
| FUNC-002 | Valid user can authenticate | Functional | `tests/functional/authentication/` | Playwright | Playwright Tests | HTML report / trace |
| FUNC-003 | Invalid credentials are rejected | Functional / Security | `tests/functional/authentication/`, `tests/security/authentication/` | Playwright | Playwright Tests | HTML report / trace |
| FUNC-004 | User can search for a product | Functional | `tests/functional/products/` | Playwright | Playwright Tests | HTML report / screenshot |
| FUNC-005 | Exact product can be selected | Functional | `tests/functional/products/` | Playwright | Playwright Tests | HTML report |
| FUNC-006 | Product can be added to basket | Functional | `tests/functional/basket/` | Playwright | Playwright Tests | HTML report |
| FUNC-007 | Basket quantity can be increased/decreased | Functional | `tests/functional/basket/` | Playwright | Playwright Tests | HTML report |
| FUNC-008 | Product can be removed from basket | Functional | `tests/functional/basket/` | Playwright | Playwright Tests | HTML report |
| FUNC-009 | User can create/select checkout address | Functional | `tests/functional/checkout/` | Playwright | Playwright Tests | HTML report |
| FUNC-010 | User can create/select payment method | Functional | `tests/functional/checkout/` | Playwright | Playwright Tests | HTML report |
| FUNC-011 | User can complete checkout | Functional | `tests/functional/checkout/` | Playwright | Playwright Tests | HTML report / trace |

## API and Contract Traceability

| ID | Requirement / Risk | Test Layer | Representative Test Area | Tool | CI Workflow | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| API-001 | API authentication succeeds for valid user | API | `tests/api/authentication/` | Playwright API | Playwright Tests | HTML report |
| API-002 | API authentication rejects invalid credentials | API | `tests/api/authentication/` | Playwright API | Playwright Tests | HTML report |
| API-003 | Product catalogue can be retrieved | API | `tests/api/products/` | Playwright API | Playwright Tests | HTML report |
| API-004 | Product search returns expected data | API | `tests/api/products/` | Playwright API | Playwright Tests | HTML report |
| API-005 | Basket lifecycle operations work | API | `tests/api/basket/` | Playwright API | Playwright Tests | HTML report |
| API-006 | Authentication response matches expected contract | Contract | `tests/api/contract/` | Zod + Playwright | Playwright Tests | HTML report |
| API-007 | Product responses match expected contract | Contract | `tests/api/contract/` | Zod + Playwright | Playwright Tests | HTML report |
| API-008 | Basket response matches expected contract | Contract | `tests/api/contract/` | Zod + Playwright | Playwright Tests | HTML report |

## UI Traceability

| ID | Requirement / Risk | Test Layer | Representative Test Area | Tool | CI Workflow | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| UI-001 | Important pages have no new serious/critical accessibility regressions | Accessibility | `tests/ui/accessibility/` | Axe + Playwright | Playwright Tests | HTML report |
| UI-002 | Application remains usable on mobile viewport | Responsive | `tests/ui/responsive/` | Playwright | Playwright Tests | HTML report |
| UI-003 | Application remains usable on tablet viewport | Responsive | `tests/ui/responsive/` | Playwright | Playwright Tests | HTML report |
| UI-004 | Product catalogue has no unapproved visual regression | Visual | `tests/ui/visual/` | Playwright Screenshots | Playwright Tests | Expected/actual/diff |
| UI-005 | Login page has no unapproved visual regression | Visual | `tests/ui/visual/` | Playwright Screenshots | Playwright Tests | Expected/actual/diff |
| UI-006 | Basket page has no unapproved visual regression | Visual | `tests/ui/visual/` | Playwright Screenshots | Playwright Tests | Expected/actual/diff |

## Security Regression Traceability

| ID | Requirement / Risk | Test Layer | Representative Test Area | Tool | CI Workflow | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | Invalid authentication must not create authenticated state | Security | `tests/security/authentication/` | Playwright | Playwright Tests | HTML report |
| SEC-002 | Unauthenticated API access must be rejected | Security | `tests/security/authentication/` | Playwright API | Playwright Tests | HTML report |
| SEC-003 | Normal user must not access privileged admin functionality | Security | `tests/security/authorization/` | Playwright | Playwright Tests | HTML report |
| SEC-004 | Tampered JWT must be rejected | Security | `tests/security/session/` | Playwright API | Playwright Tests | HTML report |
| SEC-005 | Logout must remove authentication state | Security | `tests/security/session/` | Playwright | Playwright Tests | HTML report |
| SEC-006 | Logout state must remain removed after reload | Security | `tests/security/session/` | Playwright | Playwright Tests | HTML report |
| SEC-007 | Required security headers must remain present | Security | `tests/security/headers/` | Playwright API | Playwright Tests | HTML report |
| SEC-008 | Known missing security headers remain documented | Security | `tests/security/headers/` | Playwright API | Playwright Tests | Annotation / baseline |
| SEC-009 | API input handling remains observable and classified | Security | `tests/security/input-validation/` | Playwright API | Playwright Tests | HTML report / annotation |
| SEC-010 | UI HTML-like input behaviour remains observable | Security | `tests/security/input-validation/` | Playwright | Playwright Tests | HTML report / annotation |
| SEC-011 | Malformed Bearer token is rejected | Security | `tests/security/api-security/` | Playwright API | Playwright Tests | HTML report |
| SEC-012 | Unsupported HTTP method behaviour is monitored | Security | `tests/security/api-security/` | Playwright API | Playwright Tests | HTML report / annotation |
| SEC-013 | CORS behaviour is monitored | Security | `tests/security/api-security/` | Playwright API | Playwright Tests | HTML report / annotation |

## External Security Traceability

| ID | Requirement / Risk | Tool | CI Workflow | Failure Policy | Evidence |
| --- | --- | --- | --- | --- | --- |
| EXT-001 | Source code and workflow configuration contain no blocking SAST findings | Semgrep | SAST - Semgrep | Blocking | SARIF / Code Scanning |
| EXT-002 | Node dependencies contain no High/Critical known vulnerabilities | npm audit | SCA - Dependency Security | Blocking | JSON artifact |
| EXT-003 | Framework contains no High/Critical Trivy findings | Trivy | Container Security - Trivy | Blocking | SARIF / artifact |
| EXT-004 | Repository contains no unexpected exposed secrets | Trivy | Container Security - Trivy | Blocking | SARIF / artifact |
| EXT-005 | Juice Shop image vulnerabilities remain visible | Trivy | Container Security - Trivy | Report-only | JSON artifact |
| EXT-006 | Known Juice Shop DAST findings remain visible | OWASP ZAP | DAST - OWASP ZAP | Baseline-aware | HTML / JSON / Markdown |
| EXT-007 | New unapproved DAST findings fail the scan | OWASP ZAP | DAST - OWASP ZAP | Blocking | Workflow failure + reports |

## Baseline and Evidence References

- `security/baselines/known-findings.yml`
- `security/dast/zap-baseline.conf`
- `security/dast/zap-full.conf`
- `docs/security-testing.md`
- `docs/ci-quality-gates.md`
- `docs/reporting-strategy.md`

## Maintenance

This matrix should be updated when:

- a new test suite is introduced,
- a requirement changes,
- a CI workflow changes,
- a security gate changes,
- a new baseline is approved,
- evidence location changes.
