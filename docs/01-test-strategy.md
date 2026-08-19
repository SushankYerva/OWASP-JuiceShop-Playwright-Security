# Test Strategy

## 1. Document control

| Field | Value |
|---|---|
| Project | Playwright TypeScript Automation Framework |
| Application under test | OWASP Juice Shop (local Docker instance) |
| Document ID | TS-001 |
| Version | 1.0 |
| Status | Draft |
| Author | Sushank Yerva |
| Date | YYYY-MM-DD |

## 2. Purpose

This strategy defines the scope, approach, environments, evidence and acceptance criteria for automated UI and API validation performed with Playwright and TypeScript.

## 3. Objectives

- Confirm that the application is available before dependent tests run.
- Validate anonymous and authenticated user states.
- Confirm rejection of invalid login attempts.
- Verify that authenticated browser state can be saved and reused.
- Verify logout behaviour and removal of client-side authentication state.
- Validate role-based access behaviour for a normal authenticated user.
- Produce repeatable local and CI execution evidence.

## 4. Scope

### In scope

- Application availability
- Startup overlay handling
- User creation for isolated test execution
- UI login and authenticated session setup
- Anonymous navigation state
- Invalid-login behaviour
- Authenticated session reuse
- Logout behaviour
- Normal-user administration-page access behaviour
- Chromium execution
- GitHub Actions execution
- HTML reports, traces, screenshots and videos where configured

### Out of scope

- Production systems or third-party environments
- Load, stress and performance testing
- Cross-browser certification beyond configured projects
- Mobile-device validation
- Destructive testing
- IDOR testing
- Manual penetration testing
- Formal regulatory approval of the target application

## 5. Test approach

The framework uses Playwright projects to separate execution states:

| Project | Purpose |
|---|---|
| `setup` | Creates a test user, authenticates and saves browser state |
| `chromium-anonymous` | Runs tests without stored authentication |
| `chromium-authenticated` | Loads saved authentication state and runs authenticated tests |

Tests use accessible roles and names where stable. Test IDs or CSS locators are used only when the application does not expose a reliable accessible locator.

Each test receives an isolated browser context. Test data is generated dynamically to reduce conflicts between runs.

## 6. Environment

| Component | Configuration |
|---|---|
| Operating system | Windows locally; Ubuntu runner in CI |
| Runtime | Node.js 20 or repository-defined supported version |
| Test framework | `@playwright/test` |
| Language | TypeScript |
| Browser | Chromium |
| Application | Docker container bound to `127.0.0.1:3000` |
| CI | GitHub Actions |

Exact dependency versions are controlled by `package-lock.json`.

## 7. Entry criteria

- Docker is installed and running.
- Project dependencies are installed with `npm ci` or `npm install`.
- Playwright Chromium dependencies are installed.
- The application responds at the configured `baseURL`.
- The authentication-state directory can be created.
- The test suite is discoverable with `npx playwright test --list`.

## 8. Exit criteria

- All planned requirements have at least one mapped test or a documented justification.
- All planned tests have been executed locally or in CI.
- No unresolved Critical or High defects remain for the validated scope.
- Failed tests have evidence and an assigned disposition.
- The traceability matrix and execution report reflect the final run.
- The validation summary is approved.

## 9. Pass and fail criteria

- **Pass:** All defined assertions complete successfully.
- **Fail:** At least one assertion fails or the test cannot complete because of application behaviour.
- **Blocked:** Execution cannot begin or finish because of an environmental or dependency issue.
- **Not run:** The test was not included in the recorded execution.

A test that passes because it contains no meaningful assertion is not acceptable.

## 10. Evidence

The following evidence should be retained:

- Git commit SHA
- GitHub Actions workflow run URL or run ID
- Playwright HTML report
- Console/list reporter output
- Screenshots for failures
- Trace files for configured retries/failures
- Videos where configured
- Relevant Docker application logs for environmental failures

Authentication-state files must not be committed or attached to reports.

## 11. Risks and controls

| Risk | Impact | Control |
|---|---|---|
| Dynamic UI overlays block actions | False failures | Centralized overlay-handling utility and specific locators |
| Weak locators match the wrong element | False results | Prefer exact accessible role and name |
| Authentication saved before login completes | Invalid authenticated tests | Verify token and authenticated menu state before saving state |
| Tests run in the wrong project | Invalid execution context | Project filters and execution tags |
| Container is not ready | Setup failures | CI readiness check before test execution |
| Sensitive session state committed | Credential exposure | Ignore `playwright/.auth/` and review staged files |
| Dependency drift | Non-repeatable results | Commit and use `package-lock.json` with `npm ci` |

## 12. Responsibilities

| Role | Responsibility |
|---|---|
| Test author | Implement and review tests and documentation |
| Executor | Run the approved suite and retain evidence |
| Reviewer | Verify requirements, results and defect disposition |
| Approver | Accept or reject the validation conclusion |

## 13. Approval

| Role | Name | Decision | Date |
|---|---|---|---|
| Author | Sushank Yerva | Prepared | YYYY-MM-DD |
| Reviewer |  | Pending |  |
| Approver |  | Pending |  |
