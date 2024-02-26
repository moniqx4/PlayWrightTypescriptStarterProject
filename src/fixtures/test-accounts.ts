import { test as base, expect, mergeTests } from '@playwright/test'
import { pageObjectFixture } from './page-objects'
import { Environments, EmployeeModel } from '../constants'

type TestAccountFixture = {
  getUser: (testEnvironment: Environments) => EmployeeModel
}

export const testAccountFixture = base.extend<TestAccountFixture>({

})


export const test = mergeTests(testAccountFixture, pageObjectFixture)

export { expect }

export * from '@playwright/test'