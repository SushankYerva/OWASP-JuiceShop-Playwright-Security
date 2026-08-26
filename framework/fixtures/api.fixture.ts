import {
  APIRequestContext,
  test as base,
  expect,
} from '@playwright/test';

import {
  AuthClient,
  AuthSession,
} from '@api/auth.client';

import {
  ProductsClient,
} from '@api/products.client';

import {
  BasketClient,
} from '@api/basket.client';

type ApiFixtures = {
  api: APIRequestContext;

  authClient: AuthClient;

  productsClient: ProductsClient;

  basketClient: BasketClient;

  isolatedUser: AuthSession;
};

export const test =
  base.extend<ApiFixtures>({

    api: async (
      { request },
      use,
    ) => {
      await use(request);
    },

    authClient: async (
      { request },
      use,
    ) => {
      await use(
        new AuthClient(request),
      );
    },

    productsClient: async (
      { request },
      use,
    ) => {
      await use(
        new ProductsClient(request),
      );
    },

    basketClient: async (
      { request },
      use,
    ) => {
      await use(
        new BasketClient(request),
      );
    },

    isolatedUser: async (
      { authClient },
      use,
    ) => {
      const user =
        await authClient
          .createAuthenticatedUser();

      await use(user);
    },
  });

export { expect };