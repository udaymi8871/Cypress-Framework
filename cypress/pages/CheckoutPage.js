/**
 * Checkout Page Object Model
 * Contains all selectors and methods for the Checkout pages
 */
class CheckoutPage {
  // Selectors - Checkout Information
  elements = {
    checkoutTitle: () => cy.get('.title'),
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    cancelButton: () => cy.get('[data-test="cancel"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    errorButton: () => cy.get('.error-button')
  };

  // Selectors - Checkout Overview
  overviewElements = {
    overviewTitle: () => cy.get('.title'),
    cartList: () => cy.get('.cart_list'),
    cartItem: () => cy.get('.cart_item'),
    cartItemName: () => cy.get('.inventory_item_name'),
    cartItemPrice: () => cy.get('.inventory_item_price'),
    summarySubtotal: () => cy.get('.summary_subtotal_label'),
    summaryTax: () => cy.get('.summary_tax_label'),
    summaryTotal: () => cy.get('.summary_total_label'),
    finishButton: () => cy.get('[data-test="finish"]'),
    cancelButton: () => cy.get('[data-test="cancel"]')
  };

  // Selectors - Checkout Complete
  completeElements = {
    completeContainer: () => cy.get('#checkout_complete_container'),
    completeTitle: () => cy.get('.complete-header'),
    completeText: () => cy.get('.complete-text'),
    backHomeButton: () => cy.get('[data-test="back-to-products"]'),
    ponyExpressImage: () => cy.get('.pony_express')
  };

  // Methods - Checkout Information
  /**
   * Verify checkout information page is displayed
   */
  verifyCheckoutInformationPage() {
    this.elements.checkoutTitle().should('be.visible').and('contain', 'Checkout: Your Information');
    return this;
  }

  /**
   * Enter first name
   * @param {string} firstName - First name
   */
  enterFirstName(firstName) {
    this.elements.firstNameInput().clear().type(firstName);
    return this;
  }

  /**
   * Enter last name
   * @param {string} lastName - Last name
   */
  enterLastName(lastName) {
    this.elements.lastNameInput().clear().type(lastName);
    return this;
  }

  /**
   * Enter postal code
   * @param {string} postalCode - Postal code
   */
  enterPostalCode(postalCode) {
    this.elements.postalCodeInput().clear().type(postalCode);
    return this;
  }

  /**
   * Fill checkout form
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  fillCheckoutForm(firstName, lastName, postalCode) {
    this.enterFirstName(firstName);
    this.enterLastName(lastName);
    this.enterPostalCode(postalCode);
    return this;
  }

  /**
   * Click continue button
   */
  clickContinue() {
    this.elements.continueButton().click();
    return this;
  }

  /**
   * Click cancel button
   */
  clickCancel() {
    this.elements.cancelButton().click();
    return this;
  }

  /**
   * Verify error message
   * @param {string} expectedMessage - Expected error message
   */
  verifyErrorMessage(expectedMessage) {
    this.elements.errorMessage().should('be.visible').and('contain', expectedMessage);
    return this;
  }

  /**
   * Complete checkout information step
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  completeCheckoutInformation(firstName, lastName, postalCode) {
    this.fillCheckoutForm(firstName, lastName, postalCode);
    this.clickContinue();
    return this;
  }

  // Methods - Checkout Overview
  /**
   * Verify checkout overview page is displayed
   */
  verifyCheckoutOverviewPage() {
    this.overviewElements.overviewTitle().should('be.visible').and('contain', 'Checkout: Overview');
    return this;
  }

  /**
   * Verify product in checkout overview
   * @param {string} productName - Name of the product
   */
  verifyProductInOverview(productName) {
    this.overviewElements.cartItemName().contains(productName).should('be.visible');
    return this;
  }

  /**
   * Get summary subtotal
   * @returns {Cypress.Chainable} Subtotal value
   */
  getSummarySubtotal() {
    return this.overviewElements.summarySubtotal().invoke('text');
  }

  /**
   * Get summary tax
   * @returns {Cypress.Chainable} Tax value
   */
  getSummaryTax() {
    return this.overviewElements.summaryTax().invoke('text');
  }

  /**
   * Get summary total
   * @returns {Cypress.Chainable} Total value
   */
  getSummaryTotal() {
    return this.overviewElements.summaryTotal().invoke('text');
  }

  /**
   * Click finish button
   */
  clickFinish() {
    this.overviewElements.finishButton().click();
    return this;
  }

  /**
   * Verify order summary calculations
   */
  verifyOrderSummary() {
    let subtotal, tax, total;
    
    this.getSummarySubtotal().then((subtotalText) => {
      subtotal = parseFloat(subtotalText.replace('Item total: $', ''));
      
      this.getSummaryTax().then((taxText) => {
        tax = parseFloat(taxText.replace('Tax: $', ''));
        
        this.getSummaryTotal().then((totalText) => {
          total = parseFloat(totalText.replace('Total: $', ''));
          
          expect(total).to.equal(subtotal + tax);
        });
      });
    });
    
    return this;
  }

  // Methods - Checkout Complete
  /**
   * Verify checkout complete page is displayed
   */
  verifyCheckoutCompletePage() {
    this.completeElements.completeContainer().should('be.visible');
    this.completeElements.completeTitle().should('be.visible').and('contain', 'Thank you for your order!');
    return this;
  }

  /**
   * Verify success message
   * @param {string} expectedMessage - Expected success message
   */
  verifySuccessMessage(expectedMessage) {
    this.completeElements.completeText().should('be.visible').and('contain', expectedMessage);
    return this;
  }

  /**
   * Click back home button
   */
  clickBackHome() {
    this.completeElements.backHomeButton().click();
    return this;
  }

  /**
   * Complete full checkout flow
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  completeFullCheckout(firstName, lastName, postalCode) {
    this.completeCheckoutInformation(firstName, lastName, postalCode);
    this.verifyCheckoutOverviewPage();
    this.clickFinish();
    this.verifyCheckoutCompletePage();
    return this;
  }
}

export default new CheckoutPage();

