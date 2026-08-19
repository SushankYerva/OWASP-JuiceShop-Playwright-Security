# Requirements Traceability Matrix

## Document control

| Field | Value |
|---|---|
| Document ID | RTM-001 |
| Version | 1.0 |
| Status | Draft |
| Date | YYYY-MM-DD |

## Traceability matrix

Update the test paths if your repository structure differs.

| Requirement ID | Requirement | Risk | Automated test | Project | Evidence/result |
|---|---|---|---|---|---|
| REQ-AVAIL-001 | The application shall load and display the product catalogue. | Medium | `tests/application-availability.spec.ts` | `chromium-anonymous` | Pending execution |
| REQ-UI-001 | Startup overlays shall be handled before dependent UI interactions. | Medium | Covered through `appPage` fixture and setup execution | Applicable projects | Pending execution |
| REQ-AUTH-001 | A newly created valid user shall be able to authenticate. | High | `tests/setup/auth.setup.ts` | `setup` | Pending execution |
| REQ-AUTH-002 | Invalid credentials shall not create an authenticated browser state. | High | `tests/security/authentication/invalid-login.spec.ts` | `chromium-anonymous` | Pending execution |
| REQ-AUTH-003 | An anonymous user shall be presented with the login option and not logout. | Medium | `tests/security/authentication/anonymous-access.spec.ts` | `chromium-anonymous` | Pending execution |
| REQ-AUTH-004 | A valid authenticated state shall be reusable in a new browser context. | High | `tests/security/authentication/session.spec.ts` | `chromium-authenticated` | Pending execution |
| REQ-AUTH-005 | Logout shall remove the authenticated client state and restore anonymous navigation. | High | `tests/security/authentication/logout.spec.ts` | `chromium-authenticated` | Pending execution |
| REQ-AUTHZ-001 | A normal authenticated user shall not receive administrator functionality. | High | `tests/security/authorization/admin-access.spec.ts` | `chromium-authenticated` | Pending execution |
| REQ-CI-001 | The complete suite shall run automatically on pushes and pull requests to `main`. | Medium | `.github/workflows/playwright.yml` | GitHub Actions | Pending workflow run |
| REQ-EVID-001 | Automated execution shall produce a retained HTML report. | Medium | Reporter configuration and artifact-upload step | GitHub Actions | Pending workflow run |
| REQ-EVID-002 | Failed execution shall retain configured diagnostic evidence. | Medium | Screenshot, trace, video and artifact configuration | GitHub Actions | Pending failure-path verification |
| REQ-DATA-001 | Generated authentication-state files shall not be committed to source control. | High | `.gitignore` review | Repository | Pending repository review |

## Coverage summary

| Metric | Value |
|---|---|
| Total requirements | 12 |
| Requirements mapped to automated tests/configuration | 12 |
| Requirements with recorded passing evidence | 0 until updated after execution |
| Unmapped requirements | 0 |

## Review notes

- Replace `Pending execution` only after examining the matching report or workflow artifact.
- A mapped test does not prove that the requirement passed.
- Record deviations and exclusions in the validation summary.
