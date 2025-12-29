const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer.js');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Allure reporter plugin
      allureWriter(on, config);
      
      // Cypress grep plugin for test tagging
      // Note: cypress-grep may have compatibility issues with Cypress 13+
      // Making it optional to prevent config errors
      try {
        require('cypress-grep')(config);
      } catch (error) {
        console.warn('cypress-grep plugin could not be loaded:', error.message);
        // Continue without grep plugin - tests will still run
      }
      
      // Mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      
      return config;
    },
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 60000, // Increased from 30s to 60s to handle slow page loads
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    watchForFileChanges: true,
    experimentalStudio: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      grepTags: '',
      apiUrl: 'https://jsonplaceholder.typicode.com',
      allure: true,
      allureReuseAfterSpec: true
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads'
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  }
});

