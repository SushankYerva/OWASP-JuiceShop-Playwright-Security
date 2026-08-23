import {
  test,
  expect,
} from '@fixtures/auth.fixture';
test(
  'authenticated session is reused',
  {
    tag: [
      '@security',
      '@authentication',
      '@authenticated',
      '@smoke',
    ],
  },
  async ({ page }) => {

    await page.goto('/');

    await page.getByRole(
      'button',
      {
        name: 'Account',
      },
    ).click();

    await expect(
      page.getByRole('menuitem', { name: 'Logout'})
    ).toBeVisible();
  },
);