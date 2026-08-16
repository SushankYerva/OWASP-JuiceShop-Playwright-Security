export interface TestUser {
  email: string;
  password: string;
}

export function createTestUser(): TestUser {
  const uniqueId = `${Date.now()}${Math.floor(
    Math.random() * 10000,
  )}`;

  return {
    email: `playwright.${uniqueId}@test.local`,
    password: `Playwright@${uniqueId}`,
  };
}