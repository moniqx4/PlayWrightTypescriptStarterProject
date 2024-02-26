import { test, expect } from '../fixtures/services'

test.describe('Test API Tests', () => {
  /* this test is an example of interepting an API call, and injecting it with my own test data and then displaying it on the page */

  test.beforeEach(async ({ page }) => {
    // this line allows logging of the requests being made during test, and writes it out to the console, method, resourceType and url
    page.on('request', (req) =>
      console.log(`<< : ${req.method()} ${req.resourceType()} ${req.url()})`)
    )

    // this line allows logging of the responses being made during test, and writes it out to the console with status and the url
    page.on('response', (req) =>
      console.log(`<< : ${req.status()} ${req.url()})`)
    )

    page.route('https://danube-webshop.herokuapp.com/api/books', (route) => {
      console.log(route.request().url())
      // this will run without loading the image files
      if (route.request().resourceType() === 'image') {
        return route.abort()
      }
      return route.continue()
    })
  })
  test('intercept call', async ({ page }) => {
    const responseObject = [
      {
        author: 'Automated Tester',
        genre: 'novel',
        id: 1,
        price: '4.95',
        rating: '*****',
        stock: '1',
        title: 'Adventures in Request Interception'
      }
    ]

    await page.route(
      'https://danube-webshop.herokuapp.com/api/books',
      (route) => {
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(responseObject)
        })

        page.on('response', (req) => {
          expect(req.status()).toEqual(200)
        })
      }
    )

    await page.goto('https://danube-webshop.herokuapp.com/')

    /* Takes a screenshot that can be viewed to see the webpage was displaying the changed item to what was in the responseObject set above */
    await page.screenshot({ path: 'test-artifacts/screenshots/webshop_ss.png' })

    await page.close()
  })
})
