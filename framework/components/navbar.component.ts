import {
  Page,
  Locator,
} from '@playwright/test';

export class NavbarComponent {
  readonly page: Page;

  readonly accountMenuButton: Locator;
  readonly logoutMenuItem: Locator;
  readonly loginMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountMenuButton = page.getByRole(
      'button',
      {
        name: 'Show/hide account menu',
      },
    );

    this.logoutMenuItem = page.getByRole(
      'menuitem',
      {
        name: 'Logout',
      },
    );

    this.loginMenuItem = page.getByRole(
      'menuitem',
      {
        name: 'Go to login page',
      },
    );
  }

  async openAccountMenu(): Promise<void> {
    await this.accountMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.openAccountMenu();
    await this.logoutMenuItem.click();
  }
}