import type { Page } from '@playwright/test';

export async function dismissStartupOverlays(
  page: Page
): Promise<void> {

  // Close welcome popup first
  const welcomeButton = page.getByRole('button', {
    name: 'Close Welcome Banner',
    exact: true,
  });

  await welcomeButton.click();

  // Then close cookie banner
  const cookieButton = page.getByRole('button', {
    name: 'dismiss cookie message',
    exact: true,
  });

  await cookieButton.click();
}