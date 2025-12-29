/**
 * Product Listing Test Suite
 * Tests product listing, sorting, and display functionality
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';

describe('Product Listing Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('@smoke @regression - Should display products page after login', () => {
    ProductPage.verifyProductPageDisplayed();
  });

  it('@regression - Should display all products', () => {
    cy.fixture('products').then((data) => {
      data.products.forEach((product) => {
        ProductPage.verifyProductDisplayed(product.name);
      });
    });
  });

  it('@regression - Should verify product details are displayed', () => {
    cy.fixture('products').then((data) => {
      const product = data.products[0];
      ProductPage.verifyProductDisplayed(product.name);
      cy.contains('.inventory_item', product.name).within(() => {
        cy.get('.inventory_item_desc').should('be.visible');
        cy.get('.inventory_item_price').should('be.visible');
        cy.get('button').should('be.visible');
      });
    });
  });

  it('@regression - Should sort products by name A to Z', () => {
    ProductPage.sortProducts('Name (A to Z)');
    ProductPage.verifyProductsSortedByNameAToZ();
  });

  it('@regression - Should sort products by name Z to A', () => {
    ProductPage.sortProducts('Name (Z to A)');
    ProductPage.verifyProductsSortedByNameZToA();
  });

  it('@regression - Should sort products by price low to high', () => {
    ProductPage.sortProducts('Price (low to high)');
    ProductPage.verifyProductsSortedByPriceLowToHigh();
  });

  it('@regression - Should sort products by price high to low', () => {
    ProductPage.sortProducts('Price (high to low)');
    ProductPage.verifyProductsSortedByPriceHighToLow();
  });

  it('@regression - Should verify product count', () => {
    ProductPage.getProductCount().then((count) => {
      expect(count).to.be.greaterThan(0);
    });
  });

  it('@regression - Should verify product prices are displayed correctly', () => {
    cy.fixture('products').then((data) => {
      const product = data.products[0];
      ProductPage.getProductPrice(product.name).then((price) => {
        expect(price).to.equal(product.price);
      });
    });
  });

  it('@regression - Should verify all products have required elements', () => {
    ProductPage.elements.inventoryItem().each(($item) => {
      cy.wrap($item).within(() => {
        cy.get('.inventory_item_name').should('be.visible');
        cy.get('.inventory_item_desc').should('be.visible');
        cy.get('.inventory_item_price').should('be.visible');
        cy.get('button').should('be.visible');
      });
    });
  });
});

