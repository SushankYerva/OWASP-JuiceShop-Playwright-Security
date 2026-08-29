import {
  test,
  expect,
} from '@fixtures/auth.fixture';

test.describe(
  'Session security',
  () => {
    test(
      'tampered authentication token is rejected by protected API',
      {
        tag: [
          '@security',
          '@session',
          '@authentication',
        ],
      },
      async ({
        page,
        request,
      }) => {
        await page.goto('/');

        const session =
          await page.evaluate(() => ({
            token:
              window.localStorage.getItem(
                'token',
              ),

            basketId:
              window.sessionStorage.getItem(
                'bid',
              ),
          }));

        expect(
          session.token,
        ).not.toBeNull();

        expect(
          session.basketId,
        ).not.toBeNull();

        if (
          !session.token ||
          !session.basketId
        ) {
          throw new Error(
            'Authenticated session data was not available.',
          );
        }

        const tokenParts =
          session.token.split('.');

        expect(
          tokenParts,
        ).toHaveLength(3);

        const [
          header,
          payload,
          signature,
        ] = tokenParts;

        /*
         * Modify the signature without changing
         * the original token stored by the browser.
         */
        const tamperedSignature =
          `${
            signature.startsWith('A')
              ? 'B'
              : 'A'
          }${signature.slice(1)}`;

        const tamperedToken =
          `${header}.${payload}.${tamperedSignature}`;

        /*
         * The standalone request fixture has its own
         * cookie jar, so authentication depends only
         * on the token supplied here.
         */
        const response =
          await request.get(
            `/rest/basket/${session.basketId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${tamperedToken}`,
              },
            },
          );

        expect(
          [401, 403],
        ).toContain(
          response.status(),
        );
      },
    );
  },
);