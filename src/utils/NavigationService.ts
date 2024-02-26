import { Page } from '@playwright/test'
import { ReportListService} from '../services'
import { Menu, endpointPaths, TopMenu, ReportingMenuOpts } from '../constants'
import { ElementService, interceptAndWait } from '.'

/*__________________________________________________________________________________
--------------------------------- Page Elements ------------------------------------
__________________________________________________________________________________*/

const addButton = (page: Page) => ElementService.getByDataAutomationId(page, '#newEmployee')
const impersonatedUserBanner = (page: Page) => ElementService.getByDataAutomationId(page, '.c-impersonation-bar')

/*__________________________________________________________________________________
--------------------------------- Group Actions  -----------------------------------
__________________________________________________________________________________*/

/**
 * @param  {string} baseUrl
 * @param  {string} pagePath?, optional , pass the page path without the forward slash. Example, reporting/reporting
 * @param  {string} param?, optional, set when page being navigated to has param that needs to be specified, for example a companyId
 * @returns 
 */
function navigateToPageViaUrl(page: Page, baseUrl: string, pagePath?: string, param?: string){
    console.log('Navigating to specified page')

    let newUrl: string 

    if(pagePath != undefined){
      newUrl = `${baseUrl}${pagePath}`
    } else {
      newUrl = baseUrl
    }

    let paramUrl = `${newUrl}${param}`   

    if(param != undefined){      
      return page.goto(paramUrl)
    }
    else {      
      return page.goto(newUrl)
    }   
}

async function navigateToPageViaMenu(page: Page, menu: Menu){
  console.log(`Navigating to page via Menu at topMenu: ${menu.topMenu} menu Opt: ${menu.menuOpt}`)

  await ElementService.getByDataAutomationId(page, menu.topMenu).hover()   
  await interceptAndWait(page, endpointPaths.reportingLog, () => ElementService.getByDataAutomationId(page, menu.menuOpt ?  menu.menuOpt:'').click())
}

async function navigateToReportPageViaMenu(page: Page){
  let reportingMenu: Menu = {
    topMenu: TopMenu.ReportingAnalytics,
    menuOpt: ReportingMenuOpts.Reporting
  }  

  await navigateToPageViaMenu(page, reportingMenu)  
  return await ReportListService.ReportListElements.activeFilterPill(page).isVisible()
}

async function navigateToReportPageAsCompanySet(page: Page){
  let reportingMenu: Menu = {
    topMenu: TopMenu.ReportingAnalytics,
    menuOpt: ReportingMenuOpts.CSReporting
  }  

  await navigateToPageViaMenu(page, reportingMenu)    
  await ReportListService.ReportListElements.createReportButton(page).isVisible()
}

export const NavigationService = {
  addButton,
  impersonatedUserBanner,
  navigateToPageViaUrl,
  navigateToPageViaMenu,
  navigateToReportPageViaMenu,
  navigateToReportPageAsCompanySet
}