import {
  test,
  expect,
} from '@fixtures/api.fixture';

test(
  'new user can authenticate through API',
  {
    tag: [
      '@api',
      '@authentication',
      '@smoke',
    ],
  },
  async ({
    isolatedUser,
  }) => {
    expect(
      isolatedUser.token,
    ).toBeTruthy();

    expect(
      isolatedUser.basketId,
    ).toBeGreaterThan(0);

    expect(
      isolatedUser.email,
    ).toContain(
      '@test.local',
    );
  },
);