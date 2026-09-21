# Test Strategy

## OWASP Juice Shop Playwright Security Automation Framework

---

## 1. Document Purpose

This document defines the test strategy for the **OWASP Juice Shop Playwright Security Automation Framework**.

The project demonstrates an enterprise-style Quality Engineering and Application Security automation solution using **Playwright and TypeScript** against OWASP Juice Shop.

The strategy combines functional, API, contract, UI, accessibility, visual, security and DevSecOps testing within a single automated framework and GitHub Actions pipeline.

The framework is designed to demonstrate:

- maintainable test architecture,
- reusable automation components,
- isolated API testing,
- browser-based functional testing,
- automated security regression testing,
- SAST,
- SCA,
- repository and container scanning,
- DAST,
- CI/CD quality gates,
- security baselining,
- and auditable test evidence.

OWASP Juice Shop is intentionally vulnerable. The objective of this project is therefore **not to make the target application appear vulnerability-free**.

Instead, the framework distinguishes between:

1. defects or regressions in the automation framework,
2. expected vulnerabilities intentionally present in OWASP Juice Shop,
3. new or unexpected security findings,
4. false positives,
5. informational security observations.

---

## 2. Project Objectives

The main objectives of the framework are to:

- Validate critical end-user business workflows.
- Validate REST API behaviour independently from the browser.
- Detect API contract regressions.
- Validate important user-interface behaviour.
- Verify representative responsive layouts.
- Detect visual regressions on stable application screens.
- Perform automated accessibility checks.
- Validate authentication and authorization controls.
- Validate logout and session behaviour.
- Verify malformed or tampered authentication data is rejected.
- Assess HTTP security headers.
- Assess API and UI input handling.
- Evaluate selected API security controls.
- Detect insecure coding and CI/CD patterns.
- Detect vulnerable project dependencies.
- Detect secrets and repository misconfigurations.
- Assess the Juice Shop container image.
- Perform passive and active runtime security scanning.
- Integrate test and security controls into GitHub Actions.
- Produce reproducible test evidence and security reports.
- Maintain known-vulnerability baselines without silently suppressing findings.

---

## 3. System Under Test

### 3.1 Application

**OWASP Juice Shop**

OWASP Juice Shop is used as the System Under Test because it provides:

- a modern Single Page Application,
- REST APIs,
- authentication,
- user accounts,
- products,
- basket functionality,
- checkout flows,
- administrative functionality,
- and intentionally vulnerable application behaviour suitable for security automation.

### 3.2 Application Type

The application consists primarily of:

- browser-based SPA functionality,
- REST APIs,
- client-side state,
- authenticated and unauthenticated workflows.

### 3.3 Local Test URL

Typical local execution:

```text
http://localhost:3000
```

### 3.4 CI Environment

GitHub Actions creates or connects to disposable test environments as required.

Security scans such as OWASP ZAP are executed against a controlled Juice Shop instance created specifically for the workflow.

---

## 4. Test Scope

| Test Area | Included |
| --- | --- |
| Functional browser testing | Yes |
| REST API testing | Yes |
| API contract validation | Yes |
| Authentication testing | Yes |
| Authorization testing | Yes |
| Session security testing | Yes |
| UI testing | Yes |
| Responsive testing | Yes |
| Accessibility testing | Yes |
| Visual regression testing | Yes |
| Input validation testing | Yes |
| HTTP security testing | Yes |
| API security controls | Yes |
| SAST | Yes |
| SCA | Yes |
| Secret scanning | Yes |
| Repository misconfiguration scanning | Yes |
| Container vulnerability scanning | Yes |
| DAST | Yes |
| CI/CD quality gates | Yes |
| Manual penetration testing | No |
| Performance/load testing | No |
| Full WCAG certification | No |
| Native mobile application testing | No |

---

## 5. Technology Stack

| Area | Technology |
| --- | --- |
| Automation Framework | Playwright |
| Programming Language | TypeScript |
| Test Runner | Playwright Test |
| API Testing | Playwright APIRequestContext |
| Contract Validation | Zod |
| Accessibility | axe-core / Playwright |
| Visual Regression | Playwright screenshot comparison |
| SAST | Semgrep |
| SCA | npm audit |
| Dependency Management | npm |
| Dependency Updates | Dependabot |
| Repository Security | Trivy |
| Secret Scanning | Trivy |
| Container Security | Trivy |
| DAST | OWASP ZAP |
| CI/CD | GitHub Actions |
| Application Runtime | Docker |
| Source Control | Git / GitHub |

---

