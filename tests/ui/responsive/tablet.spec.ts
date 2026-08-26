import {
  test,
  expect,
} from '@fixtures/app.fixture';

test.use({
  viewport: {
    width: 768,
    height: 1024,
  },
});

test(
  'product catalogue remains usable on tablet viewport',
  {
    tag: [
      '@ui',
      '@responsive',
      '@tablet',
    ],
  },
  async ({ page }) => {
    await page.goto('/#/search');

    await expect(
      page.locator('mat-card').first(),
    ).toBeVisible();

    const dimensions =
      await page.evaluate(() => ({
        viewport:
          document.documentElement.clientWidth,

        content:
          document.documentElement.scrollWidth,
      }));

    expect(
      dimensions.content,
    ).toBeLessThanOrEqual(
      dimensions.viewport,
    );
  },
);