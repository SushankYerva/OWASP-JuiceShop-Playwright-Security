import {
  test as base,
  expect,
  type Page,
} from '@playwright/test';

import {
  dismissStartupOverlays,
} from '../utils/startup-overlays';

interface AppFixtures {
  appPage: Page;
}

export const test =
  base.extend<AppFixtures>({
    appPage: async ({ page }, use) => {

      await page.goto('/');

      await dismissStartupOverlays(page);

      await use(page);
    },
  });

export { expect };