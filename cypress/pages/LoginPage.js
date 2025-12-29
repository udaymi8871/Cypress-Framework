/**
 * Login Page Object Model
 * Contains all selectors and methods for the Login page
 */
class LoginPage {
  // Selectors
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    errorButton: () => cy.get('.error-button'),
    loginContainer: () => cy.get('.login_container'),
    botImage: () => cy.get('.bot_column')
  };

  // Methods
  /**
   * Navigate to login page
   * Uses workaround for pages that don't fire load events properly
   * This method handles the Cypress load event timeout issue by:
   * 1. Clearing state before visit
   * 2. Using cy.visit with failOnStatusCode: false
   * 3. Waiting for actual page elements instead of load event
   */
  visit() {
    // Clear any existing state that might interfere with page load
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearSessionStorage();
    
    // Visit the page
    // Note: pageLoadTimeout is set to 60s in cypress.config.js
    // We use failOnStatusCode: false to handle non-2xx responses
    // cy.visit() uses pageLoadTimeout from config, not a timeout option
    cy.visit('/', {
      failOnStatusCode: false
    });
    
    // CRITICAL: Don't rely on load event - wait for actual page elements
    // This is the workaround for pages that don't fire load events properly
    
    // Step 1: Wait for body element (confirms DOM is ready)
    cy.get('body', { timeout: 30000 }).should('be.visible');
    
    // Step 2: Wait for username input field (confirms login page loaded)
    // This is more specific and confirms we're on the right page
    cy.get('[data-test="username"]', { timeout: 25000 })
      .should('exist')
      .and('be.visible');
    
    // Step 3: Wait for login container (final confirmation page is fully ready)
    this.elements.loginContainer().should('be.visible', { timeout: 15000 });
    
    // Additional check: Verify we're on the login page
    cy.url().should('include', 'saucedemo.com');
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  enterUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  enterPassword(password) {
    this.elements.passwordInput().clear().type(password);
    return this;
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    this.elements.loginButton().click();
    return this;
  }

  /**
   * Perform login with credentials
   * @param {string} username - Username
   * @param {string} password - Password
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  /**
   * Verify error message is displayed
   * @param {string} expectedMessage - Expected error message
   */
  verifyErrorMessage(expectedMessage) {
    this.elements.errorMessage().should('be.visible').and('contain', expectedMessage);
    return this;
  }

  /**
   * Verify login page is displayed
   */
  verifyLoginPageDisplayed() {
    this.elements.loginContainer().should('be.visible');
    this.elements.usernameInput().should('be.visible');
    this.elements.passwordInput().should('be.visible');
    this.elements.loginButton().should('be.visible');
    return this;
  }

  /**
   * Clear error message
   */
  clearErrorMessage() {
    this.elements.errorButton().click();
    return this;
  }

  /**
   * Verify user is logged in (redirected to inventory page)
   */
  verifySuccessfulLogin() {
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
    return this;
  }
}

export default new LoginPage();

