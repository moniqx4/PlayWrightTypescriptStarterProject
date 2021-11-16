module.exports = {
  preset: "jest-playwright-preset",
  testMatch: ["**/tests/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\..(ts)$": "ts-jest",
  },
  testTimeout: 20000,
  testEnvironmentOptions: {
    "jest-playwright": {
      browsers: ["chromium", "firefox", "webkit"],
      launchOptions: {
        headless: false,
        slowMo: 600,
      },
    },
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
