import {
  test,
  expect,
} from '@fixtures/api.fixture';

test(
  'login rejects invalid credentials',
  {
    tag: [
      '@api',
      '@authentication',
      '@negative',
    ],
  },
  async ({
    authClient,
  }) => {
    const response =
      await authClient.loginRaw(
        'invalid.user@test.local',
        'WrongPassword123!',
      );

    expect(
      response.status(),
    ).toBe(401);

    const body =
      await response.text();

    expect(
      body,
    ).toContain(
      'Invalid email or password',
    );
  },
);

test(
  'login rejects request with missing password',
  {
    tag: [
      '@api',
      '@authentication',
      '@negative',
    ],
  },
  async ({ api }) => {
    const uniqueEmail =
      `missing-password.${Date.now()}@test.local`;

    const response = await api.post(
      '/rest/user/login',
      {
        data: {
          email: uniqueEmail,
          // password deliberately omitted
        },
      },
    );

    expect(
      response.status(),
    ).toBe(401);

    const body =
      await response.text();

    expect(body).toContain(
      'Invalid email or password',
    );
  },
);

test(
  'login rejects request with missing email',
  {
    tag: [
      '@api',
      '@authentication',
      '@negative',
    ],
  },
  async ({ api }) => {
    const response = await api.post(
      '/rest/user/login',
      {
        data: {
          password: 'DefinitelyNotAnEmptyPassword123!',
        },
      },
    );

    expect(
      response.status(),
    ).toBe(401);
  },
);