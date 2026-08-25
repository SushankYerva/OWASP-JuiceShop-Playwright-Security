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

import {
  LoginPage,
} from '@pages/login.page';

import {
  NavbarComponent,
} from '@components/navbar.component';

test(
  'registered user can login successfully',
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
    const loginPage = new LoginPage(page);
    const navbar = new NavbarComponent(page);

    // Arrange: create a valid account.
    await registerPage.goto();

    await registerPage.register(
      user.email,
      user.password,
    );

    await expect(page).toHaveURL(/login/);

    // Act: login using the newly-created account.
    await loginPage.login(
      user.email,
      user.password,
    );

    // Assert: authenticated UI is available.
    await navbar.openAccountMenu();

    await expect(
      navbar.logoutMenuItem,
    ).toBeVisible();
  },
);