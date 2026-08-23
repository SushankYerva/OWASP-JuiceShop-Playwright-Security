import path from 'node:path';

import {
  test as setup,
  expect,
} from '@playwright/test';

import {
  createTestUser,
} from '@data/test-user.factory';

import {
  dismissStartupOverlays,
} from '@helpers/startup-overlays';

const authFile = path.join(
  process.cwd(),
  'playwright',
  '.auth',
  'user.json',
);

setup(
  'create authenticated Juice Shop session',
  async ({ page, request }) => {

    const user = createTestUser();

    // 1. Create user through API
    const registrationResponse =
      await request.post('/api/Users', {
        data: {
          email: user.email,
          password: user.password,
          passwordRepeat: user.password,
        },
      });

    expect(
      registrationResponse.ok(),
    ).toBeTruthy();

    // 2. Open login page
    await page.goto('/#/login');

    await dismissStartupOverlays(page);

    // 3. Login through UI
    await page.locator('#email').fill(
      user.email,
    );

    await page.locator('#password').fill(
      user.password,
    );

    await page.locator(
      '#loginButton',
    ).click();

    // 4. Wait until login actually completes
    await page.waitForURL(
      /#\/search/,
      {
        timeout: 10_000,
      },
    );

    // 5. Verify token exists
    const token = await page.evaluate(() => {
      return localStorage.getItem('token');
    });

    expect(token).toBeTruthy();

    // 6. Verify UI is authenticated
    await page.getByRole(
      'button',
      {
        name: 'Account',
      },
    ).click();

    await expect(
      page.getByRole('menuitem', { name: 'Logout'})
    ).toBeVisible();

    // Close Account menu again
    await page.keyboard.press('Escape');

    // 7. Save authenticated state ONLY now
    await page.context().storageState({
      path: authFile,
    });
  },
);