import {
  Locator,
  Page,
} from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly securityQuestionSelect: Locator;
  readonly securityAnswerInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput =
      page.locator('#emailControl');

    this.passwordInput =
      page.locator('#passwordControl');

    this.repeatPasswordInput =
      page.locator('#repeatPasswordControl');

    this.securityQuestionSelect =
      page.getByText('Security Question');

    this.securityAnswerInput =
      page.locator('#securityAnswerControl');

    this.registerButton =
      page.locator('#registerButton');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/register');
  }

  async register(
    email: string,
    password: string,
  ): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);

    await this.securityQuestionSelect.click();

    const firstQuestion =
      this.page.getByRole('option').first();

    await firstQuestion.click();

    await this.securityAnswerInput.fill(
      'PlaywrightTestAnswer',
    );

    await this.registerButton.click();
  }
}