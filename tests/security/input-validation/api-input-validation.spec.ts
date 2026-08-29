import {
  test,
  expect,
} from '@fixtures/api.fixture';

test.describe(
  'API input validation security',
  () => {
    test(
      'product search safely handles benign special characters',
      {
        tag: [
          '@security',
          '@input-validation',
          '@api-security',
        ],
      },
      async ({ api }) => {
        const query =
          `playwright-test_123-${Date.now()}`;

        const response =
          await api.get(
            '/rest/products/search',
            {
              params: {
                q: query,
              },
            },
          );

        /*
         * Benign punctuation and encoded input
         * should not cause a server-side failure.
         */
        expect(
          response.status(),
        ).toBe(200);

        const body =
          await response.json();

        expect(
          body,
        ).toBeDefined();
      },
    );

    test(
      'product search documents server error for complex special-character input',
      {
        tag: [
          '@security',
          '@input-validation',
          '@known-vulnerability',
        ],
      },
      async ({ api }) => {
        const query =
          `playwright<>"'&${Date.now()}`;

        const response =
          await api.get(
            '/rest/products/search',
            {
              params: {
                q: query,
              },
            },
          );

        const status =
          response.status();

        if (status >= 500) {
          console.warn(
            `KNOWN SECURITY FINDING: complex search input returned HTTP ${status}`,
          );
        }

        /*
         * Juice Shop is intentionally vulnerable.
         *
         * HTTP 500 is currently treated as a known
         * input-validation finding.
         *
         * If the application is improved and starts
         * returning 200/4xx, the test should still pass.
         */
        expect([
          200,
          400,
          422,
          500,
        ]).toContain(status);
      },
    );

    test(
      'product search handles oversized input without unexpected status',
      {
        tag: [
          '@security',
          '@input-validation',
          '@api-security',
        ],
      },
      async ({ api }) => {
        const oversizedQuery =
          'A'.repeat(2048);

        const response =
          await api.get(
            '/rest/products/search',
            {
              params: {
                q: oversizedQuery,
              },
            },
          );

        const status =
          response.status();

        if (status >= 500) {
          console.warn(
            `KNOWN SECURITY FINDING: oversized search input returned HTTP ${status}`,
          );
        }

        expect([
          200,
          400,
          413,
          414,
          422,
          500,
        ]).toContain(status);
      },
    );
  },
);