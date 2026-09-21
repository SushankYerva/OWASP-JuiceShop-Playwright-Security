# Security Findings Register

## Purpose

This document provides a human-readable summary of known security findings observed during automated testing.

Machine-enforced baselines remain authoritative for CI behaviour.

Primary baseline files:

- `security/baselines/known-findings.yml`
- `security/dast/zap-baseline.conf`
- `security/dast/zap-full.conf`

## Classification

| Classification | Meaning |
| --- | --- |
| Framework regression | Finding introduced by this automation repository |
| Known target vulnerability | Expected vulnerability in OWASP Juice Shop |
| New target finding | Finding not currently approved in baseline |
| False positive | Confirmed scanner misclassification |
| Informational | Security-relevant observation without direct defect status |

## Playwright Security Findings

| ID | Finding | Classification | Status |
| --- | --- | --- | --- |
| PW-SEC-001 | Complex input can cause HTTP 500 | Known target vulnerability | Documented |
| PW-SEC-002 | HTML-like search input can be interpreted by the DOM | Known target vulnerability | Documented |
| PW-SEC-003 | Unsupported HTTP method can return HTTP 500 | Known target vulnerability | Documented |
| PW-SEC-004 | CSP, Referrer-Policy and Permissions-Policy are missing | Known target vulnerability | Documented |
| PW-SEC-005 | Permissive CORS behaviour observed | Known target vulnerability | Documented |

## OWASP ZAP Full Scan Findings

### Summary

| Severity | Alert Types |
| --- | ---: |
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Informational | 5 |

### Medium

| Rule ID | Alert | Status |
| --- | --- | --- |
| 10095 | Backup File Disclosure | Baselined |
| 40038 | Bypassing 403 | Baselined |
| 40040 | CORS Misconfiguration | Baselined |
| 10038 | Content Security Policy Header Not Set | Baselined |
| 10098 | Cross-Domain Misconfiguration | Baselined |

### Low

| Rule ID | Alert | Status |
| --- | --- | --- |
| 90004 | Cross-Origin-Embedder/Opener Policy Header Missing or Invalid | Baselined |
| 10110 | Dangerous JS Functions | Baselined |
| 10063 | Deprecated Feature Policy Header Set | Baselined |
| 10096 | Timestamp Disclosure - Unix | Baselined |

### Informational

| Rule ID | Alert | Status |
| --- | --- | --- |
| 10109 | Modern Web Application | Informational |
| 10049 | Cacheability-related findings | Informational |
| 10104 | User Agent Fuzzer | Informational |

## SAST Baseline

Current expected Semgrep baseline:

```text
0 blocking findings
```

Previously detected issues such as mutable GitHub Action references and dynamic regular expression construction were remediated rather than suppressed.

## SCA Baseline

Current expected npm audit baseline:

```text
0 known vulnerabilities
```

High and Critical dependency vulnerabilities are blocking.

## Trivy Framework Baseline

Expected framework state:

```text
High/Critical vulnerabilities = 0
Unexpected secrets            = 0
```

## Juice Shop Container Findings

Juice Shop image findings are retained as report-only evidence.

They do not represent defects in the automation framework.

## Review Policy

A new finding must not be added to a baseline automatically.

Required workflow:

```text
Detect
→ investigate
→ classify
→ assess impact
→ document
→ approve
→ baseline if justified
```

## Evidence

Full scanner output is retained through GitHub Actions artifacts rather than committed to the repository.
