import {
  Locator,
  Page,
  expect,
} from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async proceedFromBasket(): Promise<void> {
    await this.page
      .getByRole('button', {
        name: /checkout/i,
      })
      .click();
  }

  async selectFirstAddress(): Promise<void> {
    const address = this.page
      .locator('mat-row')
      .first();

    await address
      .getByRole('radio')
      .check();

    await this.page
      .getByRole('button', { name: 'Proceed to payment selection' })
      .click();
  }

  async selectFirstDeliveryMethod(): Promise<void> {
    const deliveryOption = this.page
      .getByRole('radio')
      .first();

    await deliveryOption.check();

    await this.page
      .getByRole('button', { name: 'Proceed to delivery method' })
      .click();
  }


  async selectFirstPaymentMethod(): Promise<void> {
    const paymentRow = this.page
        .locator('mat-row')
        .first();

    await expect(paymentRow).toBeVisible();

    await paymentRow
        .getByRole('radio')
        .check();

    await this.page
        .getByRole('button', { name: 'Proceed to review' })
        .click();
    }

  async placeOrder(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Complete your purchase' })
      .click();
  }

  async createAddress(): Promise<void> {
    await this.page
        .getByRole('button', { name: 'Add a new address' })
        .click();

    await this.page
        .getByRole('textbox', { name: 'Country' })
        .fill('Ireland');

    await this.page
        .getByRole('textbox', { name: 'Name' })
        .fill('Playwright Test User');

    await this.page
        .getByRole('spinbutton', { name: 'Mobile Number' })
        .fill('0871234567');

    await this.page
        .getByRole('textbox', { name: 'ZIP Code' })
        .fill('V94TEST');

    await this.page
        .getByRole('textbox', { name: 'Address' })
        .fill('1 Playwright Test Street');

    await this.page
        .getByRole('textbox', { name: 'City' })
        .fill('Limerick');

    await this.page
        .getByRole('textbox', { name: 'State' })
        .fill('Limerick');

    await this.page
        .getByRole('button', { name: 'Submit' })
        .click();
    }


    async createPaymentCard(): Promise<void> {
        // Open "Add new card"
        await this.page
            .getByRole('button', { name: 'Add new card Add a credit or' })
            .click();

        // Cardholder name
        await this.page
            .getByRole('textbox', { name: 'Name' })
            .fill('Playwright Test User');

        // 16-digit card number
        await this.page
            .getByRole('spinbutton', { name: 'Card Number' })
            .fill('4111111111111111');

        // Expiry month
        await this.page
            .getByLabel('Expiry Month')
            .selectOption('12');

        // Juice Shop currently exposes future years starting from 2080.
        await this.page
            .getByLabel('Expiry Year')
            .selectOption('2085');

        await this.page
            .getByRole('button', { name: 'Submit' })
            .click();

        // Wait until Juice Shop confirms the card was stored.
        await this.page
            .locator('.confirmBar')
            .waitFor({
            state: 'visible',
            timeout: 10_000,
            });
    }





}