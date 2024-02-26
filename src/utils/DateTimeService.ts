import dayjs from "dayjs"
import duration from "dayjs/plugin/duration" // need this, even if it appears its not in use, DO NOT remove

function createRandomTimeMinute(): number{
  return Math.floor(Math.random() * 60)
}

function createRandomTimeHour(): number{
  return Math.floor(Math.random() * 24)
}

function currentTimeHours(): number{
  return new Date(Date.now()).getHours()
}

function currentTimeMinutes(): number{
  return new Date(Date.now()).getMinutes()
}

export enum BeforeAfterCurrentDate {
  Before,
  After,
}

export enum DateFormat {
  MMDDYYYY,
  DDMMYYYY,
}

function currentDateToISOFormat(): string {  
  return dayjs().format("YYYY-MM-DD")
}

function previousDaysAgoToISOFormat(daysAgo: number): string{

  const previousDayISO = dayjs().subtract(daysAgo, 'day').format('YYYY-MM-DDTHH:mm:ss')
  console.log(`previous day time ${previousDayISO}`)

  return previousDayISO 
}

/**Gets the current Date and can format as MM/DD/YYYY (default) or set to DD/MM/YYYY
 * @param  {DateFormat=DateFormat.MMDDYY} dateFormat, optional, by default will set to MM/DD/YYYY format
 */
function getCurrentDate(dateFormat: DateFormat = DateFormat.MMDDYYYY): any {
  let today = dayjs()

  return formatAnyDate(today, dateFormat)
}

/**Takes in a date and formats to format specified
 * @param  {DateFormat} dateFormat
 * @param  {any} date
 */
function formatAnyDate(date: any, dateFormat: DateFormat = DateFormat.MMDDYYYY): any {
  if (dateFormat == DateFormat.DDMMYYYY) {
    return dayjs(date).format("DD/MM/YYYY")
  } else {
    return dayjs(date).format("MM/DD/YYYY")
  }
}

/** Formats a date to the ISO Format
 * @param  {any} date, for example 03/11/2022, or pass a method that returns a date
 * @param  {number} hour, any number from  0-23, example 16 is 4:00PM
 * @param  {number} minute, any number from 0-59
 * @param  {DateFormat=DateFormat.MMDDYYYY} dateFormat
 * @param {string} timezone, optional defaults to -07 offset which is CST by default can specify different timezone using the proper offset
 */
function anyDateTimeToISOFormat(
  date: any,
  hour: number,
  minute: number,
  dateFormat: DateFormat = DateFormat.MMDDYYYY,
  timezone: string = "-07"
): string {
  let fdate: string;

  if (dateFormat == DateFormat.DDMMYYYY) {
    fdate = dayjs(date).format("YYYY-DD-MM")
  } else {
    fdate = dayjs(date).format("YYYY-MM-DD")
  }

  let timehr = dayjs().hour(hour).format("HH")
  let timemin = dayjs().minute(minute).format("mm")

  return `${fdate}T${timehr}:${timemin}:00${timezone}`
}

/** This function will add or substract a year from the current date based on the offset, and it formats to MM/DD/YYYY or DD/MM/YYYY as specified
 * @param  {number} offset
 * @param  {BeforeAfterCurrentDate} beforeAfterCurrentDate
 * @param  {DateFormat} dateFormat, defauts to MM/DD/YYYY when not specified
 */

 function getYearOffset(
  offset: number,
  beforeAfterCurrentDate: BeforeAfterCurrentDate,
  dateFormat: DateFormat = DateFormat.MMDDYYYY
){  
  let addYear = dayjs().add(offset, 'year')
  let subtractYear = dayjs().subtract(offset, 'year') 

  if (beforeAfterCurrentDate == BeforeAfterCurrentDate.Before) {
    if(dateFormat == DateFormat.DDMMYYYY){
      return formatAnyDate(subtractYear,DateFormat.DDMMYYYY)  
    } else {
      return formatAnyDate(subtractYear)  
    }
  } else {
    if(dateFormat == DateFormat.DDMMYYYY){ 
      return formatAnyDate(addYear, DateFormat.DDMMYYYY)
    } else {
      return formatAnyDate(addYear)
    }
  }
}

/** This function will add or substract a day from the current date based on the offset, and it formats to MM/DD/YYYY or DD/MM/YYYY as specified
 * @param  {number} offset
 * @param  {BeforeAfterCurrentDate} beforeAfterCurrentDate
 * @param  {DateFormat} dateFormat, defauts to MM/DD/YYYY when not specified
 */
 function getDayOffset(
  offset: number,
  beforeAfterCurrentDate: BeforeAfterCurrentDate, 
  dateFormat: DateFormat = DateFormat.MMDDYYYY
){  
  let addDay = dayjs().add(offset, 'day')
  let subtractDay = dayjs().subtract(offset, 'day') 

  if (beforeAfterCurrentDate == BeforeAfterCurrentDate.Before) {
    if(dateFormat == DateFormat.DDMMYYYY){
      return formatAnyDate(subtractDay, DateFormat.DDMMYYYY)  
    } else {
      return formatAnyDate(subtractDay)  
    }
  } else {
    if(dateFormat == DateFormat.DDMMYYYY){ 
      return formatAnyDate(addDay, DateFormat.DDMMYYYY)
    } else {
      return formatAnyDate(addDay)
    }
  }
}

/** Formats a date such as this example, 03/22/2022 and formats to Friday, March 11, 2022
 * @param  {Date} date
 */
function formatDateToLongDayDate(date: Date | string): string {
  return dayjs(date).format("dddd, MMMM DD, YYYY")
}

export const DateTimeService = {
  createRandomTimeMinute,
  createRandomTimeHour,
  currentTimeHours,
  currentTimeMinutes,
  getDayOffset,
  currentDateToISOFormat,
  getCurrentDate,
  previousDaysAgoToISOFormat,
  anyDateTimeToISOFormat,
  formatAnyDate,
  formatDateToLongDayDate,
  getYearOffset,
}