import {
  expect,
} from '@playwright/test';

import {
  ZodType,
} from 'zod';

export function expectSchema<T>(
  schema: ZodType<T>,
  data: unknown,
): T {
  const result =
    schema.safeParse(data);

  expect(
    result.success,
    result.success
      ? undefined
      : JSON.stringify(
          result.error.issues,
          null,
          2,
        ),
  ).toBeTruthy();

  if (!result.success) {
    throw new Error(
      'Schema validation failed.',
    );
  }

  return result.data;
}