import { devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const baseConfig = {
  //globalSetup: require.resolve('./config/global-setup-tin'),
  // globalSetup: require.resolve('./global-setup'),
  testDir: './tests',  
  outputDir: '',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:  [ 
    ['line'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }] 
  ],
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  testMatch: ["/*.test./**/*.+(ts)", "**/?(*.)+(test).+(ts)"],  
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: '',
    headless: true,
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure', 
    screenshot: 'only-on-failure',
    viewport: { width: 1720, height: 1280 },
    ignoreHTTPSErrors: true,
    storageState: 'state.json',    
    launchOptions: {
      slowMo: 500,
      headless: true,
      tracesDir: '',                           
    },   
  },

  /* Configure projects for major browsers - one for each environment */
  projects: [
    {
      name: 'chrome',
      use: {
        baseURL: '',
        browserName: `chromium`,
        channel: `chrome`,
        launchOptions: {          
          headless: true,
          tracesDir: '',                           
        }, 
        storageState: 'state.json',
        //testUsers: '../testData/testusers/testusers-tin',   
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'chromium-bronze',
      use: {
        baseURL: 'https://bronzeapp.qa.paylocity.com/reporting/reports',
        browserName: `chromium`,
        channel: `chrome`,
        launchOptions: {          
          headless: true,
          tracesDir: '',                           
        },
        storageState: 'state.json',
        ...devices['Desktop Chrome'],
      },
    },    
    {
      name: 'firefox-tin',
      use: {
        browserName: `firefox`,
        channel: `firefox`,
        launchOptions: {          
          headless: true,
          tracesDir: '',                           
        },
        storageState: 'state.json',
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'firefox-bronze',
      use: {        
        browserName: `firefox`,
        channel: `firefox`,
        launchOptions: {          
          headless: true,
          tracesDir: '',                           
        },
        storageState: 'state.json',
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit-tin',
      use: {
        browserName: `webkit`,
        channel: `webkit`,
        launchOptions: {          
          headless: true,
          tracesDir: '',                           
        },
        storageState: 'state.json',
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'webkit-bronze',      
      use: {
        baseURL: '',
        browserName: `webkit`,
        channel: `webkit`,
        launchOptions: {          
          headless: true,
          tracesDir: '',                           
        },
        storageState: 'state.json',
        ...devices['Desktop Safari'],
      }
  },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
}

//export default baseConfig;