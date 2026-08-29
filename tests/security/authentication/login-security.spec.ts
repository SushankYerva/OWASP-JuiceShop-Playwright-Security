import {
  test,
  expect,
} from '@fixtures/app.fixture';

import {
  LoginPage,
} from '@pages/login.page';

test.describe(
  'Authentication security',
  () => {
    test(
      'invalid credentials do not create an authenticated session',
      {
        tag: [
          '@security',
          '@authentication',
        ],
      },
      async ({ page }) => {
        const loginPage =
          new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
          `invalid.${Date.now()}@test.local`,
          'InvalidPassword@123',
        );

        await expect(
          page,
        ).toHaveURL(
          /\/#\/login/,
        );

        const token =
          await page.evaluate(() =>
            window.localStorage.getItem(
              'token',
            ),
          );

        expect(token).toBeNull();
      },
    );
  },
);

test(
  'accessing basket route does not authenticate an unauthenticated user',
  {
    tag: [
      '@security',
      '@authentication',
      '@authorization',
    ],
  },
  async ({ page }) => {
    await page.goto('/#/basket');

    // Juice Shop allows navigation to the basket route,
    // so remaining on /#/basket is valid application behaviour.
    await expect(page).toHaveURL(
      /\/#\/basket/,
    );

    // Navigation must not create an authenticated session.
    const token =
      await page.evaluate(() =>
        window.localStorage.getItem(
          'token',
        ),
      );

    expect(token).toBeNull();

    // Confirm the application still considers the
    // browser unauthenticated.
    const accountButton =
      page.getByRole('button', {
        name: 'Show/hide account menu',
      });

    await accountButton.click();

    await expect(
      page.getByRole('menuitem', {
        name: 'Go to login page',
      }),
    ).toBeVisible();
  },
);