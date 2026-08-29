import {
  test,
  expect,
} from '@fixtures/api.fixture';

test.describe(
  'API authentication security',
  () => {
    test(
      'basket API rejects request without authentication token',
      {
        tag: [
          '@security',
          '@api-security',
          '@authentication',
        ],
      },
      async ({ api }) => {
        const response =
          await api.get(
            '/rest/basket/1',
          );

        expect(
          response.status(),
        ).toBe(401);
      },
    );
  },
);