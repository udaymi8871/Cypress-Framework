// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-grep';
import '@shelex/cypress-allure-plugin';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // You can add specific error handling here if needed
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  // Handle page load timeout errors gracefully
  if (err.message.includes('load event') || err.message.includes('pageLoadTimeout')) {
    // Log but don't fail - we'll handle it in the visit method
    cy.log('Page load event issue detected, using workaround');
  }
  return true;
});

// Global before hook
before(() => {
  cy.log('Starting test suite execution');
});

// Global after hook
after(() => {
  cy.log('Test suite execution completed');
});

// Before each test
beforeEach(function () {
  // Load test data from fixtures if needed
  cy.log(`Running test: ${this.currentTest.title}`);
});

// After each test
afterEach(function () {
  // Take screenshot on failure (handled by Cypress config)
  if (this.currentTest.state === 'failed') {
    cy.log(`Test failed: ${this.currentTest.title}`);
  }
});

