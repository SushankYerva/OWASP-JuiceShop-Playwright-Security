import fs from 'fs';

import {
  test as appTest,
  expect,
} from '@fixtures/app.fixture';

import {
  frameworkPaths,
} from '@config/paths';

export const test = appTest.extend({
  storageState: frameworkPaths.authState,

  context: async ({ context }, use) => {
    if (
      fs.existsSync(
        frameworkPaths.sessionState,
      )
    ) {
      const sessionStorage =
        JSON.parse(
          fs.readFileSync(
            frameworkPaths.sessionState,
            'utf-8',
          ),
        );

      await context.addInitScript(
        storage => {
          for (
            const [key, value]
            of Object.entries(storage)
          ) {
            window.sessionStorage.setItem(
              key,
              String(value),
            );
          }
        },
        sessionStorage,
      );
    }

    await use(context);
  },
});

export { expect };