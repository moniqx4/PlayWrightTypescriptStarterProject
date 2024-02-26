import { test as base, expect, mergeTests } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { testDataFixture } from './test-data'

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder
}

// Extend base test by providing "makeAxeBuilder"
//
// This new "test" can be used in multiple test files, and each of them will get
// a consistently configured AxeBuilder instance.
export const axeFixture = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use, testInfo) => {
    const makeAxeBuilder = () => new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('#commonly-reused-element-with-known-issue')

    await use(makeAxeBuilder)
  }
})


export const test = mergeTests(axeFixture, testDataFixture)

export { expect }

export * from '@playwright/test'


//example in test
// const { test, expect } = require('./axe-test');

// test('example using custom fixture', async ({ page, makeAxeBuilder }) => {
//   await page.goto('https://your-site.com/');

//   const accessibilityScanResults = await makeAxeBuilder()
//     // Automatically uses the shared AxeBuilder configuration,
//     // but supports additional test-specific configuration too
//     .include('#specific-element-under-test')
//     .analyze();

//   expect(accessibilityScanResults.violations).toEqual([]);
// });