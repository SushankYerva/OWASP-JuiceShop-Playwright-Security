import {
  test,
  expect,
} from '@fixtures/app.fixture';

test.use({
  viewport: {
    width: 390,
    height: 844,
  },
});

test(
  'product catalogue remains usable on mobile viewport',
  {
    tag: [
      '@ui',
      '@responsive',
      '@mobile',
    ],
  },
  async ({ page }) => {
    await page.goto('/#/search');

    await expect(
      page.locator('mat-card').first(),
    ).toBeVisible();

    await expect(
      page.getByLabel('Open search')
    ).toBeVisible();

    // Ensure page isn't accidentally wider
    // than the mobile viewport.
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

test(
  'mobile navigation is usable',
  {
    tag: [
      '@ui',
      '@responsive',
      '@navigation',
      '@mobile',
    ],
  },
  async ({ page }) => {
    await page.goto('/');

    // Desktop account control should not be visible
    // in the mobile layout.
    const desktopAccountButton =
      page.getByRole('button', {
        name: 'Show/hide account menu',
      });

    await expect(
      desktopAccountButton,
    ).toBeHidden();

    // Mobile navigation control should be visible.
    const mobileMenuButton =
      page.getByRole('button', { name: 'Open Sidenav' })

    await expect(
      mobileMenuButton,
    ).toBeVisible();

    await mobileMenuButton.click();

    // Verify an important navigation option becomes available.
    await expect(
      page.getByText(/login/i),
    ).toBeVisible();
  },
);