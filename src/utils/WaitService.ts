import { expect, Locator, Page } from '@playwright/test'

/** The function takes in an endpoint path , wrapping to wait on some specified element action that fires off an api event, and then waits 
 * til that event has complete  
 * When to Use: when you have a transistion that may not load immediately, or might need to wait on some event in the background to complete. 
 * @param  {string} endpointPath, the endpoint path, is a fuzzy search, so use the part of path that is unique to that type of call, but 
 * does not need to be the entire path  
 * @param  {()=>any} elementAction, the element action method ex. page.locator('some locator').click() 
 */ 
 export async function interceptAndWait(page: Page, endpointPath: string, elementAction: () => Promise<any>){ 
  console.log('intercepting endpoint call, doing element action, and waiting for it to complete') 
  return await page.route(`**/${endpointPath}**`, async route => { 
    const response = await page.request.fetch(route.request()) 
    route.fulfill({ 
      response 
    }) 
    elementAction() 
    page.waitForResponse(`@${endpointPath.toLowerCase()}`) 
  }) 
} 

export async function interceptAndWaitValidate(page: Page, endpointPath: string, elementAction: () => void) { 
  console.log('intercepting endpoint call, doing element action, and waiting for it to complete') 
  return await page.route(`**/${endpointPath}**`, async route => { 
    const response = await page.request.fetch(route.request()) 
    route.fulfill({ 
      response 
    }) 
    elementAction() 
    page.waitForResponse(`@${endpointPath.toLowerCase()}`) 
    expect(response.status()).toBe(200); 
  }) 
}


/** Wait for Event then run page action, for example page.locator('somelocator').click()
 * @param  {any} eventType
 * @param  {Promise<Locator>} elementAction
 */
 export async function waitForEventRunAction(page: Page, eventType: any, elementAction: Promise<Locator>): Promise<void> {
  const [popup] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.
    await page.waitForEvent(eventType),    
    await elementAction
  ])
}

export async function pollForEndpointResponse(page: Page, endpoint: string, timeout= 10000) {
  await expect.poll(async () => {
    const response = await page.request.get(endpoint);
    return response.status();
  }, {
    // Custom error message, optional.
    message: 'make sure API eventually succeeds', // custom error message
    // Poll for 10 seconds; defaults to 5 seconds. Pass 0 to disable timeout.
    timeout: timeout,
  }).toBe(200);
}

export const WaitService = {
  interceptAndWaitValidate,
  interceptAndWait,
  waitForEventRunAction,
  pollForEndpointResponse
}