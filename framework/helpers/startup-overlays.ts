import { Page } from '@playwright/test';

export async function dismissStartupOverlays(
  page: Page,
): Promise<void> {

  // Welcome dialog
  const dismissWelcomeButton = page.getByRole(
    'button',
    {
      name: 'Close Welcome Banner',
      exact: true,
    },
  );

  try {
    await dismissWelcomeButton.waitFor({
      state: 'visible',
      timeout: 1500,
    });

    await dismissWelcomeButton.click();
  } catch {
    // Welcome dialog is not present.
  }

  // Cookie banner
  const cookieButton = page.getByRole(
    'button',
    {
      name: 'dismiss cookie message',
      exact: true,
    },
  );

  try {
    await cookieButton.waitFor({
      state: 'visible',
      timeout: 1500,
    });

    await cookieButton.click();
  } catch {
    // Cookie banner is not present.
  }
}