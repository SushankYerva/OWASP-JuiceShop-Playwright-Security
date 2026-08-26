import {
  test,
  expect,
} from '@fixtures/api.fixture';

import {
  productListResponseSchema,
} from '@api/contracts/product.schema';

import {
  expectSchema,
} from '@utils/schema-validator';

test(
  'products API conforms to expected contract',
  {
    tag: [
      '@api',
      '@contract',
      '@products',
    ],
  },
  async ({
    productsClient,
  }) => {
    const response =
      await productsClient.getProducts();

    expect(
      response.status(),
    ).toBe(200);

    const contentType =
      response.headers()['content-type'];

    expect(contentType).toContain(
      'application/json',
    );

    const body =
      await response.json();

    const contract =
    expectSchema(
        productListResponseSchema,
        body,
    );

    expect(
    contract.data.length,
    ).toBeGreaterThan(0);
  },
);