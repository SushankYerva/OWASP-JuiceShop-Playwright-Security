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
  'user can manage products in the basket',
  {
    tag: [
      '@functional',
      '@basket',
      '@critical',
    ],
  },
  async ({ page }) => {
    const productsPage =
      new ProductsPage(page);

    const basketPage =
      new BasketPage(page);

    const productName =
      'Apple Juice';

    // -------------------------
    // Add product
    // -------------------------

    await productsPage.goto();

    await productsPage.search(
      productName,
    );

    await productsPage.addToBasket(
      productName,
    );

    // -------------------------
    // Verify basket
    // -------------------------

    await basketPage.goto();
    
    const productRow =
      basketPage.productRow(
        productName,
      );

    await expect(
      productRow,
    ).toBeVisible();

    await expect(
      basketPage.quantityFor(
        productName,
      ),
    ).toHaveText('1');

    // -------------------------
    // Increase quantity
    // -------------------------

    await basketPage.increaseQuantity(
      productName,
    );

    await expect(
      basketPage.quantityFor(
        productName,
      ),
    ).toHaveText('2');

    // -------------------------
    // Decrease quantity
    // -------------------------

    await basketPage.decreaseQuantity(
      productName,
    );

    await expect(
      basketPage.quantityFor(
        productName,
      ),
    ).toHaveText('1');

    // -------------------------
    // Remove product
    // -------------------------

    await basketPage.removeProduct(
      productName,
    );

    await expect(
      productRow,
    ).toHaveCount(0);
  },
);