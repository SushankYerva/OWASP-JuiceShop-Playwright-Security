import { test as appTest, expect } from './app.fixture';
import { frameworkPaths } from '@config/paths';

export const test = appTest.extend({
  storageState: frameworkPaths.authState,
});

export { expect };