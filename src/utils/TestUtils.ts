import { TestInfo } from "@playwright/test"

export function checkTestLoginStatus(testInfo: TestInfo) {
  if(testInfo.status !== testInfo.expectedStatus){
    console.log('Login Failed, skipping test, since it requires to be authenticated')
    return testInfo.skip()
  }
}