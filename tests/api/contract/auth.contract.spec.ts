import {
  test,
  expect,
} from '@fixtures/api.fixture';

import {
  createTestUser,
} from '@data/test-user.factory';

import {
  loginResponseSchema,
} from '@api/contracts/auth.schema';

import {
  expectSchema,
} from '@utils/schema-validator';

test(
  'login API conforms to expected contract',
  {
    tag: [
      '@api',
      '@contract',
      '@authentication',
    ],
  },
  async ({
    authClient,
  }) => {
    const user =
      createTestUser();

    await authClient.register(
      user,
    );

    const response =
      await authClient.loginRaw(
        user.email,
        user.password,
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
        loginResponseSchema,
        body,
      );

    if (!contract.success) {
      return;
    }

    expect(
      contract.authentication.token,
    ).toBeTruthy();

    expect(
      Number(
        contract.authentication.bid,
      ),
    ).toBeGreaterThan(0);
  },
);