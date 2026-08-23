import 'dotenv/config';
export type TestEnvironment = 'local' | 'ci' | 'staging';

export interface EnvironmentConfig {
  name: TestEnvironment;
  baseURL: string;
}

const environments: Record<TestEnvironment, EnvironmentConfig> = {
  local: {
    name: 'local',
    baseURL: 'http://localhost:3000',
  },

  ci: {
    name: 'ci',
    baseURL: 'http://localhost:3000',
  },

  staging: {
    name: 'staging',
    baseURL: process.env.BASE_URL ?? '',
  },
};

function resolveEnvironment(): TestEnvironment {
  const requestedEnvironment =
    (process.env.TEST_ENV ?? 'local').toLowerCase();

  if (
    requestedEnvironment !== 'local' &&
    requestedEnvironment !== 'ci' &&
    requestedEnvironment !== 'staging'
  ) {
    throw new Error(
      `Invalid TEST_ENV "${requestedEnvironment}". ` +
      'Allowed values: local, ci, staging.'
    );
  }

  return requestedEnvironment;
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const environmentName = resolveEnvironment();

  return environments[environmentName];
}