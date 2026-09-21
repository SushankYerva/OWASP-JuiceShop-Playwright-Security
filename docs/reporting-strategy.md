# Reporting and Evidence Strategy

## Purpose

This document defines how automated test and security evidence is generated, retained and reviewed.

## Objectives

The reporting model should:

- provide evidence for failed and successful CI runs,
- separate generated artifacts from source-controlled configuration,
- make security findings reviewable,
- support recruiter/engineer review through GitHub,
- avoid committing sensitive runtime data.

## Evidence Sources

| Area | Tool | Evidence |
| --- | --- | --- |
| Functional/API/UI | Playwright | HTML report, traces, screenshots |
| Visual regression | Playwright | expected/actual/diff images |
| Accessibility | Axe + Playwright | test output / report |
| SAST | Semgrep | SARIF |
| SCA | npm audit | JSON |
| Repository security | Trivy | SARIF |
| Container security | Trivy | JSON |
| DAST | OWASP ZAP | HTML, JSON, Markdown, console log |

## Artifact Retention

Generated reports should be uploaded by GitHub Actions and retained for an appropriate period.

They should not normally be committed to Git.

## Source-Controlled Evidence

The repository should commit only stable policy/configuration evidence such as:

- baseline configuration,
- findings register,
- test strategy,
- traceability matrix,
- architecture documentation,
- CI quality-gate documentation.

## Sensitive Data

The following should never be retained as public CI artifacts unless explicitly sanitized:

- passwords,
- access tokens,
- cookies,
- authentication state,
- `.env` files,
- raw secrets.

## Failure Evidence

For failed Playwright tests, retain where available:

- trace,
- screenshot,
- HTML report.

For failed security scans, retain scanner reports even when the gate fails.

## GitHub Visibility

The README should link or point to:

- workflow badges,
- documentation,
- baseline strategy,
- test coverage,
- security tooling.

## Review Workflow

```text
CI run
→ artifact produced
→ gate result
→ reviewer opens evidence
→ classify issue
→ fix / accept / baseline
```

## Reporting Principle

Generated reports demonstrate execution.

Committed documentation explains intent, policy and architecture.

Both are required for a credible automation portfolio.
