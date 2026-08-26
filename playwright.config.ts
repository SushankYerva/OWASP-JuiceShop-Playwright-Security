import { runtimeConfig } from './config/runtime';
import path from 'node:path';
import { validateConfiguration } from './config/validation';

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
const environment = validateConfiguration();
export default defineConfig({

  testDir: './tests',

  timeout: runtimeConfig.testTimeoutMs,

  expect: {
    timeout: runtimeConfig.expectTimeoutMs,
  },

  forbidOnly: runtimeConfig.forbidOnly,

  fullyParallel: false,

  retries: runtimeConfig.retries,

  workers: runtimeConfig.workers,
  
  outputDir: 'test-results',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}-{projectName}-{platform}{ext}',
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
    baseURL: environment.baseURL,

    trace: runtimeConfig.trace,

    screenshot: runtimeConfig.screenshot,

    video: runtimeConfig.video,
  },

  projects: [

      {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'chromium',

      testIgnore: [
        /.*\.setup\.ts/,
        /api[\\/].*\.spec\.ts/,
      ],

      use: {
        ...devices['Desktop Chrome'],
      },

      dependencies: ['setup'],
    },

    {
      name: 'api',

      testMatch: /api[\\/].*\.spec\.ts/,
    },

  ],

});