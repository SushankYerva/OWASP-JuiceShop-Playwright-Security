import {
  Locator,
  Page,
} from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly productCards: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productCards =
      page.locator('mat-card');

    this.searchButton =
      page.getByLabel('Open search');

    this.searchInput =
      page.getByRole('textbox');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/search');
  }

  async search(
    productName: string,
  ): Promise<void> {
    await this.searchButton.click();

    await this.searchInput.fill(
      productName,
    );

    await this.searchInput.press(
      'Enter',
    );
  }

  productByName(
    productName: string,
    ): Locator {
    const escapedName = productName.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
    );

    return this.productCards.filter({
        hasText: new RegExp(
        `\\b${escapedName}\\b`,
        'i',
        ),
    });
    }

  async addToBasket(
    productName: string,
  ): Promise<void> {
    const product =
      this.productByName(productName);

    const addButton =
      product.getByRole('button', {
        name: /add to basket/i,
      });

    await addButton.click();

    // Wait for Juice Shop to confirm that the
    // asynchronous basket operation completed.
    await this.page
      .locator('.confirmBar')
      .waitFor({
        state: 'visible',
        timeout: 10_000,
      });
  }
}