import {
  test,
  expect,
} from '@fixtures/api.fixture';

test(
  'product catalogue can be retrieved',
  {
    tag: [
      '@api',
      '@products',
      '@smoke',
    ],
  },
  async ({
    productsClient,
  }) => {

    const response =
      await productsClient
        .getProducts();

    expect(
      response.status(),
    ).toBe(200);

    const body =
      await response.json();

    expect(
      body.status,
    ).toBe('success');

    expect(
      Array.isArray(body.data),
    ).toBeTruthy();

    expect(
      body.data.length,
    ).toBeGreaterThan(0);

    const firstProduct =
      body.data[0];

    expect(
      firstProduct,
    ).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      }),
    );
  },
);

test(
  'product search returns matching products',
  {
    tag: [
      '@api',
      '@products',
      '@search',
    ],
  },
  async ({
    productsClient,
  }) => {

    const response =
      await productsClient
        .searchProducts(
          'Apple Juice',
        );

    expect(
      response.status(),
    ).toBe(200);

    const body =
      await response.json();

    expect(
      body.status,
    ).toBe('success');

    expect(
      Array.isArray(body.data),
    ).toBeTruthy();

    expect(
      body.data.length,
    ).toBeGreaterThan(0);

    const appleJuice =
      body.data.find(
        (product: {
          name: string;
        }) =>
          product.name ===
          'Apple Juice (1000ml)',
      );

    expect(
      appleJuice,
    ).toBeDefined();
  },
);