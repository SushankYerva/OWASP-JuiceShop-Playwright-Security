import {
  test,
  expect,
} from '@playwright/test';

test(
  'logout removes authenticated browser state',
  {
    tag: [
      '@security',
      '@authentication',
      '@authenticated',
    ],
  },
  async ({ page, context }) => {

    await page.goto('/');

    // Verify token exists before logout
    const tokenBeforeLogout =
      await page.evaluate(() =>
        localStorage.getItem('token'),
      );

    expect(tokenBeforeLogout).toBeTruthy();

    await page.getByRole(
      'button',
      {
        name: 'Show/hide account menu',
      },
    ).click();

    const logout =
      page.getByRole(
        'menuitem',
        {
          name: 'Logout',
        },
      );

    await expect(logout).toBeVisible();

    await logout.click();

    // Verify localStorage token was removed
    const tokenAfterLogout =
      await page.evaluate(() =>
        localStorage.getItem('token'),
      );

    expect(tokenAfterLogout).toBeNull();

    // Verify authentication cookie was removed
    const cookies =
      await context.cookies();

    const tokenCookie =
      cookies.find(
        cookie => cookie.name === 'token',
      );

    expect(tokenCookie).toBeUndefined();

    // UI should now show Login instead of Logout
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
          name: 'Go to login page',
        },
      ),
    ).toBeVisible();
  },
);