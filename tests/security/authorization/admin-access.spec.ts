import {
  test,
  expect,
} from '@fixtures/auth.fixture';

test.describe(
  'Authorization security',
  () => {
    test(
      'authenticated test user does not have administrator role',
      {
        tag: [
          '@security',
          '@authorization',
        ],
      },
      async ({ page }) => {
        await page.goto('/');

        const token =
          await page.evaluate(() =>
            window.localStorage.getItem(
              'token',
            ),
          );

        expect(token).not.toBeNull();

        if (!token) {
          throw new Error(
            'Authentication token was not available.',
          );
        }

        const parts =
          token.split('.');

        expect(parts).toHaveLength(3);

        const payload =
          JSON.parse(
            Buffer.from(
              parts[1],
              'base64url',
            ).toString('utf-8'),
          );

        const role =
          payload?.data?.role ??
          payload?.role;

        expect(role).toBeDefined();

        expect(role).not.toBe(
          'admin',
        );
      },
    );

    test(
      'normal user is denied access to administration functionality',
      {
        tag: [
          '@security',
          '@authorization',
          '@admin',
        ],
      },
      async ({ page }) => {
        await page.goto(
          '/#/administration',
        );

        await expect(page).toHaveURL(
          /\/#\/administration\/?$/,
        );

        await expect(
          page.getByText(
            /you are not allowed to access this page/i,
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            '403',
            {
              exact: true,
            },
          ),
        ).toBeVisible();
      },
    );
  },
);