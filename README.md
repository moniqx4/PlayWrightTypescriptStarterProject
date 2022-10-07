# Getting Started with Playwright, and Typescript

This is a starter project for Playwright, pre-configured with Typescript.
Playwright is a test automation tool for developing tests. [Playwright.dev](https://www.playwright.dev) for official docs

Examples are testing against the UI Test Automation Playground page [UI Test Playground](http://www.uitestingplayground.com/)

## Project Structure

- constants - re-used constant strings, enums, data fixtures or data models can go here
- page-objects - for POM design for page objects
  -- Example as a Functional Page Object Module, and also example Class Page Object
- tests - where all tests are stored and executed from
- utils - shared utils that are not test specific would be stored here
- validations - shared re-useable validation code, for ex. validateTextMatch(actualText: string, expectedText:string)
- screenshots - for storing any generated screenshots
- videos - for storing any generated videos

## Configuration Files

- tsconfig.json
- global-setup
- global-teardown
- playwright.config
## Updated with v1.27 of Playwright

## How to run tests

- type in the following:  npx playwright test
this will run all tests in the tests directory, as headed test ( set in the playwright config), its set to also run any that fail twice before failing it
- to run a single test, type in the following:  npx playwright test TestAPIExample.test.ts (change to the name of the test file you want to run)



## Teaching Module
-- Install of Playwright
-- Configuring Playwright
--- Planning your configuration, and things to consider

-- Page Objects
--- Creating a Class based Page Object
--- Creating a Function based Page Object


-- Test Helpers


