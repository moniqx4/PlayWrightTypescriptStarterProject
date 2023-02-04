import { test, expect } from '@playwright/test'


test.describe('Test Playground Tests', () => {
  test.beforeEach(async ({ page }) => {
    // this line allows logging of the requests being made during test, and writes it out to the console, method, resourceType and url
    page.on('request', (req) =>
      console.log(`<< : ${req.method()} ${req.resourceType()} ${req.url()})`)
    )

    // this line allows logging of the responses being made during test, and writes it out to the console with status and the url
    page.on('response', (req) =>
      console.log(`<< : ${req.status()} ${req.url()})`)
    )

    page.route('**.*', (route) => {
      console.log(route.request().url())
      // this will run without loading the image files
      if (route.request().resourceType() === 'image') {
        return route.abort()
      }
      return route.continue()
    })

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
