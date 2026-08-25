import {
  test as base,
  expect,
} from '@playwright/test';

import {
  dismissStartupOverlays,
} from '../helpers/startup-overlays';

export const test = base.extend({
  page: async ({ page }, use) => {

    // Load Juice Shop first.
    await page.goto('/');

    // Remove application startup overlays.
    await dismissStartupOverlays(page);

    // Only now give the page to the test.
    await use(page);
  },
});

export { expect };