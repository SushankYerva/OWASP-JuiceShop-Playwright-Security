import {
  test,
  expect,
} from '@playwright/test';

import {
  dismissStartupOverlays,
} from '@helpers/startup-overlays';

test(
  'anonymous user is presented with login option',
  {
    tag: [
      '@security',
      '@authentication',
      '@anonymous',
    ],
  },
  async ({ page }) => {

    await page.goto('/');

    await dismissStartupOverlays(page);

    await page.getByRole(
      'button',
      {
        name: 'Show/hide account menu',
      },
    ).click();

    // Anonymous user should see Login
    await expect(
      page.getByRole(
        'menuitem',
        {
          name: 'Go to login page',
        },
      ),
    ).toBeVisible();

    // Anonymous user must not see Logout
    await expect(
      page.getByRole(
        'menuitem',
        {
          name: 'Logout',
        },
      ),
    ).toHaveCount(0);

    const token =
      await page.evaluate(() =>
        localStorage.getItem('token'),
      );

    expect(token).toBeNull();
  },
);