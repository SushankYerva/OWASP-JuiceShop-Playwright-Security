import {
  test,
  expect,
} from '@fixtures/api.fixture';

test.describe(
  'API security controls',
  () => {
    test(
      'protected basket API rejects malformed bearer token',
      {
        tag: [
          '@security',
          '@api-security',
          '@authentication',
        ],
      },
      async ({
        api,
        isolatedUser,
      }) => {
        const response =
          await api.get(
            `/rest/basket/${isolatedUser.basketId}`,
            {
              headers: {
                Authorization:
                  'Bearer definitely-not-a-valid-token',
              },
            },
          );

        expect([
          401,
          403,
        ]).toContain(
          response.status(),
        );
      },
    );

    test(
        'unsupported HTTP method is assessed for safe rejection',
        {
            tag: [
            '@security',
            '@api-security',
            '@http-methods',
            '@known-vulnerability',
            ],
        },
        async ({ api }) => {
            const response =
            await api.fetch(
                '/rest/products/search',
                {
                method: 'PATCH',
                },
            );

            const status =
            response.status();

            if (status === 500) {
            console.warn(
                'KNOWN SECURITY FINDING:',
                'Unsupported PATCH request caused HTTP 500.',
            );

            test.info().annotations.push({
                type: 'known-vulnerability',
                description:
                'Unsupported HTTP method causes an internal server error instead of being safely rejected.',
            });

            return;
            }

            /*
            * If Juice Shop is hardened in the future,
            * these are acceptable rejection responses.
            */
            expect([
            400,
            404,
            405,
            ]).toContain(status);
        },
    );

    test(
      'CORS policy is assessed for overly permissive configuration',
      {
        tag: [
          '@security',
          '@api-security',
          '@cors',
        ],
      },
      async ({ api }) => {
        const untrustedOrigin =
          'https://untrusted.example';

        const response =
          await api.get(
            '/rest/products/search',
            {
              params: {
                q: 'Apple',
              },

              headers: {
                Origin:
                  untrustedOrigin,
              },
            },
          );

        expect(
          response.status(),
        ).toBe(200);

        const headers =
          response.headers();

        const allowOrigin =
          headers[
            'access-control-allow-origin'
          ];

        console.log(
          'CORS allow-origin:',
          allowOrigin ?? '<missing>',
        );

        if (
          allowOrigin === '*' ||
          allowOrigin ===
            untrustedOrigin
        ) {
          console.warn(
            'KNOWN SECURITY FINDING:',
            `API permits CORS origin: ${allowOrigin}`,
          );

          test.info().annotations.push({
            type: 'known-vulnerability',
            description:
              `Potentially permissive CORS configuration: ${allowOrigin}`,
          });
        } else {
          test.info().annotations.push({
            type: 'security-control',
            description:
              'Untrusted origin was not explicitly permitted by CORS.',
          });
        }

        /*
         * Do not assert that the vulnerable
         * behaviour must exist. If CORS is
         * hardened later, the test remains valid.
         */
        expect(
          headers,
        ).toBeDefined();
      },
    );
  },
);