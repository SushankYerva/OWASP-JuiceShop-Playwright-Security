import 'dotenv/config';

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(
      `Required environment variable "${name}" is not configured.`
    );
  }

  return value;
}

export const env = {
  get testUserEmail(): string {
    return requireEnv('TEST_USER_EMAIL');
  },

  get testUserPassword(): string {
    return requireEnv('TEST_USER_PASSWORD');
  },

  get adminUserEmail(): string {
    return requireEnv('ADMIN_USER_EMAIL');
  },

  get adminUserPassword(): string {
    return requireEnv('ADMIN_USER_PASSWORD');
  },
};