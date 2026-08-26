import {
  test,
  expect,
} from '@fixtures/api.fixture';

test(
  'authenticated user can manage own basket through API',
  {
    tag: [
      '@api',
      '@basket',
      '@critical',
    ],
  },
  async ({
    isolatedUser,
    productsClient,
    basketClient,
  }) => {

    /*
     * --------------------------
     * Find test product
     * --------------------------
     */

    const productResponse =
      await productsClient
        .searchProducts(
          'Apple Juice',
        );

    expect(
      productResponse.status(),
    ).toBe(200);

    const productBody =
      await productResponse.json();

    const product =
      productBody.data.find(
        (item: {
          id: number;
          name: string;
        }) =>
          item.name ===
          'Apple Juice (1000ml)',
      );

    expect(product).toBeDefined();

    /*
     * --------------------------
     * Verify initial basket
     * --------------------------
     */

    const initialBasketResponse =
      await basketClient.getBasket(
        isolatedUser.basketId,
        isolatedUser.token,
      );

    expect(
      initialBasketResponse.status(),
    ).toBe(200);

    /*
     * --------------------------
     * Add item
     * --------------------------
     */

    const addResponse =
      await basketClient.addItem(
        isolatedUser.basketId,
        product.id,
        isolatedUser.token,
        1,
      );

    expect(
      addResponse.status(),
    ).toBe(200);

    const addBody =
      await addResponse.json();

    expect(
      addBody.status,
    ).toBe('success');

    expect(
      addBody.data,
    ).toEqual(
      expect.objectContaining({
        BasketId:
          isolatedUser.basketId,

        ProductId:
          product.id,

        quantity: 1,
      }),
    );

    const basketItemId =
      Number(addBody.data.id);

    expect(
      basketItemId,
    ).toBeGreaterThan(0);

    /*
     * --------------------------
     * Update quantity
     * --------------------------
     */

    const updateResponse =
      await basketClient.updateItem(
        basketItemId,
        isolatedUser.token,
        2,
      );

    expect(
      updateResponse.ok(),
    ).toBeTruthy();

    /*
     * --------------------------
     * Verify basket
     * --------------------------
     */

    const basketResponse =
      await basketClient.getBasket(
        isolatedUser.basketId,
        isolatedUser.token,
      );

    expect(
      basketResponse.status(),
    ).toBe(200);

    const basketBody =
      await basketResponse.json();

    expect(
      basketBody.status,
    ).toBe('success');

    /*
     * --------------------------
     * Delete item
     * --------------------------
     */

    const deleteResponse =
      await basketClient.deleteItem(
        basketItemId,
        isolatedUser.token,
      );

    expect(
      deleteResponse.ok(),
    ).toBeTruthy();

    /*
     * --------------------------
     * Verify deletion
     * --------------------------
     */

    const finalBasketResponse =
      await basketClient.getBasket(
        isolatedUser.basketId,
        isolatedUser.token,
      );

    expect(
      finalBasketResponse.status(),
    ).toBe(200);

    const finalBasket =
      await finalBasketResponse.json();

    const basketItems =
      finalBasket.data?.Products ?? [];

    const deletedItem =
      basketItems.find(
        (item: {
          id: number;
        }) =>
          item.id === product.id,
      );

    expect(
      deletedItem,
    ).toBeUndefined();
  },
);