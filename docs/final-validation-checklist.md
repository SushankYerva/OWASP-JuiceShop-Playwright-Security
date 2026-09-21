# Final Validation Checklist

## Repository

- [ ] Repository structure is clean and understandable.
- [ ] Generated reports are excluded from Git.
- [ ] `.env` files are excluded.
- [ ] `playwright/.auth/` is excluded.
- [ ] `node_modules/` is excluded.
- [ ] Test results and Playwright reports are excluded.
- [ ] No credentials or tokens are committed.

## TypeScript and Playwright

- [ ] `npx tsc --noEmit` passes.
- [ ] API tests pass.
- [ ] Chromium tests pass.
- [ ] Security tests pass.
- [ ] Visual baselines are intentional and reviewed.
- [ ] Accessibility baselines are documented.

## Security Tooling

- [ ] Semgrep has zero blocking findings.
- [ ] npm audit has no High/Critical vulnerabilities.
- [ ] Trivy framework scan has no High/Critical applicable findings.
- [ ] Trivy has no unexpected secret findings.
- [ ] Juice Shop image scan is report-only.
- [ ] ZAP full scan passes with approved baseline.
- [ ] New ZAP warnings fail the DAST gate.

## GitHub Actions

- [ ] Playwright workflow is green.
- [ ] SAST workflow is green.
- [ ] SCA workflow is green.
- [ ] Trivy workflow is green.
- [ ] DAST workflow is green.
- [ ] Third-party Actions are SHA-pinned where practical.
- [ ] Dependabot configuration is present.
- [ ] Workflow concurrency is configured.

## Documentation

- [ ] `docs/test-strategy.md`
- [ ] `docs/traceability-matrix.md`
- [ ] `docs/security-testing.md`
- [ ] `docs/ci-quality-gates.md`
- [ ] `docs/architecture.md`
- [ ] `docs/findings.md`
- [ ] `docs/reporting-strategy.md`
- [ ] `security/README.md`
- [ ] `security/baselines/README.md`
- [ ] `security/baselines/known-findings.yml`

## README

- [ ] Project purpose is clear.
- [ ] Architecture is explained.
- [ ] Test coverage is visible.
- [ ] Security tooling is visible.
- [ ] CI badges render.
- [ ] Local setup instructions are accurate.
- [ ] Security baseline strategy is explained.
- [ ] Reports/artifacts are explained.
- [ ] Limitations are documented.

## Final Git Check

Run:

```powershell
git status
git ls-files | Select-String "\.env|playwright/.auth|test-results|playwright-report|security/reports"
```

Only intentionally tracked files should appear.

## Release

- [ ] Final commit created.
- [ ] Main branch is green.
- [ ] Repository description/topics updated.
- [ ] Optional release/tag created.
