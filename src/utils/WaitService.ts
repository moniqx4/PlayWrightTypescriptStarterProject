import { expect, Page } from '@playwright/test'

/** The function takes in an endpoint path , wrapping to wait on some specified element action that fires off an api event, and then waits
 * til that event has complete
 * When to Use: when you have a transistion that may not load immediately, or might need to wait on some event in the background to complete.
 * @param  {string} endpointPath, the endpoint path, is a fuzzy search, so use the part of path that is unique to that type of call, but
 * does not need to be the entire path
 * @param  {()=>any} elementAction, the element action method ex. page.locator('some locator').click()
 */
export async function interceptAndWait(
	page: Page,
	endpointPath: string,
	elementAction: () => Promise<any>
) {
	console.log(
		'intercepting endpoint call, doing element action, and waiting for it to complete'
	)
	return await page.route(`**/${endpointPath}**`, async (route) => {
		const response = await page.request.fetch(route.request())
		route.fulfill({
			response
		})
		elementAction()
		page.waitForResponse(`@${endpointPath.toLowerCase()}`)
	})
}

export async function interceptAndWaitValidate(
	page: Page,
	endpointPath: string,
	elementAction: () => void
) {
	console.log(
		'intercepting endpoint call, doing element action, and waiting for it to complete'
	)
	return await page.route(`**/${endpointPath}**`, async (route) => {
		const response = await page.request.fetch(route.request())
		route.fulfill({
			response
		})
		elementAction()
		page.waitForResponse(`@${endpointPath.toLowerCase()}`)
		expect(response.status()).toBe(200)
	})
}
