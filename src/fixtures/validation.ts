import { Locator, test as base, expect, mergeTests } from '@playwright/test'
import { testDataFixture } from './test-data'

type ValidationFixture = {
  checkForJSErrors: () => string[]
  validateCSS: (element: Locator, cssProperty: string, expectedValue: string) => Promise<void>
}

export const validationFixture = base.extend<ValidationFixture>({
  validateCSS: async ({ page }, use) => {
    async function validateCSS(element: Locator, cssProperty: string, expectedValue: string){
      await expect(element).toHaveCSS(cssProperty, expectedValue)
    }
    await use(validateCSS)
  },
  checkForJSErrors: async ({ page }, use) => {
    const errors: Array<Error> = []
    page.addListener('pageerror', (error) => errors.push(error))
    
    
  }
  // await use(checkForJSErrors)
})


export const test = mergeTests(validationFixture, testDataFixture)

export { expect }

export * from '@playwright/test'