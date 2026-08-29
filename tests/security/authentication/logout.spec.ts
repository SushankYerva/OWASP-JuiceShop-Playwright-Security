import {
  test,
  expect,
} from '@fixtures/auth.fixture';

import {
  NavbarComponent,
} from '@components/navbar.component';

test(
  'logout removes authenticated browser state and remains logged out after reload',
  {
    tag: [
      '@security',
      '@authentication',
      '@authenticated',
      '@session',
    ],
  },
  async ({ page, context }) => {
    const navbar = new NavbarComponent(page);

    await page.goto('/');

    const tokenBeforeLogout =
      await page.evaluate(() =>
        localStorage.getItem('token'),
      );

    expect(
      tokenBeforeLogout,
    ).toBeTruthy();

    await navbar.openAccountMenu();

    await expect(
      navbar.logoutMenuItem,
    ).toBeVisible();

    await navbar.logoutMenuItem.click();

    // Token must be removed immediately after logout.
    const tokenAfterLogout =
      await page.evaluate(() =>
        localStorage.getItem('token'),
      );

    expect(
      tokenAfterLogout,
    ).toBeNull();

    // Authentication cookie must not remain.
    const cookies =
      await context.cookies();

    const tokenCookie =
      cookies.find(
        cookie =>
          cookie.name === 'token',
      );

    expect(
      tokenCookie,
    ).toBeUndefined();

    // UI must return to unauthenticated state.
    await navbar.openAccountMenu();

    await expect(
      navbar.loginMenuItem,
    ).toBeVisible();

    // Reload must not restore authentication.
    await page.reload();

    const tokenAfterReload =
      await page.evaluate(() =>
        localStorage.getItem('token'),
      );

    expect(
      tokenAfterReload,
    ).toBeNull();

    const cookiesAfterReload =
      await context.cookies();

    const tokenCookieAfterReload =
      cookiesAfterReload.find(
        cookie =>
          cookie.name === 'token',
      );

    expect(
      tokenCookieAfterReload,
    ).toBeUndefined();

    // User must still appear logged out after reload.
    await navbar.openAccountMenu();

    await expect(
      navbar.loginMenuItem,
    ).toBeVisible();
  },
);