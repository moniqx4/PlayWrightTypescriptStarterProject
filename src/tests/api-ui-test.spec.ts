import { test, expect, APIRequestContext } from '../fixtures/api-fixture'

const REPO = 'test-repo-1'
const USER = 'github-username'

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/vnd.github.v3+json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      'Authorization': `token ${process.env.API_TOKEN}`,
    },
  })
})

test.afterAll(async ({ }) => {
  // Dispose all responses.
  await apiContext.dispose()
})

test('last created issue should be first in the list', async ({ page }) => {
  const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Feature] request 1',
    }
  })

  expect(newIssue.ok()).toBeTruthy()

  await page.goto(`https://github.com/${USER}/${REPO}/issues`);
  const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first()
  await expect(firstIssue).toHaveText('[Feature] request 1')
})

test('last created issue should be on the server', async ({ page }) => {
  await page.goto(`https://github.com/${USER}/${REPO}/issues`)
  await page.getByText('New Issue').click()
  await page.getByRole('textbox', { name: 'Title' }).fill('Bug report 1')
  await page.getByRole('textbox', { name: 'Comment body' }).fill('Bug description')
  await page.getByText('Submit new issue').click()
  const issueId = page.url().substr(page.url().lastIndexOf('/'))

  const newIssue = await apiContext.get(
    `https://api.github.com/repos/${USER}/${REPO}/issues/${issueId}`
  )

  expect(newIssue.ok()).toBeTruthy()
  expect(newIssue.json()).toEqual(expect.objectContaining({
    title: 'Bug report 1'
  }))
})