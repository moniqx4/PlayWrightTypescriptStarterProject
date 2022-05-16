import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  retries: 1,
  reporter: 'line',
  use: {
    launchOptions: {
      slowMo: 250
    },
    baseURL: 'http://uitestingplayground.com',
    headless: false,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true
  }
}

export default config
