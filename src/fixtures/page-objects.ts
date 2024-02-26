import { test as base, expect, mergeTests } from '@playwright/test'
import { servicesFixture } from './services'
import { testAccountFixture } from './test-accounts'
import { loginFixture } from './login'
import { ReportListPage } from '../page-objects/ReportListPage'

type PageObjectFixture = {
  reportListPage: ReportListPage
}

export const pageObjectFixture = base.extend<PageObjectFixture>({
  reportListPage: async ({ page }, use) => {
    await use(new ReportListPage(page))
  },
})


export const test = mergeTests(pageObjectFixture, servicesFixture, testAccountFixture, loginFixture)

export { expect }

export * from '@playwright/test'