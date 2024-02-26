import { type Locator, test as base, expect, mergeTests } from '@playwright/test'
import { testDataFixture } from './test-data'

type ButtonTestFixture = {  
  validateButtonClick: (buttonElement: Locator, expectedElement: Locator) => Promise<void>
  validateButtonState: (buttonElement: Locator, isEnabled: boolean) => Promise<void>
}

export const buttonTestFixture = base.extend<ButtonTestFixture>({
  validateButtonClick: async ({ page }, use) => {
    async function validateButtonClick(buttonElement: Locator, expectedElement: Locator){
      await buttonElement.click()
      await expect(expectedElement).toBeVisible()
    }
    await use(validateButtonClick)
  },
  validateButtonState: async ({ page }, use) => {
    async function validateButtonState(buttonElement: Locator, isEnabled: boolean){      
      if(isEnabled){
        await expect(buttonElement).toBeEnabled()
      } else {
        await expect(buttonElement).toBeDisabled()      
      }
    }
    await use(validateButtonState)
  }
})


export const test = mergeTests(buttonTestFixture, testDataFixture)

export { expect }

export * from '@playwright/test'