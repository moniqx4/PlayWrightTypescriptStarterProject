import _ from 'lodash'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'
import { ReportType } from '../constants'


function convertReportNameToActionLocator(reportName: string, reportType: ReportType): string{
  let convReportType = reportType.toLowerCase() + '-'
  let lcReportName = reportName.toLowerCase()  
  let convReportName = _.replace(lcReportName,/\s+/g,'-')
  return convReportType + convReportName
}

function convertReportNameToLocator(reportName: string): string{ 
  let lcReportName = reportName.toLowerCase()  
  return _.replace(lcReportName,/\s+/g,'-') 
}

const customReportPath = (customReportName: string, domainKey: string) => `reporting/reports/${customReportName}/columns/edit?domainkey=${domainKey}`

function reportSelectionCheckboxLocator(reportName: string, reportType: ReportType){
  let lcReportName = reportName.toLowerCase() 
  let renamedReport = _.replace(lcReportName,/\s+/g,'-')

  return `report-list-report-checkbox-$${reportType.toLowerCase()}-${renamedReport}`
}

const additionalColumnCheckboxLocator = (columnName: string) => {
  let lcColName = columnName.toLowerCase() 
  let convertedColName = _.replace(lcColName,/\s+/g,'-') 
  return 'column-selection-column-' + convertedColName  
}

/** provide filename  ( including directory if not in the root directory of valid csv file)
 * @param  {string} filename
 * @returns records
 * Example CSV: 
 * "test_case","some_value","some_other_value"
 * "value 1","value 11","foobar1"
 * 
 * Example usage for data driven test
 * for (const record of records) {
  test(`fooo: ${record.test_case}`, async ({ page }) => {
    console.log(record.test_case, record.some_value, record.some_other_value);
  });
* see: https://playwright.dev/docs/test-parameterize#passing-environment-variables
}
 */
function parseCSVfile(filename: string): any {

  let records = parse(fs.readFileSync(path.join(__dirname, filename)), {
    columns: true,
    skip_empty_lines: true
  })

  return records
}

export const StringConvertors = {
  convertReportNameToLocator,
  convertReportNameToActionLocator,
  customReportPath,
  reportSelectionCheckboxLocator,
  additionalColumnCheckboxLocator,
  parseCSVfile
}