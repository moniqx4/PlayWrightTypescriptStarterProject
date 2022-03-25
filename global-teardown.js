import { globalTeardown as playwrightGlobalTeardown } from 'playwright'

module.exports = async function globalTeardown(globalConfig) {
  // Your global teardown
  await playwrightGlobalTeardown(globalConfig)
}
