import {
  test,
  expect,
} from '@fixtures/api.fixture';

test(
  'basket endpoint rejects unauthenticated request',
  {
    tag: [
      '@api',
      '@basket',
      '@authentication',
      '@negative',
    ],
  },
  async ({
    api,
  }) => {
    const response =
      await api.get(
        '/rest/basket/1',
      );

    expect(
      response.ok(),
    ).toBeFalsy();

    expect(
      response.status(),
    ).toBe(401);
  },
);

test(
  'authenticated user cannot add item using invalid basket ID',
  {
    tag: [
      '@api',
      '@basket',
      '@authorization',
      '@negative',
    ],
  },
  async ({
    isolatedUser,
    productsClient,
    basketClient,
  }) => {
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

    expect(
      product,
    ).toBeDefined();

    const invalidBasketId =
      isolatedUser.basketId + 99999;

    const response =
      await basketClient.addItem(
        invalidBasketId,
        product.id,
        isolatedUser.token,
        1,
      );

    expect(
      response.status(),
    ).toBe(401);

    const body =
      await response.text();

    expect(
      body,
    ).toContain(
      'Invalid BasketId',
    );
  },
);