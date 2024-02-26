import { Tags } from '../constants'
import { expect, test } from '../fixtures/api-fixture'



const endpoint = ''
const postRequestEndpoint = ''
// example request data object, change to include your api request body
const requestDataObject = { 
  title: '',
  body: ''
}
// example data object, change to include your api request body
const dataObject = {  
  title: '',
  body: ''
}

const expectedDataObject = {
  title: '',
  body: ''
}

// Reset storage state for this file to avoid being authenticated, when global auth is being used for the entire project
test.use({ storageState: { cookies: [], origins: [] } })

test.describe(`testsuite_name ${Tags.API}`, () => {

  test.beforeAll(async ({ request }, testInfo) => { 
    // Create a new repository
    const response = await request.post(postRequestEndpoint, {
      data: requestDataObject
    })
    expect(response.ok()).toBeTruthy()
  })

  test.afterAll(async ({page}) => {
    await page.close()
  })

  test('should create a bug report', async ({ request }) => {
    const newPostCall = await request.post(endpoint, {
      data: dataObject
    })
    expect(newPostCall.ok()).toBeTruthy()

    const responseData = await request.get(endpoint)
    expect(responseData.ok()).toBeTruthy();
    expect(await responseData.json()).toContainEqual(expect.objectContaining(expectedDataObject))
  })
})

