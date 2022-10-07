import { Page } from 'playwright-core' 

export class ExamplePageClass {
  public param1: string = "test string"; // can be set outside class
  private _param2: string = "another test string"; // only available to class

  readonly page: Page 

  constructor(page: Page) {
    this.page = page 
  }

  static async getParam1(page: Page) {
    this.doSomething(page)
    return await page.locator('somelocator').click()
  }

  static async doSomething(page: Page) {
    return await page.locator('somelocator').click();
  }
}
