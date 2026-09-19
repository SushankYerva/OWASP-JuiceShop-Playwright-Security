import {
  Locator,
  Page,
  expect,
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
    return this.productCards.filter({
      has: this.page.getByText(
        productName,
        {
          exact: true,
        },
      ),
    });
  }

  async addToBasket(
    productName: string,
  ): Promise<void> {
    const product =
      this.productByName(
        productName,
      );

    await expect(
      product,
    ).toBeVisible();

    const addButton =
      product.getByRole(
        'button',
        {
          name: /add to basket/i,
        },
      );

    await expect(
      addButton,
    ).toBeVisible();

    await addButton.click();

    await this.page
      .locator('.confirmBar')
      .waitFor({
        state: 'visible',
        timeout: 10_000,
      });
  }
}