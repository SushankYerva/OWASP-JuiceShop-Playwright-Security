import {
  Locator,
  Page,
} from '@playwright/test';

export class BasketPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/basket');
  }

  productRow(
    productName: string,
  ): Locator {
    return this.page
      .locator('mat-row')
      .filter({
        has: this.page.getByText(
          productName,
          {
            exact: true,
          },
        ),
      });
  }

  quantityFor(
    productName: string,
  ): Locator {
    return this
      .productRow(productName)
      .locator('mat-cell')
      .nth(2)
      .locator('span.cell-initial-font');
  }

  async increaseQuantity(
    productName: string,
  ): Promise<void> {
    await this
      .productRow(productName)
      .getByRole('button').filter({ hasText: /^$/ }).nth(1)
      .click();
  }

  async decreaseQuantity(
    productName: string,
  ): Promise<void> {
    await this
      .productRow(productName)
      .getByRole('button').filter({ hasText: /^$/ }).first()
      .click();
  }

  async removeProduct(
    productName: string,
  ): Promise<void> {
    await this
      .productRow(productName)
      .getByRole('button').filter({ hasText: /^$/ }).nth(2)
      .click();
  }
}