import { test, expect } from '@playwright/test'

test.describe('Test Playground Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('clicking button that ignores dom event ', async ({ page }) => {
    await page.locator('text="Click"').click()
    await page.locator('#badButton').click()
    expect(page.locator('.btn.btn-success')).toBeTruthy()
  })

  /* Test purposely set to fail to show example of failures*/
  test('checking element visibility', async ({ page }) => {
    await page
      .locator('#navbarSupportedContent > ul > li:nth-child(1) > a')
      .click()
    await page.locator('text="Visibility"').click()
    await page.locator('text="Hide"').click()
    expect(page.locator('text="Removed"')).toBeNull()
  })
})
