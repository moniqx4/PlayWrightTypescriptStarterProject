import { type Locator, type Page } from "@playwright/test"
import { stringify } from "querystring"
import { ReportListPage } from '../../page-objects/ReportListPage';

export interface PageObject {
  name: string
  type: 'page' | 'component' | 'drawer' | 'element'
  elements: PWElement[]
}

export type PWElement = {
  name: string
  locatorType: 'locator' | 'getByTestId' | 'getByTitle' | 'getByPlaceholder' | 'getByText' | 'getByRole' | 'getByLabelText' | 'getByAltText' | 'getByAttribute' 
  role?: 'link' | 'button' | 'checkbox' | 'combobox' | 'gridcell' | 'link' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'radio' | 'switch' | 'tab' | 'textbox' | 'treeitem'
  selector?: string
  attributNamee?: string
  locatorString: string
  variables?: Record<string, string>
  index?: number
}

export type ElementType = {
  pageName: PageNames
  elementName: string
  locatorType: 'basic' | 'daid' | 'text' | 'role' | 'label' | 'alt' | 'attribute' | 'title'
  locatorString: string
}

export enum PageNames{
  ReportListPage,
  LoginPage,
}

export function getElementLocatorByName(pageName: string, locatorName: string){
  // search for all with the pageName of x
  // and filter for the one with the locator name of y
  //return the locatorString
}

export function getElementLocatorById(elementId) {
  // search for locatorstring by the id

}


// export function getLocator(page: Page, element: PWElement) {
//   switch (element.locatorType) {
//     case 'locator': return page.locator(element.locatorString)
//     case 'getByTestId': return page.getByTestId(element.locatorString)
//     case 'getByTitle': return page.getByTitle(element.locatorString)
//     case 'getByPlaceholder': return page.getByPlaceholder(element.locatorString)  
//     case 'getByText': return page.getByText(element.locatorString)
//     case 'getByRole': return page.getByRole({ name: `${element.role}`} , element.locatorString)
//     case 'getByLabelText': return page.getByLabel(element.locatorString)
//     case 'getByAltText': return page.getByAltText(element.locatorString)
//     case 'getByAttribute': return page.getAttribute(element.selector,element.attributName)
    

//   }

// }



//query by page name ( must be unique)
// getLocator(elementName: string, locatorType: string, locatorString: string, variables?: Record<string, string>, index?: number): string