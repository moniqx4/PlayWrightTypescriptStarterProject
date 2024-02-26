import { test as base, expect } from '@playwright/experimental-ct-react'
import { pageObjectFixture } from './page-objects'
import { loginFixture } from './login'
import { testAccountFixture } from './test-accounts'
import { testDataFixture } from './test-data'

type ComponentTestFixture = {

}

export const test = base.extend<ComponentTestFixture>({

})




export { expect }

export * from '@playwright/test'