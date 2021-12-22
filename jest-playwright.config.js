module.exports = {
  verbose: true,
  preset: "jest-playwright-preset",
  testMatch: ["**/src/tests/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  globalSetup: "./global-setup.js",
  globalTeardown: "./global-teardown.js",
  transform: {
    "^.+\\..(ts)$": "ts-jest",
  },
  testTimeout: 20000,
  testEnvironmentOptions: {
    "jest-playwright": {
      // browsers: ["chromium", "firefox", "webkit"],
      browsers: ["chromium"],
      launchOptions: {
        headless: false,
        slowMo: 600,
      },
    },
  },
  debugOptions: {    
    contextOptions: {
      offline: true
    }
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        classNameTemplate: (vars) => {
          return vars.classname.toUpperCase();
        },
        outputDirectory: "reports",
        outputName: "test_reporter.xml",
      },
    ],
  ],
};
