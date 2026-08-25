import {
  test,
  expect,
} from '@fixtures/app.fixture';

import {
  ProductsPage,
} from '@pages/products.page';

test(
  'user can search for a product',
  {
    tag: [
      '@functional',
      '@products',
      '@smoke',
    ],
  },
  async ({ page }) => {
    const productsPage =
      new ProductsPage(page);

    await productsPage.goto();

    await expect(
      productsPage.productCards.first(),
    ).toBeVisible();

    await productsPage.search(
      'Apple Juice',
    );

    await expect(
      productsPage.productByName(
        'Apple Juice',
      ),
    ).toBeVisible();
  },
);