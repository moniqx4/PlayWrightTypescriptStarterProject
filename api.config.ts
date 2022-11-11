import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
	globalSetup: require.resolve('./global-setup'),
	globalTeardown: require.resolve('./global-teardown'),
	testDir: './api-tests',
	outputDir: '../test-artifacts/',
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		['line'],
		[
			'allure-playwright',
			{
				detail: true,
				outputFolder: 'allure-results',
				suiteTitle: false
			}
		]
	],
	/* Maximum time one test can run for. */
	timeout: 30 * 1000,
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
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	testMatch: ['/*.test./**/*.+(ts)', '**/?(*.)+(test).+(ts)'],
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
		viewport: { width: 1024, height: 768 },
		ignoreHTTPSErrors: true,
		storageState: 'state.json',
		launchOptions: {
			headless: false,
			tracesDir: '../test-artifacts/api-trace'
		}
	},
	/* Configure projects for major browsers - one for each environment */
	projects: [
		{
			name: 'chromium',
			use: {
				baseURL: '',
				browserName: `chromium`,
				channel: `chrome`,
				launchOptions: {
					headless: true,
					tracesDir: '../test-artifacts/api-trace'
				},
				...devices['Desktop Chrome']
			}
		}
	]
}

export default config
