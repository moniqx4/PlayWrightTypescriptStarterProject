import PlaywrightEnvironment from "jest-playwright-preset/lib/PlaywrightEnvironment";
import { globalSetup as playwrightGlobalSetup } from 'jest-playwright-preset';
import { CustomEnvironment } from './CustomEnvironment';

module.exports = async function globalSetup(globalConfig) {
  await playwrightGlobalSetup(globalConfig);

  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();
  const browser = await chromium.connect({ wsEndpoint: wsEndpoint });
  const page = await browser.newPage();

  // your login function
  await doLogin(page);

  // store authentication data
  const storage = await page.context().storageState();
  process.env.STORAGE = JSON.stringify(storage);
};
