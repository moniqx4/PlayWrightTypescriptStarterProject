import { Page } from '@playwright/test'

export type loginType = {  
  username: string
  password: string
}

async function loginToWebsite(page: Page, loginCred: loginType){

  //enter in username
  await page.getByLabel('Username', {exact: true}).type(loginCred.username)  

  //enter in password
  await page.getByLabel('Password', {exact: true}).type(loginCred.password)

  //click Login button
  await page.getByRole('button', {name: 'Login'}).click()

}

export const LoginService = {
  loginToWebsite
}