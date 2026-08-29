import {
  test,
  expect,
} from '@fixtures/api.fixture';

import {
  securityHeaderBaseline,
} from '@config/security-headers';

test.describe(
  'HTTP security headers',
  () => {
    test(
      'application retains expected security header protections',
      {
        tag: [
          '@security',
          '@headers',
          '@api-security',
        ],
      },
      async ({ api }) => {
        const response =
          await api.get('/');

        expect(
          response.status(),
        ).toBe(200);

        const headers =
          response.headers();

        /*
         * Existing security controls must not
         * disappear or become weaker.
         */
        for (
          const [headerName, expectedValue]
          of Object.entries(
            securityHeaderBaseline.required,
          )
        ) {
          expect(
            headers[headerName],
            `Expected security header "${headerName}" to be present`,
          ).toBeDefined();

          expect(
            headers[headerName]?.toLowerCase(),
            `Unexpected value for security header "${headerName}"`,
          ).toBe(
            expectedValue.toLowerCase(),
          );
        }

        /*
         * Report known missing protections.
         *
         * These are informational findings and
         * deliberately do not fail this regression
         * test because Juice Shop is intentionally
         * vulnerable.
         */
        const currentlyMissing =
          securityHeaderBaseline.knownMissing.filter(
            headerName =>
              !headers[headerName],
          );

        console.log(
          'KNOWN MISSING SECURITY HEADERS:',
          currentlyMissing,
        );
      },
    );
  },
);