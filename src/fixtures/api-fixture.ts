import { Locator, test as base, expect, mergeTests } from '@playwright/test'
import { pageObjectFixture } from './page-objects'
import { loginFixture } from './login'
import { testAccountFixture } from './test-accounts'
import { testDataFixture } from './test-data'

type APIFixture = {
  mockAPI: (endpoint: string, jsonObject: Record<string, string>[]) => Promise<void>
  modifyAPIResponse: (endpoint: string, modifiedData: object) => Promise<void>
  recordFromHARFile: (harFilePath: string, endpoint: string) => Promise<void>
  replayFromHARFile: (harFilePath: string, endpoint: string) => Promise<void>
  waitForAPIrepsonse: (endpoint: string, element: Locator) => Promise<void>
}

export const APIFixture = base.extend<APIFixture>({
  mockAPI: async ({ page }, use) => {
    async function mockAPI(endpoint: string, jsonObject: Record<string, string>[]) {
      // Mock the api call before navigating
      await page.route(endpoint, async route => {
        const json = jsonObject
        await route.fulfill({ json })
      })
    }
    // Mock API
    await use(mockAPI)
  },
  modifyAPIResponse: async ({ page }, use) => {
    async function modifyAPIResponse(endpoint: string, modifiedData: object) {
      // Modify the api call after navigating
      await page.route(endpoint, async route => {
        const response = await route.fetch()
        const json = await response.json()
        json.push(modifiedData);
        // Fulfill using the original response, while patching the response body
        // with the given JSON object.
        await route.fulfill({ response, json })
      })
    }
    // Modify API
    await use(modifyAPIResponse)
  },
  recordFromHARFile: async ({ page }, use) => {
    async function recordFromHARFile(harFilePath: string, endpoint: string) {
      // Record from HAR file
      await page.routeFromHAR(harFilePath, {
        url: endpoint,
        update: true,
      })
    }
    await use(recordFromHARFile)
  },
  replayFromHARFile: async ({ page }, use) => {
    async function replayFromHARFile(harFilePath: string, endpoint: string) {
      // Replay API requests from HAR.
      // Either use a matching response from the HAR,
      // or abort the request if nothing matches.
      await page.routeFromHAR(harFilePath, {
        url: endpoint,
        update: false,
      })
    }
    await use(replayFromHARFile)
  },
  waitForAPIrepsonse: async ({ page }, use) => {  
    async function waitForAPIrepsonse(endpoint: string, element: Locator) {
      const responsePromise = page.waitForResponse(endpoint)
      await element.click()
      const response = await responsePromise
      expect(response.status()).toBe(200)
    }
    await use(waitForAPIrepsonse)
  }
})


export const test = mergeTests(APIFixture, pageObjectFixture, loginFixture, testAccountFixture, testDataFixture)

export { expect }

export * from '@playwright/test'