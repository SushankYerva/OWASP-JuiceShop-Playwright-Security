import {
  test,
  expect,
} from '@fixtures/api.fixture';

import {
  basketResponseSchema,
} from '@api/contracts/basket.schema';

import {
  expectSchema,
} from '@utils/schema-validator';

test(
  'basket API conforms to expected contract',
  {
    tag: [
      '@api',
      '@contract',
      '@basket',
    ],
  },
  async ({
    isolatedUser,
    basketClient,
  }) => {
    const response =
      await basketClient.getBasket(
        isolatedUser.basketId,
        isolatedUser.token,
      );

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
        basketResponseSchema,
        body,
      );



    if (!contract.success) {
      return;
    }

    expect(
      contract.data.id,
    ).toBe(
      isolatedUser.basketId,
    );

    expect(
      Array.isArray(
        contract.data.Products,
      ),
    ).toBeTruthy();
  },
);