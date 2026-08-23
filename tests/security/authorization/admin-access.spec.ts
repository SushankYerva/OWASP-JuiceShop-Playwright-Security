import {
  test,
  expect,
} from '@playwright/test';
import { frameworkPaths } from '@config/paths';
test.use({
  storageState: frameworkPaths.authState,
});
test(
  'normal user cannot access administration page',
  {
    tag: [
      '@security',
      '@authorization',
      '@authenticated',
    ],
  },
  async ({ page }) => {

    // User is already authenticated through storageState
    await page.goto('/#/administration');

    // Normal user must be denied access
    await expect(
      page.locator('body'),
    ).toContainText(
      /403|Forbidden/i,
    );

    // Confirm authentication still exists
    await page.getByRole(
      'button',
      {
        name: 'Show/hide account menu',
      },
    ).click();

    await expect(
      page.getByRole(
        'menuitem',
        {
          name: 'Logout',
        },
      ),
    ).toBeVisible();
  },
);