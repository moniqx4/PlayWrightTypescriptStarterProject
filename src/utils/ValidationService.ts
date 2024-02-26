import { Locator, Page, expect } from '@playwright/test' 

async function pageTitleAssertion(page: Page, expectedPageTitle: string){ 
  const pageTitle = await page.title()   
  return expect(pageTitle === expectedPageTitle).toBeTruthy() 
}  
function textValueComparisonAssertion(expectText: string, actualText: string): void{   
  return expect(actualText).toBe(expectText)   
} 
function booleanComparisonAssertion(expectResult: boolean, actualResult: boolean): void { 
  return expect(actualResult && expectResult).toBeTruthy() 
} 

async function textEqualsAssertion(element:Locator , expectedText:string) {
  return expect(await element.textContent()).toEqual(expectedText)
} 

async function datasetAssertion(page: Page, dataset: string[]) {
  console.log('Validating a dataset of elements are present and not null ')

  for(let d in dataset) {
     let element = await page.getByText(d).isVisible()
    expect.soft(element).not.toBeNull()
  }  
}

async function elementDisplayAssertion(page: Page, element: Locator, isDisplayed: boolean) {

  if(isDisplayed !== true){
    return expect(element.isVisible()).toBeFalsy()
  }

  return expect(element.isVisible()).toBeTruthy()
}

export const ValidationService = {
  booleanComparisonAssertion, 
  textValueComparisonAssertion, 
  textEqualsAssertion, 
  pageTitleAssertion,
  datasetAssertion,
  elementDisplayAssertion
}