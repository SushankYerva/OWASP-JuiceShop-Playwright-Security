import {
  test,
  expect,
} from '@fixtures/app.fixture';

import {
  NavbarComponent,
} from '@components/navbar.component';

test(
  'main navigation exposes account options',
  {
    tag: [
      '@ui',
      '@navigation',
      '@smoke',
    ],
  },
  async ({ page }) => {
    const navbar =
      new NavbarComponent(page);

    await page.goto('/');

    await expect(
      navbar.accountMenuButton,
    ).toBeVisible();

    await navbar.openAccountMenu();

    await expect(
      navbar.loginMenuItem,
    ).toBeVisible();
  },
);