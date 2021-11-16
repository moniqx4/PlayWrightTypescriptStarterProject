import { Browser, Page, Context } from "playwright";
declare global {
  const browser: Browser;
  const page: Page;
  const context: Context;
  const browserName: string;
}