## 6. Framework Architecture

```text
config/
framework/
    api/
    components/
    data/
    fixtures/
    helpers/
    pages/
    utils/

tests/
    setup/
    functional/
    api/
    ui/
    security/

security/
    sast/
    sca/
    container/
    dast/
    baselines/
    reports/

docs/

.github/
    workflows/
```

### 6.1 Design Principles

- Tests describe behaviour and contain assertions.
- Page Objects contain page-level locators and interactions.
- Components represent reusable UI elements.
- API clients encapsulate reusable REST operations.
- Fixtures manage browser, API and authentication setup.
- Test-data factories generate runtime test data.
- Configuration is centralized.
- Environment-specific values are not hard-coded into tests.
- Secrets are excluded from source control.
- Generated reports are excluded from source control.
- Stable semantic locators are preferred.
- Arbitrary fixed delays are avoided.
- Tests should be deterministic and repeatable.
- Security findings must not be hidden simply to produce a green CI pipeline.

---

## 7. Functional Testing Strategy

Functional browser tests validate critical user workflows.

### Authentication
- User registration.
- Valid login.
- Invalid login.

### Products
- Product search.
- Exact product identification.
- Product selection.

### Basket
- Add product to basket.
- Verify basket contents.
- Increase quantity.
- Decrease quantity.
- Remove product.

### Checkout
- Navigate through checkout.
- Create/select delivery address.
- Create/select payment method.
- Complete order placement.

Functional tests focus on externally visible behaviour rather than internal implementation details.

---

## 8. API Testing Strategy

API tests validate backend behaviour independently from the browser UI.

Current coverage includes:

- User registration.
- Authentication.
- Authentication failures.
- Product catalogue retrieval.
- Product searching.
- Basket retrieval.
- Add basket item.
- Update basket item.
- Delete basket item.
- Negative authentication scenarios.
- API response validation.
- Contract testing.

### 8.1 API Isolation

API tests dynamically create isolated users where possible. Each authenticated API test can receive a unique user, authentication token and basket identifier. This avoids shared mutable state and supports parallel execution.

### 8.2 API Parallelism

Current validated execution supports approximately:

```text
workers = 4
```

Parallelism should only be increased after validating test-data isolation and application capacity.

---

## 9. Contract Testing Strategy

API contracts are validated using **Zod**.

Contract coverage includes:

- authentication responses,
- product responses,
- product collections,
- basket responses.

Contracts validate important stable fields rather than every response property. This reduces unnecessary brittleness while still detecting breaking API changes.

---

## 10. UI Testing Strategy

UI-specific tests are separate from functional business-flow testing and focus on presentation, accessibility and responsiveness.

### 10.1 Accessibility Testing

Accessibility checks use `@axe-core/playwright`. Automated checks focus primarily on serious and critical findings. Known findings may be baselined by rule identifier and expected node count so that new violations or increases can still fail the test.

Automated Axe scanning does **not** represent full WCAG certification.

### 10.2 Responsive Testing

Representative viewport coverage includes desktop, mobile and tablet.

Responsive tests verify:

- important application content remains accessible,
- mobile-specific navigation works,
- desktop-only controls are appropriately hidden,
- significant horizontal overflow does not occur,
- key pages remain usable.

### 10.3 Visual Regression Testing

Playwright screenshot comparison is used for representative stable screens:

- product catalogue,
- login page,
- basket page.

Visual baselines may be platform-specific where Windows and Linux rendering differs. Baselines must only be updated after reviewing expected, actual and diff images.

---

## 11. Security Regression Testing

Playwright is used to verify deterministic security-related application behaviour, but it is not treated as a replacement for dedicated security scanners.

### 11.1 Authentication Security

Coverage includes invalid credential rejection, protection against unauthenticated API access and malformed authentication data.

### 11.2 Authorization Security

Coverage includes non-admin role validation and denial of privileged administration functionality. The security property is access denial, not necessarily URL redirection.

### 11.3 Session Security

Coverage includes authentication state before logout, token removal after logout, persistence of logged-out state after reload, and rejection of tampered tokens.

### 11.4 Security Headers

Current regression-protected headers include `X-Content-Type-Options` and `X-Frame-Options`. Known missing protections such as CSP, Referrer-Policy and Permissions-Policy are documented as target findings rather than being silently ignored.

### 11.5 Input Validation

Input-validation tests assess benign special characters, complex input, oversized input, HTML-like input and unsupported request forms. Known insecure behaviour is recorded as a target finding instead of weakening tests to make an intentionally vulnerable application appear secure.

