/**
 * Product/Inventory Page Object Model
 * Contains all selectors and methods for the Product listing page
 */
class ProductPage {
  // Selectors
  elements = {
    inventoryList: () => cy.get('.inventory_list'),
    inventoryItem: () => cy.get('.inventory_item'),
    inventoryItemName: () => cy.get('.inventory_item_name'),
    inventoryItemDescription: () => cy.get('.inventory_item_desc'),
    inventoryItemPrice: () => cy.get('.inventory_item_price'),
    addToCartButton: (productName) => cy.contains('.inventory_item', productName).find('button'),
    removeButton: (productName) => cy.contains('.inventory_item', productName).find('button'),
    productSortContainer: () => cy.get('[data-test="product_sort_container"]'),
    shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
    shoppingCartLink: () => cy.get('.shopping_cart_link'),
    productTitle: () => cy.get('.title'),
    menuButton: () => cy.get('#react-burger-menu-btn'),
    menuItems: () => cy.get('.bm-menu'),
    logoutLink: () => cy.get('#logout_sidebar_link')
  };

  // Methods
  /**
   * Verify product page is displayed
   */
  verifyProductPageDisplayed() {
    this.elements.productTitle().should('be.visible').and('contain', 'Products');
    this.elements.inventoryList().should('be.visible');
    return this;
  }

  /**
   * Verify product is displayed in the list
   * @param {string} productName - Name of the product
   */
  verifyProductDisplayed(productName) {
    this.elements.inventoryItemName().contains(productName).should('be.visible');
    return this;
  }

  /**
   * Get product price
   * @param {string} productName - Name of the product
   * @returns {Cypress.Chainable} Price text
   */
  getProductPrice(productName) {
    return cy.contains('.inventory_item', productName)
      .find('.inventory_item_price')
      .invoke('text');
  }

  /**
   * Add product to cart
   * @param {string} productName - Name of the product
   */
  addProductToCart(productName) {
    cy.contains('.inventory_item', productName).within(() => {
      cy.get('button').contains('Add to cart').click();
    });
    return this;
  }

  /**
   * Remove product from cart
   * @param {string} productName - Name of the product
   */
  removeProductFromCart(productName) {
    cy.contains('.inventory_item', productName).within(() => {
      cy.get('button').contains('Remove').click();
    });
    return this;
  }

  /**
   * Verify cart badge count
   * @param {number} expectedCount - Expected count
   */
  verifyCartBadgeCount(expectedCount) {
    if (expectedCount > 0) {
      this.elements.shoppingCartBadge().should('be.visible').and('contain', expectedCount);
    } else {
      this.elements.shoppingCartBadge().should('not.exist');
    }
    return this;
  }

  /**
   * Navigate to cart
   */
  navigateToCart() {
    this.elements.shoppingCartLink().click();
    return this;
  }

  /**
   * Sort products
   * @param {string} sortOption - Sort option (e.g., "Price (low to high)")
   */
  sortProducts(sortOption) {
    this.elements.productSortContainer().select(sortOption);
    return this;
  }

  /**
   * Get all product names
   * @returns {Cypress.Chainable} Array of product names
   */
  getAllProductNames() {
    return this.elements.inventoryItemName().then(($items) => {
      return Cypress._.map($items, ($item) => $item.innerText);
    });
  }

  /**
   * Get all product prices
   * @returns {Cypress.Chainable} Array of product prices
   */
  getAllProductPrices() {
    return this.elements.inventoryItemPrice().then(($items) => {
      return Cypress._.map($items, ($item) => $item.innerText);
    });
  }

  /**
   * Verify products are sorted by price (low to high)
   */
  verifyProductsSortedByPriceLowToHigh() {
    this.getAllProductPrices().then((prices) => {
      const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...numericPrices].sort((a, b) => a - b);
      expect(numericPrices).to.deep.equal(sortedPrices);
    });
    return this;
  }

  /**
   * Verify products are sorted by price (high to low)
   */
  verifyProductsSortedByPriceHighToLow() {
    this.getAllProductPrices().then((prices) => {
      const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...numericPrices].sort((a, b) => b - a);
      expect(numericPrices).to.deep.equal(sortedPrices);
    });
    return this;
  }

  /**
   * Verify products are sorted by name (A to Z)
   */
  verifyProductsSortedByNameAToZ() {
    this.getAllProductNames().then((names) => {
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });
    return this;
  }

  /**
   * Verify products are sorted by name (Z to A)
   */
  verifyProductsSortedByNameZToA() {
    this.getAllProductNames().then((names) => {
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.equal(sortedNames);
    });
    return this;
  }

  /**
   * Logout
   */
  logout() {
    this.elements.menuButton().click();
    this.elements.logoutLink().should('be.visible').click();
    return this;
  }

  /**
   * Get total number of products
   * @returns {Cypress.Chainable} Number of products
   */
  getProductCount() {
    return this.elements.inventoryItem().its('length');
  }
}

export default new ProductPage();

