import { test as base, expect, mergeTests } from '@playwright/test'
import { pageObjectFixture } from './page-objects'

type LoginFixture = {

}

export const loginFixture = base.extend<LoginFixture>({

})


export const test = mergeTests(loginFixture, pageObjectFixture)

export { expect }

export * from '@playwright/test'