### 11.6 API Security Controls

Coverage includes malformed Bearer token rejection, authentication enforcement, unsupported HTTP method handling and CORS behaviour.

---

## 12. Static Application Security Testing

Semgrep performs SAST across TypeScript, JavaScript, YAML and GitHub Actions configuration.

Policy:

```text
Blocking Semgrep finding
→ CI FAIL
```

The expected framework baseline is zero blocking findings.

Previous findings such as mutable GitHub Actions tags and dynamic regular-expression construction were remediated rather than suppressed.

---

## 13. Software Composition Analysis

SCA is performed using `npm audit`.

| Severity | CI Behaviour |
| --- | --- |
| Critical | Fail |
| High | Fail |
| Moderate | Report |
| Low | Report |

The current expected dependency baseline is zero known vulnerabilities. Dependabot monitors dependency updates.

---

## 14. Supply Chain Security

GitHub Actions are pinned to immutable commit SHAs where practical. Dependabot monitors GitHub Actions and npm dependencies and creates update pull requests. This reduces risk from silently moved version tags while keeping dependencies maintainable.

---

## 15. Repository Security with Trivy

Trivy scans the automation framework for dependency vulnerabilities, secrets and security misconfiguration. Runtime/generated directories such as `node_modules/`, `playwright/.auth/`, `test-results/` and `playwright-report/` are excluded where appropriate.

Framework policy:

```text
High/Critical Trivy finding
→ CI FAIL
```

Expected baseline:

```text
High/Critical vulnerabilities = 0
Detected secrets              = 0
```

---

## 16. Container Security

Trivy separately scans the OWASP Juice Shop container image. Because Juice Shop is intentionally vulnerable, its container findings are **report only** and are not presented as vulnerabilities introduced by the Playwright framework.

---

## 17. Dynamic Application Security Testing

OWASP ZAP performs DAST against a controlled Juice Shop environment.

### 17.1 Passive Scan

The baseline scan crawls the application and runs passive rules without actively attacking the target.

### 17.2 Full Active Scan

The full scan performs active runtime security testing against a disposable Juice Shop instance. The authoritative active scan runs in GitHub Actions for reproducibility and evidence retention.

### 17.3 ZAP Baseline Policy

Known Juice Shop alerts are configured in:

```text
security/dast/zap-baseline.conf
security/dast/zap-full.conf
```

Known findings are downgraded to informational status so they remain visible. New unapproved ZAP rules can fail CI.

Known finding categories include:

- Backup File Disclosure,
- Bypassing 403,
- CORS Misconfiguration,
- missing Content Security Policy,
- Cross-Domain Misconfiguration,
- missing cross-origin isolation headers,
- dangerous JavaScript functions,
- deprecated Feature Policy usage,
- timestamp disclosure.

---

## 18. Test Data Strategy

Dynamic test data is preferred. Generated users follow patterns such as:

```text
playwright.<unique-id>@test.local
```

Fixed credentials, if required, must be supplied through environment variables, GitHub secrets or an approved external secret-management mechanism. Credentials must never be hard-coded into committed source code.

---

## 19. Authentication State Strategy

Authenticated browser tests use Playwright storage state. Runtime authentication files are stored under `playwright/.auth/` and excluded from Git. Juice Shop session state such as the basket identifier is restored from session storage where required.

---

## 20. Test Isolation Strategy

### API

API tests use independently generated users and isolated authentication state and can run in parallel, typically with four workers.

### Browser

Some authenticated browser workflows currently reuse setup-generated state. To avoid basket and checkout interference, browser tests run sequentially with one worker.

A future enhancement is to provide isolated authenticated browser state per test or worker.

---

## 21. Environment Strategy

Configuration is centralized under `config/` and supports local, CI and staging concepts. Production is intentionally excluded from destructive automated security testing.

---

## 22. Browser Strategy

Chromium is the primary CI browser. Firefox and WebKit may be introduced later if cross-browser certification becomes a requirement.

---

## 23. CI/CD Strategy

GitHub Actions provides the CI/CD execution platform.

Current workflows include:

- Playwright Tests,
- SAST - Semgrep,
- SCA - Dependency Security,
- Container Security - Trivy,
- DAST - OWASP ZAP.

### 23.1 Playwright Workflow

Runs functional, API, contract, UI, accessibility, responsive, visual and security regression tests. Unexpected failures are blocking.

### 23.2 Semgrep Workflow

Performs static code and workflow analysis. Blocking findings fail CI.

### 23.3 SCA Workflow

