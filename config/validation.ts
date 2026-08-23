import { getEnvironmentConfig } from './environments';
import { runtimeConfig } from './runtime';

function validateCredentialPair(
  name: string,
  email: string | undefined,
  password: string | undefined,
  errors: string[],
): void {
  const hasEmail = Boolean(email?.trim());
  const hasPassword = Boolean(password?.trim());

  if (hasEmail !== hasPassword) {
    errors.push(
      `${name} credentials are incomplete. Email and password must either both be configured or both be omitted.`,
    );
  }
}

export function validateConfiguration() {
  const errors: string[] = [];

  const environment = getEnvironmentConfig();

  // ----------------------------------
  // Base URL
  // ----------------------------------

  try {
    const url = new URL(environment.baseURL);

    if (!['http:', 'https:'].includes(url.protocol)) {
      errors.push(
        `BASE_URL must use http or https. Received: ${url.protocol}`,
      );
    }

    if (url.username || url.password) {
      errors.push(
        'BASE_URL must not contain embedded credentials.',
      );
    }
  } catch {
    errors.push(
      `Invalid BASE_URL: "${environment.baseURL}".`,
    );
  }

  // ----------------------------------
  // Runtime configuration
  // ----------------------------------

  if (
    !Number.isInteger(runtimeConfig.testTimeoutMs) ||
    runtimeConfig.testTimeoutMs <= 0
  ) {
    errors.push(
      'testTimeoutMs must be a positive integer.',
    );
  }

  if (
    !Number.isInteger(runtimeConfig.expectTimeoutMs) ||
    runtimeConfig.expectTimeoutMs <= 0
  ) {
    errors.push(
      'expectTimeoutMs must be a positive integer.',
    );
  }

  if (
    !Number.isInteger(runtimeConfig.retries) ||
    runtimeConfig.retries < 0
  ) {
    errors.push(
      'retries must be a non-negative integer.',
    );
  }

  if (
    runtimeConfig.workers !== undefined &&
    (
      !Number.isInteger(runtimeConfig.workers) ||
      runtimeConfig.workers < 1
    )
  ) {
    errors.push(
      'workers must be undefined or a positive integer.',
    );
  }

  // ----------------------------------
  // Optional fixed accounts
  // ----------------------------------

  validateCredentialPair(
    'TEST_USER',
    process.env.TEST_USER_EMAIL,
    process.env.TEST_USER_PASSWORD,
    errors,
  );

  validateCredentialPair(
    'ADMIN_USER',
    process.env.ADMIN_USER_EMAIL,
    process.env.ADMIN_USER_PASSWORD,
    errors,
  );

  // ----------------------------------
  // Final result
  // ----------------------------------

  if (errors.length > 0) {
    throw new Error(
      [
        '',
        'Configuration validation failed:',
        ...errors.map(error => `  - ${error}`),
      ].join('\n'),
    );
  }

  return environment;
}