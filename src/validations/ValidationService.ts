import { Locator, Page, expect } from '@playwright/test' 

async function pageTitleCheck(page: Page, expectedPageTitle: string): Promise<void>{ 
  const pageTitle = await page.title()   
  return expect(pageTitle === expectedPageTitle).toBeTruthy() 
}  
function textValueComparison(expectText: string, actualText: string): void{   
  return expect(actualText).toBe(expectText)   
} 
function booleanComparison(expectResult: boolean, actualResult: boolean): void { 
  return expect(actualResult && expectResult).toBeTruthy() 
} 
function textEquals(element:Locator , expectedText:string): void { 
  //@ts-ignore 
  return expect(element, { hasText: expectedText}).toBeTruthy()  
} 
export const ValidationService = { 
  booleanComparison, 
  textValueComparison, 
  textEquals, 
  pageTitleCheck 
}