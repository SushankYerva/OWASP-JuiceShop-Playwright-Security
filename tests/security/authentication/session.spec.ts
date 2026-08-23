import {
  test,
  expect,
} from '@playwright/test';
import { frameworkPaths } from '@config/paths';
test.use({
  storageState: frameworkPaths.authState,
});
test(
  'authenticated session is reused',
  {
    tag: [
      '@security',
      '@authentication',
      '@authenticated',
      '@smoke',
    ],
  },
  async ({ page }) => {

    await page.goto('/');

    await page.getByRole(
      'button',
      {
        name: 'Account',
      },
    ).click();

    await expect(
      page.getByRole('menuitem', { name: 'Logout'})
    ).toBeVisible();
  },
);