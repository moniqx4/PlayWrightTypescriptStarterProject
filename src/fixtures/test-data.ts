import { test as base, expect, mergeTests } from '@playwright/test'
import { pageObjectFixture } from './page-objects'
import { dynamicRunAllTestData } from '../tests/dynamic-report-tests/dynamicRunAllData'

type TestDataFixture = {
  dynamicRunAllTestData: typeof dynamicRunAllTestData
}

export const testDataFixture = base.extend<TestDataFixture>({
  
})


export const test = mergeTests(testDataFixture, pageObjectFixture)

export { expect }

export * from '@playwright/test'