/**
 * Cart Page Object Model
 * Contains all selectors and methods for the Shopping Cart page
 */
class CartPage {
  // Selectors
  elements = {
    cartList: () => cy.get('.cart_list'),
    cartItem: () => cy.get('.cart_item'),
    cartItemName: () => cy.get('.inventory_item_name'),
    cartItemDescription: () => cy.get('.inventory_item_desc'),
    cartItemPrice: () => cy.get('.inventory_item_price'),
    removeButton: (productName) => cy.contains('.cart_item', productName).find('button'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    cartTitle: () => cy.get('.title')
  };

  // Methods
  /**
   * Verify cart page is displayed
   */
  verifyCartPageDisplayed() {
    this.elements.cartTitle().should('be.visible').and('contain', 'Your Cart');
    this.elements.cartList().should('be.visible');
    return this;
  }

  /**
   * Verify product is in cart
   * @param {string} productName - Name of the product
   */
  verifyProductInCart(productName) {
    this.elements.cartItemName().contains(productName).should('be.visible');
    return this;
  }

  /**
   * Get product price in cart
   * @param {string} productName - Name of the product
   * @returns {Cypress.Chainable} Price text
   */
  getProductPrice(productName) {
    return cy.contains('.cart_item', productName)
      .find('.inventory_item_price')
      .invoke('text');
  }

  /**
   * Remove product from cart
   * @param {string} productName - Name of the product
   */
  removeProduct(productName) {
    cy.contains('.cart_item', productName).within(() => {
      cy.get('button').contains('Remove').click();
    });
    return this;
  }

  /**
   * Click continue shopping button
   */
  clickContinueShopping() {
    this.elements.continueShoppingButton().click();
    return this;
  }

  /**
   * Click checkout button
   */
  clickCheckout() {
    this.elements.checkoutButton().click();
    return this;
  }

  /**
   * Get all cart items
   * @returns {Cypress.Chainable} Array of cart items
   */
  getAllCartItems() {
    return this.elements.cartItemName().then(($items) => {
      return Cypress._.map($items, ($item) => $item.innerText);
    });
  }

  /**
   * Get cart item count
   * @returns {Cypress.Chainable} Number of items in cart
   */
  getCartItemCount() {
    return this.elements.cartItem().its('length');
  }

  /**
   * Verify cart is empty
   */
  verifyCartIsEmpty() {
    this.elements.cartItem().should('not.exist');
    return this;
  }

  /**
   * Calculate total cart value
   * @returns {Cypress.Chainable} Total cart value
   */
  calculateTotalCartValue() {
    return this.elements.cartItemPrice().then(($prices) => {
      const prices = Cypress._.map($prices, ($price) => 
        parseFloat($price.innerText.replace('$', ''))
      );
      return prices.reduce((sum, price) => sum + price, 0);
    });
  }

  /**
   * Verify multiple products in cart
   * @param {Array} productNames - Array of product names
   */
  verifyMultipleProductsInCart(productNames) {
    productNames.forEach((productName) => {
      this.verifyProductInCart(productName);
    });
    return this;
  }
}

export default new CartPage();

