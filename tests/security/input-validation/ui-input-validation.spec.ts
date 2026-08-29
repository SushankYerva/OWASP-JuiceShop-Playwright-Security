import {
  test,
  expect,
} from '@fixtures/app.fixture';

import {
  ProductsPage,
} from '@pages/products.page';

test.describe(
  'UI input validation security',
  () => {
    test(
      'search input handling is assessed for HTML injection',
      {
        tag: [
          '@security',
          '@input-validation',
          '@ui-security',
          '@known-vulnerability',
        ],
      },
      async ({ page }) => {
        const productsPage =
          new ProductsPage(page);

        const marker =
          `pw-marker-${Date.now()}`;

        const untrustedInput =
          `<span id="${marker}">Playwright</span>`;

        await productsPage.goto();

        await productsPage.search(
          untrustedInput,
        );

        const injectedElement =
          page.locator(`#${marker}`);

        const injectedCount =
          await injectedElement.count();

        if (injectedCount > 0) {
          const renderedHtml =
            await injectedElement
              .first()
              .evaluate(
                element =>
                  element.outerHTML,
              );

          console.warn(
            'KNOWN SECURITY FINDING:',
            'Search input was interpreted as HTML.',
          );

          console.warn(
            'Rendered element:',
            renderedHtml,
          );

          test.info().annotations.push({
            type: 'known-vulnerability',
            description:
              'Search input is interpreted as HTML instead of being treated purely as text.',
          });
        } else {
          console.log(
            'SECURITY IMPROVEMENT:',
            'Search input was not rendered as HTML.',
          );

          test.info().annotations.push({
            type: 'security-improvement',
            description:
              'HTML-like search input was not interpreted as DOM markup.',
          });
        }

        /*
         * Confirm that the SPA is still loaded.
         * We check attachment rather than body visibility,
         * because overlays/rendering states can make the
         * document body appear hidden to Playwright.
         */
        await expect(
          page.locator('app-root'),
        ).toBeAttached();

        await expect(page).toHaveURL(
          /#\/search/,
        );
      },
    );
  },
);