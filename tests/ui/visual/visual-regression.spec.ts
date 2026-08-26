import {
  test,
  expect,
} from '@fixtures/app.fixture';

import {
  LoginPage,
} from '@pages/login.page';

test(
  'product catalogue visual baseline',
  {
    tag: [
      '@ui',
      '@visual',
    ],
  },
  async ({ page }) => {
    await page.goto('/#/search');

    await expect(
      page.locator('mat-card').first(),
    ).toBeVisible();

    await expect(page).toHaveScreenshot(
      'product-catalogue.png',
      {
        fullPage: true,
      },
    );
  },
);

test(
  'login page visual baseline',
  {
    tag: [
      '@ui',
      '@visual',
      '@authentication',
    ],
  },
  async ({ page }) => {
    const loginPage =
      new LoginPage(page);

    await loginPage.goto();

    // Make sure the page has fully rendered.
    await expect(
      loginPage.emailInput,
    ).toBeVisible();

    await expect(
      loginPage.passwordInput,
    ).toBeVisible();

    // Correct initial login-page state.
    await expect(
      loginPage.loginButton,
    ).toBeDisabled();

    await expect(page).toHaveScreenshot(
      'login-page.png',
      {
        fullPage: true,
      },
    );
  },
);