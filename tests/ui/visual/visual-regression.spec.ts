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

    const productCards =
      page.locator('mat-card');

    await expect(
      productCards.first(),
    ).toBeVisible();

    // Wait until the catalogue has actually rendered.
    await expect(
      productCards,
    ).not.toHaveCount(0);

    // Let Angular finish rendering the UI.
    await page.waitForLoadState(
      'networkidle',
    );

    await expect(page).toHaveScreenshot(
      'product-catalogue.png',
      {
        fullPage: true,
        animations: 'disabled',
        caret: 'hide',
        maxDiffPixels: 300,
      },
    );
  },
);

test(
  'login page visual baseline',
  {
    tag: ['@ui', '@visual', '@authentication'],
  },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeDisabled();

    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const languageNotification =
      page.getByText(/Language has been changed to English/i);

    if (await languageNotification.isVisible().catch(() => false)) {
      await expect(languageNotification).toBeHidden({
        timeout: 15_000,
      });
    }

    await expect(page).toHaveScreenshot(
      'login-page.png',
      {
        fullPage: true,
        animations: 'disabled',
        caret: 'hide',
      },
    );
  },
);