Performs npm auditing and dependency review. High and Critical dependency vulnerabilities fail CI.

### 23.4 Trivy Workflow

Scans the framework for vulnerabilities, secrets and misconfiguration. Framework High/Critical findings are blocking; Juice Shop container findings are report-only.

### 23.5 ZAP Workflow

Performs runtime DAST on controlled triggers such as manual execution, schedules or DAST configuration changes. Known findings are baselined and new findings can fail the workflow.

---

## 24. Workflow Concurrency

GitHub Actions uses concurrency controls so superseded workflow runs can be cancelled. This reduces unnecessary execution during active development and Dependabot updates.

---

## 25. Dependabot Strategy

Dependabot monitors npm dependencies and GitHub Actions dependencies. GitHub Actions-only dependency changes do not necessarily require the entire Playwright browser suite, while npm changes should still execute relevant framework testing.

---

## 26. Quality and Security Gates

| Gate | Tool | Failure Policy |
| --- | --- | --- |
| Functional Regression | Playwright | Unexpected test failure |
| API Regression | Playwright | Unexpected test failure |
| UI Regression | Playwright | Unexpected test failure |
| Security Regression | Playwright | Expected control failure |
| SAST | Semgrep | Blocking finding |
| SCA | npm audit | High/Critical vulnerability |
| Repository Security | Trivy | High/Critical framework finding |
| Secret Detection | Trivy | High/Critical applicable finding |
| DAST | OWASP ZAP | New unapproved security finding |

---

## 27. Known Vulnerability Policy

Findings are classified as:

1. **Framework Regression** — introduced by automation code, configuration, dependencies or CI/CD; can fail CI.
2. **Known Target Vulnerability** — intentionally present in Juice Shop; remains visible and may be baselined.
3. **New Target Finding** — not in the approved baseline; requires review.
4. **False Positive** — confirmed not to represent the reported risk; must be documented before suppression.
5. **Informational Observation** — security-relevant information that does not necessarily represent a vulnerability.

---

## 28. Baseline Management

Security baselines are maintained under:

```text
security/baselines/
security/dast/
```

The central register is:

```text
security/baselines/known-findings.yml
```

Required process:

```text
Finding detected
→ investigate
→ classify
→ determine whether expected
→ document decision
→ update baseline only if approved
```

A baseline must never be changed simply because a security workflow is red.

---

## 29. Reporting and Evidence

GitHub Actions produces evidence including:

### Playwright
- HTML reports,
- screenshots,
- traces,
- videos where configured.

### Semgrep
- SARIF report.

### npm audit
- JSON report.

### Trivy
- SARIF framework report,
- JSON container report.

### OWASP ZAP
- HTML report,
- JSON report,
- Markdown report,
- console log.

Generated reports are excluded from Git and retained as workflow artifacts instead.

---

## 30. Source Control Security

The following must not be committed:

```text
.env
playwright/.auth/user.json
playwright/.auth/session.json
node_modules/
test-results/
playwright-report/
generated security reports
```

---

## 31. Entry Criteria

Testing can begin when:

- the target environment is reachable,
- required project dependencies are installed,
- Playwright browser dependencies are installed,
- configuration validation succeeds,
- required runtime credentials are available,
- Docker is available where required,
- necessary application services are running.

For CI-based ZAP scanning, Juice Shop must start successfully, the ZAP container must reach the target and report directories must be writable.

---

## 32. Exit Criteria

A framework change is considered successfully validated when applicable checks satisfy the following:

- TypeScript compilation succeeds.
- Required functional tests pass.
- Required API tests pass.
- Required UI tests pass.
- Required security regression tests pass.
- Semgrep has no blocking findings.
- npm audit contains no High/Critical findings.
- Trivy framework gate passes.
- No unexpected secrets are detected.
- ZAP has no new unapproved findings.
- Required reports are generated.
- No sensitive runtime artifacts are committed.

---

## 33. Failure Classification

Possible failure categories include:

- application defect,
- automation defect,
- test-data issue,
- environment issue,
- known target vulnerability,
- new security finding,
- false positive,
- CI infrastructure failure,
- visual rendering difference,
- scanner/tooling issue.

---

## 34. Failure Investigation Principles

- Do not immediately add retries to hide instability.
- Do not increase visual tolerances without inspecting differences.
- Do not disable accessibility rules without understanding the finding.
- Do not weaken secure-behaviour expectations simply to make a vulnerable application pass.
- Do not suppress SAST findings before triage.
- Do not baseline security findings before review.
- Do not use mutable container/action references where reproducibility matters.
- Do not assume URL redirection is required for authorization if access is otherwise denied.

