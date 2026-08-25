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

import {
  CheckoutPage,
} from '@pages/checkout.page';

test(
  'authenticated user can complete checkout',
  {
    tag: [
      '@functional',
      '@checkout',
      '@e2e',
      '@critical',
    ],
  },
  async ({ page }) => {
    const productsPage =
      new ProductsPage(page);

    const basketPage =
      new BasketPage(page);

    const checkoutPage =
      new CheckoutPage(page);

    const productName = 'Apple Juice';

    // Add product.
    await productsPage.goto();

    await productsPage.search(
      productName,
    );

    await productsPage.addToBasket(
      productName,
    );

    // Verify basket.
    await basketPage.goto();

    await expect(
      basketPage.productRow(
        productName,
      ),
    ).toBeVisible();

    // Begin checkout.
    await checkoutPage.proceedFromBasket();

    // Address.
    await checkoutPage.createAddress();
    await checkoutPage.selectFirstAddress();    

    // Delivery.
    await checkoutPage.selectFirstDeliveryMethod();

    // Payment.
    await checkoutPage.createPaymentCard();

    await checkoutPage.selectFirstPaymentMethod();

    // Complete order.
    await checkoutPage.placeOrder();

    // Final assertion:
    // replace with the actual order-confirmation
    // text/element from your Juice Shop version.
    await expect(
      page.getByRole('heading', { name: 'Thank you for your purchase!' })
    ).toBeVisible();
  },
);