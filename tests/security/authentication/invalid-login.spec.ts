import {
  test,
  expect,
} from '@playwright/test';

import {
  dismissStartupOverlays,
} from '../../../src/utils/startup-overlays';

test(
  'invalid credentials are rejected',
  {
    tag: [
      '@security',
      '@authentication',
      '@negative',
    ],
  },
  async ({ page }) => {

    await page.goto('/#/login');

    await dismissStartupOverlays(page);

    await page
      .locator('#email')
      .fill('invalid-user@test.local');

    await page
      .locator('#password')
      .fill('WrongPassword123!');

    const loginResponsePromise =
      page.waitForResponse(
        response =>
          response.url().includes(
            '/rest/user/login',
          ) &&
          response.request().method() === 'POST',
      );

    await page
      .locator('#loginButton')
      .click();

    const loginResponse =
      await loginResponsePromise;

    // Backend security validation
    expect(loginResponse.status()).toBe(401);

    // UI validation
    await expect(
      page.locator('.error'),
    ).toContainText(
      'Invalid email or password',
    );

    // Authentication token must not exist
    const token =
      await page.evaluate(() =>
        localStorage.getItem('token'),
      );

    expect(token).toBeNull();
  },
);