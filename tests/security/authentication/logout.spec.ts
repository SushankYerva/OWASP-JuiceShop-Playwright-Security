import {
  test,
  expect,
} from '@fixtures/auth.fixture';

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

    // Navigate to Juice Shop origin first.
    await page.goto('/');

    // Verify token exists before logout.
    const tokenBeforeLogout = await page.evaluate(() =>
      localStorage.getItem('token'),
    );

    expect(tokenBeforeLogout).toBeTruthy();

    await page.getByRole(
      'button',
      {
        name: 'Show/hide account menu',
      },
    ).click();

    const logout = page.getByRole(
      'menuitem',
      {
        name: 'Logout',
      },
    );

    await expect(logout).toBeVisible();

    await logout.click();

    // Verify localStorage token was removed.
    await expect
      .poll(async () =>
        page.evaluate(() =>
          localStorage.getItem('token'),
        ),
      )
      .toBeNull();

    // Optional cookie validation.
    const cookies = await context.cookies();

    const tokenCookie = cookies.find(
      cookie => cookie.name === 'token',
    );

    expect(tokenCookie).toBeUndefined();

    // Verify logged-out UI.
    const accountMenu = page.getByRole(
      'button',
      {
        name: 'Show/hide account menu',
      },
    );

    await expect(accountMenu).toBeVisible();
    await accountMenu.click();

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