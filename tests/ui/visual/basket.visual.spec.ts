import {
  test,
  expect,
} from '@fixtures/auth.fixture';

import {
  ProductsPage,
} from '@pages/products.page';

import {
  BasketPage,
} from '@pages/basket.page';

test(
  'basket page visual baseline',
  {
    tag: [
      '@ui',
      '@visual',
      '@basket',
      '@authenticated',
    ],
  },
  async ({ page }) => {
    const productsPage =
      new ProductsPage(page);

    const basketPage =
      new BasketPage(page);

    const productName = 'Apple Juice';

    await productsPage.goto();

    await productsPage.search(
      productName,
    );

    await productsPage.addToBasket(
      productName,
    );

    await basketPage.goto();

    await expect(
      basketPage.productRow(
        productName,
      ),
    ).toBeVisible();

    await expect(page).toHaveScreenshot(
      'basket-page.png',
      {
        fullPage: true,
      },
    );
  },
);