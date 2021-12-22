# Getting Started with Playwright, Typescript with JEST #

This is a starter project for Playwright, pre-configured with Typescript and JEST.
Playwright is a test automation tool for developing tests. [Playwright.dev](https://www.playwright.dev) for official docs

Examples are testing against the UI Test Automation Playground page [UI Test Playground](http://www.uitestingplayground.com/)

## Project Structure ##

- constants - re-used constant strings, enums, data fixtures or data models can go here
- page-objects - for POM design for page objects
-- Example as a Functional Page Object Module, and also example Class Page Object
- templates - place to store anything that is a template for creating standard file, ex. pageobject or test
- tests - where all tests are stored and executed from
- utils - shared utils that are not test specific would be stored here
- validations - shared re-useable validation code, for ex. validateTextMatch(actualText: string, expectedText:string)
- screenshots - for storing any generated screenshots
- videos - for storing any generated videos

## Configuration Files ##

- jest.config: configures jest to work with playwright
- jest.debug-setup:
- launch.json: 
- tsconfig.json:

