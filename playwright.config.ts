import path from 'node:path';

import {
  defineConfig,
  devices,
} from '@playwright/test';

const authFile = path.join(
  process.cwd(),
  'playwright',
  '.auth',
  'user.json',
);

export default defineConfig({

  testDir: './tests',

  fullyParallel: false,

  workers: 1,

  retries: process.env.CI ? 1 : 0,

  timeout: 30_000,

  expect: {
    timeout: 10_000,
  },

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'reports/html',
        open: 'never',
      },
    ],
  ],

  use: {
    baseURL:
      process.env.BASE_URL ??
      'http://127.0.0.1:3000',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [

    {
      name: 'setup',

      testMatch:
        '**/*.setup.ts',

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'chromium-anonymous',

      testIgnore: '**/*.setup.ts',

      grepInvert: /@authenticated/,

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'chromium-authenticated',

      testIgnore: '**/*.setup.ts',

      grep: /@authenticated/,

      dependencies: ['setup'],

      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },

  ],

});