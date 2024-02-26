import { Locator, Page, selectors } from "@playwright/test"

// Must be a function that evaluates to a selector engine instance.
const createTagNameEngine = () => ({
  // Returns the first element matching given selector in the root's subtree.
  query(root: { querySelector: (arg0: any) => any; }, selector: any) {
    return root.querySelector(selector)
  },

  // Returns all elements matching given selector in the root's subtree.
  queryAll(root: { querySelectorAll: (arg0: any) => Iterable<unknown> | ArrayLike<unknown>; }, selector: any) {
    return Array.from(root.querySelectorAll(selector));
  }
})

// Register the engine. Selectors will be prefixed with "tag=".
selectors.register('data-automation-id', createTagNameEngine)

const getByDataAutomationId = (page: Page, locator: string) => page.locator(`data-automation-id=${locator}`)

async function elementIsEnabledDisplayed(element: Locator) {
  try {
    return await element.isVisible() && element.isEnabled()
  } catch (error) {
    console.log(`Error: ${error}`)
    return false
  }
}

async function fillAndClearTextbox(element: Locator, textValue: string){
  console.log('Clearing and then filling textbox')

  await element.fill("")
  return await element.fill(textValue)  
}

export enum ElementType {
  BUTTON = 'button',
  HEADING = 'heading',
  ROW = 'row',
  CELL = 'cell',
  GRIDCELL = 'gridcell',
  LINK = 'link',
  LISTITEM = 'listitem',
  CHECKBOX ='checkbox',
}

export type RolesLocators = { 
  elementType1: ElementType
  roleName1: string
  elementType2: ElementType
  roleName2: string
}

export type RoleFilter = { 
  elementType: ElementType
  filterText: string
  roleName: ElementType  
}

/** 
 * @description gets a locator using the locator and then filter's by some text
 * @param  {Page} page - required to be passed 
 * @param  {string} locator - the actual locator string
 * @param  {string} filterText - what to text to filter on
 * 
 * @returns Locator - this is basically an element
 * @example generated locator: page.locator('button').filter({ hasText: 'some filter text' }).locator('button') , set like this: byLocatorsFilter(page, 'button','some filter text')
 */
function byLocatorsFilter(page: Page, locator: string, filterText: string): Locator {  
  return page.locator(locator).filter({ hasText: filterText }).locator(locator)  
}


function byRolesLocators(page: Page, rolesLocators: RolesLocators): Locator {  
  return page.getByRole(rolesLocators.elementType1, { name: rolesLocators.roleName1}).getByRole(rolesLocators.elementType2, { name: rolesLocators.roleName2 })
}

/**
 * @description gets a locator using the locator set Role,  and then filter's by some text
 * @param  {Page} page - required to be passed 
 * @param  {ElementType} elementType - the valid elementType Roles that can be set
 * @param  {string} roleName - what to text of the element is
 * 
 * @returns Locator - this is basically an element
 * @example generated locator: page.getByRole(elementType.BUTTON, { name: 'Save' }) , set like this:  byRoleLocator(page, elementType.BUTTON, 'Save')
 */
function byRoleLocator(page: Page, elementType: ElementType, roleName: string ): Locator {  
  return page.getByRole(elementType, { name: roleName })
}

/**
 * @description gets a locator using the locator's set Role,  and then filter's by some text and then the roleName
 * @param  {Page} page - required to be passed 
 * @param  {RoleFilter} roleFilter - the valid elementType Roles that can be set, filtertext - the text to filter on , roleName - what to text of the element is
 * 
 * @returns Locator - this is basically an element
 * @example generated locator: page.getByRole(elementType.BUTTON, { name: 'Save' }).filter({hasText: 'some filter text'}).getByRole(elementType.LINK), set like this:  byRoleFilter(page, {elementType.BUTTON, 'some filter text', elementType.LINK})
 */
function byRoleFilter(page: Page, roleFilter: RoleFilter): Locator {  
  return page.getByRole(roleFilter.elementType).filter({ hasText: roleFilter.filterText }).getByRole(roleFilter.roleName)  
}


function byPlaceholderText(page: Page, placeholder: string): Locator {
  return page.getByPlaceholder(placeholder, { exact: true })
}

/**
 * @description gets a locator using the locator and then the placeholder of that locator
 * @param  {Page} page - required to be passed 
 * @param  {string} locator - the actual locator string 
 * @param  {string} placeholder - the actual placeholder text
 * 
 * @returns Locator - this is basically an element
 * @example generated locator: page.locator('somelocator').getByPlaceholder('some placeholder') , set like this: byLocatorPlaceholder(page, 'somelocator', 'some placeholder')
 */
function byLocatorPlaceholder(page: Page, locator: string, placeholder: string): Locator{
  return page.locator(locator).getByPlaceholder(placeholder)
}


export const ElementService = {
  getByDataAutomationId,
  elementIsEnabledDisplayed,
  fillAndClearTextbox,
  byRolesLocators,
  byPlaceholderText,
  byLocatorPlaceholder,
  byRoleFilter,
  byRoleLocator,
  byLocatorsFilter
}