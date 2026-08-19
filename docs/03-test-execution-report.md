# Test Execution Report

## 1. Document control

| Field | Value |
|---|---|
| Document ID | TER-001 |
| Version | 1.0 |
| Status | To be completed after execution |
| Execution date | YYYY-MM-DD |
| Executor | Sushank Yerva |

## 2. Execution identification

| Field | Recorded value |
|---|---|
| Repository |  |
| Branch | `main` |
| Commit SHA |  |
| GitHub Actions run ID/URL |  |
| Application image/tag | `bkimminich/juice-shop` — record resolved tag or digest |
| Node.js version |  |
| Playwright version |  |
| Browser/version |  |
| Base URL | `http://127.0.0.1:3000` |

## 3. Commands

```text
npm ci
npx playwright install --with-deps chromium
npx playwright test
```

## 4. Overall result

| Metric | Result |
|---|---|
| Total tests |  |
| Passed |  |
| Failed |  |
| Blocked/interrupted |  |
| Skipped |  |
| Duration |  |
| Overall disposition | Pending |

## 5. Detailed results

Populate this table from the retained Playwright report.

| Test ID | Test name | Project | Result | Duration | Defect/evidence reference |
|---|---|---|---|---|---|
| TC-001 | Juice Shop application is available | `chromium-anonymous` | Not run |  |  |
| TC-002 | Create authenticated Juice Shop session | `setup` | Not run |  |  |
| TC-003 | Invalid credentials are rejected | `chromium-anonymous` | Not run |  |  |
| TC-004 | Anonymous user is presented with login option | `chromium-anonymous` | Not run |  |  |
| TC-005 | Authenticated session is reused | `chromium-authenticated` | Not run |  |  |
| TC-006 | Logout removes authenticated browser state | `chromium-authenticated` | Not run |  |  |
| TC-007 | Normal user cannot access administration page | `chromium-authenticated` | Not run |  |  |

## 6. Deviations

| Deviation ID | Description | Reason | Impact | Approved by |
|---|---|---|---|---|
| None recorded |  |  |  |  |

## 7. Defects

| Defect ID | Summary | Severity | Status | Affected test |
|---|---|---|---|---|
| None recorded |  |  |  |  |

## 8. Evidence inventory

| Evidence ID | Artifact | Location/reference | Retention |
|---|---|---|---|
| EV-001 | Playwright HTML report |  | 14 days or project policy |
| EV-002 | GitHub Actions logs |  | Repository policy |
| EV-003 | Failure screenshots |  | 14 days or project policy |
| EV-004 | Trace/video evidence |  | 14 days or project policy |
| EV-005 | Application container logs |  | As attached to failed run |

## 9. Conclusion

Execution conclusion: **Pending**.

Complete after reviewing the detailed results, deviations and open defects. Do not conclude that the system passed solely because the CI job completed; confirm that the expected tests were discovered and executed under the correct projects.

## 10. Approval

| Role | Name | Decision | Date |
|---|---|---|---|
| Executor | Sushank Yerva | Pending |  |
| Reviewer |  | Pending |  |
