import { Browser, Page, BrowserContext } from '@playwright/test'

declare global {
  namespace PlaywrightTest {
    const browser: Browser
    const page: Page
    const context: BrowserContext
    const browserName: string    
  }
}
