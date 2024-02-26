import {request, test as setup} from '@playwright/test'

//example http Credentails object, replace with your own
const httpCredentialsObj = {
  username: 'user',
  password: 'passwd'
}

//exmaple endpoint url, replace with your own
const endpointUrl = 'https://api.example.com/login'

setup('context request will share cookie storage with its browser context', async ({ 
  browser
}) => {
  const requestContext = await request.newContext({
    httpCredentials: httpCredentialsObj
  })

  await requestContext.get(endpointUrl)

  // Save storage state into the file.
  await requestContext.storageState({ path: 'apistate.json' })

  // Create a new context with the saved storage state.
  const context = await browser.newContext({ storageState: 'apistate.json' })
  // const page = await context.newPage()
})

 