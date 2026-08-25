import {
  test,
  expect,
} from '@fixtures/app.fixture';

import {
  createTestUser,
} from '@data/test-user.factory';

import {
  RegisterPage,
} from '@pages/register.page';

test(
  'user can register successfully',
  {
    tag: [
      '@functional',
      '@authentication',
      '@smoke',
    ],
  },
  async ({ page }) => {
    
    const user = createTestUser();
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(
      user.email,
      user.password,
    );

    await expect(page).toHaveURL(
      /login/,
    );
  },
);