import {
  test,
  expect,
} from '@fixtures/auth.fixture';

import {
  NavbarComponent,
} from '@components/navbar.component';

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
    const navbar = new NavbarComponent(page);

    await page.goto('/');

    const tokenBeforeLogout = await page.evaluate(() =>
      localStorage.getItem('token'),
    );

    expect(tokenBeforeLogout).toBeTruthy();

    await navbar.openAccountMenu();

    await expect(
      navbar.logoutMenuItem,
    ).toBeVisible();

    await navbar.logoutMenuItem.click();

    const tokenAfterLogout = await page.evaluate(() =>
      localStorage.getItem('token'),
    );

    expect(tokenAfterLogout).toBeNull();

    const cookies = await context.cookies();

    const tokenCookie = cookies.find(
      cookie => cookie.name === 'token',
    );

    expect(tokenCookie).toBeUndefined();

    await navbar.openAccountMenu();

    await expect(
      navbar.loginMenuItem,
    ).toBeVisible();
  },
);