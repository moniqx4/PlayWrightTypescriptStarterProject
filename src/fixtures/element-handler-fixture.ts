import { Locator, test as base, expect, mergeTests } from '@playwright/test'
import { pageObjectFixture } from './page-objects'
import { loginFixture } from './login'
import { testAccountFixture } from './test-accounts'
import { testDataFixture } from './test-data'
import path from 'path'

type ElementHandlerFixture = {
  selectOptionSingleSelector: (selector: string, value: string) => Promise<void>
  selectOptionMultipleSelector: (selector: string, value: string) => Promise<void>
  getElementText: (element: Locator) => Promise<string>
  clickOnlyVisibleElement: (element: Locator) => Promise<void>
  getElementByFilter: (element: Locator, filter: string) => Promise<Locator>
  evaluateAllElementText: (elements: Locator) => Promise<string[]>
  iterateOverElementsGetText: (element: Locator) => Promise<Array<string>>
  uploadFileFromBuffer: (element: Locator, fileName: string, bufferText: string) => Promise<void>
  uploadFile: (element: Locator, fileName: string) => Promise<void>
  removeSelectedUploadFiles: (element: Locator) => Promise<void>
  selectMultipleFilesForUpload: (element: Locator, fileNames: string[]) => Promise<void>
  dragDropElement: (source: Locator, target: Locator) => Promise<void>
}

export const elementHandlerFixture = base.extend<ElementHandlerFixture>({
  clickOnlyVisibleElement: async ({ }, use) => {
    async function clickOnlyVisibleElement(element: Locator) {
      await element.locator('visible=true').click()
    }
    await use(clickOnlyVisibleElement)
  },
  getElementByFilter: async ({ }, use) => {
    async function getElementByFilter(element: Locator, filter: string) {
      return element.filter({ hasText: filter }).first()
    }
    await use(getElementByFilter)
  },
  evaluateAllElementText: async ({ }, use) => {
    console.log('getting the text of elements, a location that returns a list of elements...')
    async function evaluateAllElementText(elements: Locator) {
      const texts = await elements.evaluateAll(
        list => list.map(element => element.textContent || '')
      )
      return texts
    }
    await use(evaluateAllElementText)
  },
  iterateOverElementsGetText: async ({ }, use) => {
    async function iterateOverElements(element: Locator): Promise<string[]> {
      let row: Locator // Declare the variable 'row'
      let textArray: string[] = [] // Declare the variable 'textArray'
      for (row of await element.all()) { // Assign the value to 'row'
        console.log(await row.textContent())
        const text = await row.textContent() ?? '' // Return an array with the text content
        textArray.push(text) // Return an array with the text content
        return textArray
        // Return an array with the text content
      }
      return [] // Return an empty array if no elements are found
    }
    await use(iterateOverElements)
  },
  uploadFileFromBuffer: async ({ }, use) => {
    async function uploadFileFromBuffer(element: Locator, fileName: string, bufferText: string) {
      await element.setInputFiles({
        name: fileName,
        mimeType: 'text/plain',
        buffer: Buffer.from(bufferText)
      })
    }
    await use(uploadFileFromBuffer)
  },
  removeSelectedUploadFiles: async ({ }, use) => {
    async function removeSelectedUploadFiles(element: Locator) {
      await element.setInputFiles([])
    }
    await use(removeSelectedUploadFiles)
  },
  selectMultipleFilesForUpload: async ({ }, use) => {
    async function selectMultipleFilesForUpload(element: Locator, fileNames: string[]) {
      await element.setInputFiles(
        fileNames.map(fileName => ({
          name: fileName,
          mimeType: 'text/plain',
          buffer: Buffer.from('')
        }))
      )
    }
    await use(selectMultipleFilesForUpload)
  },
  uploadFile: async ({ }, use) => {
    async function uploadFile(element: Locator, fileName: string) {
      await element.setInputFiles(path.join(__dirname, fileName))
    }
    await use(uploadFile)
  },
  dragDropElement: async ({ }, use) => {
    async function dragDropElement(source: Locator, target: Locator) {
      await source.dragTo(target)
    }
    await use(dragDropElement)
  },
})


export const test = mergeTests(elementHandlerFixture, pageObjectFixture, loginFixture, testAccountFixture, testDataFixture)

export { expect }

export * from '@playwright/test'