---

## 35. Test Maintenance Strategy

Maintainability is prioritised through reusable Page Objects, UI components, API clients, fixtures, centralized configuration, generated data and stable locators.

Preferred locator strategies include accessible roles, accessible names, exact stable text and stable application attributes where necessary.

Avoid brittle DOM traversal, arbitrary sleeps, unnecessarily complex selectors, dynamic regex patterns derived from untrusted values and assertions tied to irrelevant implementation details.

---

## 36. Risk-Based Testing Priorities

Highest-priority areas are:

### Critical User Flows
- authentication,
- basket operations,
- checkout.

### Security Boundaries
- authentication,
- authorization,
- session handling,
- protected APIs.

### API Contracts
- authentication responses,
- product responses,
- basket responses.

### CI Security
- repository vulnerabilities,
- dependency vulnerabilities,
- workflow security,
- secrets.

### Runtime Security
- HTTP security configuration,
- CORS,
- exposed files,
- access-control weaknesses,
- DAST findings.

---

## 37. Test Execution Principles

Examples:

```bash
npx playwright test --project=api
```

```bash
npx playwright test --project=chromium --workers=1
```

```bash
npm run test:security
```

```bash
npm run security:sca
```

```bash
npx tsc --noEmit
```

Security scanners should be independently executable from Playwright.

---

## 38. Local vs CI Execution

Suitable for local execution:

- Playwright,
- TypeScript validation,
- Semgrep,
- npm audit,
- Trivy.

OWASP ZAP full active scanning is CI-authoritative because GitHub's Linux environment provides a stable disposable Docker environment and retains security evidence centrally.

---

## 39. Current Limitations

- Browser tests currently run sequentially because some authenticated workflows reuse setup-generated state.
- Chromium is currently the primary browser.
- Automated Axe testing does not replace manual accessibility assessment.
- Current ZAP scans are primarily unauthenticated unless authenticated scanning is later implemented.
- Performance/load testing is outside current scope.
- Automated security checks do not replace professional penetration testing.

---

## 40. Out of Scope

The framework does not currently provide:

- full manual penetration testing,
- exploit development,
- complete security certification,
- complete WCAG certification,
- production destructive testing,
- load/stress testing,
- native mobile application testing,
- full cross-browser certification,
- full compliance certification.

---

## 41. Future Enhancements

Potential improvements include:

- isolated browser authentication state per test,
- fully parallel browser execution,
- Firefox support,
- WebKit support,
- authenticated OWASP ZAP scanning,
- performance testing,
- additional API contract coverage,
- centralized dashboarding,
- historical trend reporting,
- automated traceability generation,
- enhanced security finding trend analysis,
- additional CI environments,
- automatic test-environment provisioning,
- richer GitHub Security integration.

---

## 42. Documentation References

Supporting documentation includes:

```text
docs/test-strategy.md
docs/security-testing.md
docs/ci-quality-gates.md
docs/traceability-matrix.md
docs/architecture.md
docs/findings.md
```

Security documentation includes:

```text
security/README.md
security/baselines/README.md
security/baselines/known-findings.yml
security/dast/README.md
security/dast/zap-baseline.conf
security/dast/zap-full.conf
```

---

## 43. Test Strategy Summary

The project combines Quality Engineering and Application Security within a single automation framework.

```text
                  Application Change
                         │
                         ▼
                 Automated Validation
                         │
        ┌────────────────┼─────────────────┐
        │                │                 │
        ▼                ▼                 ▼
   Playwright         Semgrep          npm audit
        │                │                 │
 Functional/API/      SAST            Dependency
 UI/Security          Gate              Gate
        │                │                 │
        └────────────────┼─────────────────┘
                         │
                         ▼
                       Trivy
                         │
               Framework Security
                         │
                         ▼
                   CI Gate Result


              Scheduled / Controlled
                       │
                       ▼
                   OWASP ZAP
                       │
                       ▼
               Runtime DAST Scan
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
      Known Baseline        New Finding
             │                   │
             ▼                   ▼
          Report              CI Failure
```

The framework is designed so that a green pipeline represents more than functional correctness. It demonstrates that business functionality, APIs, UI behaviour, security controls, source code, dependencies, repository configuration and runtime security have all been assessed through automated controls.

The central principle of the strategy is:

> **Do not hide known vulnerabilities, and do not weaken tests simply to make the pipeline green. Classify, document, baseline and gate security findings according to their actual context.**
