const isCI = Boolean(process.env.CI);

export const runtimeConfig = {
  isCI,

  // Timeouts
  testTimeoutMs: 30_000,
  expectTimeoutMs: 5_000,

  // Retry failed tests only in CI
  retries: isCI ? 2 : 0,

  // Start conservatively in CI.
  // We can increase this after proving all tests are isolated.
  workers: isCI ? 1 : undefined,

  // Prevent accidental test.only from reaching CI
  forbidOnly: isCI,

  // Failure diagnostics
  trace: isCI
    ? ('on-first-retry' as const)
    : ('retain-on-failure' as const),

  screenshot: 'only-on-failure' as const,

  video: isCI
    ? ('retain-on-failure' as const)
    : ('off' as const),
};