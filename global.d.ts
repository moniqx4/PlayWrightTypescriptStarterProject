import { Browser, Page, BrowserContext, PlaywrightTestArgs } from '@playwright/test'

declare global { 
  namespace PlaywrightTest { 
    const browser: Browser 
    const page: Page 
    const context: BrowserContext 
    const browserName: string 
    const request: Request 
    const response: Response 
    const test: PlaywrightTestArgs 
  } 
}