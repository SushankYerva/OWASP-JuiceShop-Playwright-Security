# Architecture

## Overview

This project is an enterprise-style Playwright + TypeScript automation framework targeting OWASP Juice Shop.

It combines Quality Engineering and Application Security automation in one repository.

## High-Level Architecture

```text
                           GitHub Repository
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
          Playwright           Security            Documentation
          Framework            Tooling                 │
              │                   │                   │
      ┌───────┼────────┐     ┌────┼─────┐             │
      │       │        │     │    │     │             │
      ▼       ▼        ▼     ▼    ▼     ▼             ▼
 Functional   API      UI   SAST  SCA   DAST      Strategy/Traceability
      │       │        │     │    │     │
      └───────┼────────┘     └────┼─────┘
              │                   │
              └─────────┬─────────┘
                        ▼
                  GitHub Actions
                        │
                        ▼
                Reports / Artifacts
```

## Repository Structure

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

## Configuration Layer

`config/` contains environment and runtime configuration.

Responsibilities include:

- environment selection,
- base URL handling,
- runtime settings,
- validation,
- paths.

Configuration is kept separate from test implementation.

## Framework Layer

### API Clients

`framework/api/`

Encapsulates reusable REST operations.

Examples:

- authentication,
- products,
- basket.

### Components

`framework/components/`

Contains reusable UI components such as navigation elements.

### Data

`framework/data/`

Contains runtime test-data factories and related helpers.

### Fixtures

`framework/fixtures/`

Provides reusable setup for:

- application pages,
- authenticated browser state,
- API context,
- runtime data.

### Page Objects

`framework/pages/`

Contains:

- locators,
- page actions,
- page-level abstractions.

Tests keep assertions and intent, while Page Objects keep interaction logic.

## Test Layer

### Setup

`tests/setup/`

Creates reusable authenticated state and required session data.

### Functional

`tests/functional/`

Covers:

- authentication,
- products,
- basket,
- checkout,
- account flows.

### API

`tests/api/`

Covers:

- authentication,
- products,
- basket,
- contract validation.

API tests are designed for isolated parallel execution.

### UI

`tests/ui/`

Covers:

- accessibility,
- responsive layouts,
- visual regression,
- navigation.

### Security

`tests/security/`

Covers:

- authentication security,
- authorization,
- session handling,
- security headers,
- input validation,
- API security.

## Authentication Architecture

Authenticated browser tests use Playwright storage state.

```text
Setup project
    ↓
Create/login test user
    ↓
Save browser storage state
    ↓
Capture required Juice Shop sessionStorage
    ↓
Authenticated fixture restores both
```

Runtime authentication artifacts are excluded from Git.

## Parallelism Model

```text
API tests
→ isolated users/state
→ parallel execution

Browser authenticated tests
→ shared setup state
→ sequential execution
```

Browser parallelism can be introduced later by isolating auth and basket state per test/worker.

## Security Architecture

```text
Source / Config
    │
    ├── Semgrep → SAST
    ├── npm audit → SCA
    └── Trivy → vulnerabilities/secrets/misconfiguration

Runtime Target
    │
    └── OWASP ZAP → DAST

Application Behaviour
    │
    └── Playwright → security regression
```

## CI/CD Architecture

```text
Push / Pull Request
        │
        ├── Playwright
        ├── Semgrep
        ├── npm audit
        └── Trivy
              │
              ▼
         CI Gate Result

Scheduled / Manual
        │
        ▼
     OWASP ZAP
        │
        ├── known baseline → report/pass
        └── new finding → fail/review
```

## Evidence Architecture

Generated evidence is stored as GitHub Actions artifacts rather than committed to the repository.

Examples:

- Playwright HTML
- traces
- screenshots
- Semgrep SARIF
- npm audit JSON
- Trivy SARIF
- ZAP reports

## Design Principles

- Reusable abstractions
- Clear test-layer separation
- Dynamic test data
- Minimal hard-coded waits
- Stable locators
- Secrets excluded from Git
- Baseline-aware security testing
- Immutable GitHub Action references where practical
- Explicit CI quality gates
