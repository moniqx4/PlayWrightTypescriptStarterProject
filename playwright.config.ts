import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  retries: 2,
  reporter: 'line',
  use: {
    launchOptions: {
      slowMo: 200
    },
    baseURL: 'http://uitestingplayground.com',
    headless: false,
    trace: 'retain-on-failure',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true
  }
}

export default config
