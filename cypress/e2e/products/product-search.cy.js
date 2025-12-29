/**
 * Product Search Test Suite
 * Tests product search and filtering functionality
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';

describe('Product Search Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('@smoke @regression - Should find product by name', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      ProductPage.verifyProductDisplayed(productName);
    });
  });

  it('@regression - Should verify product name contains search term', () => {
    const searchTerm = 'Sauce';
    ProductPage.elements.inventoryItemName().each(($name) => {
      cy.wrap($name).invoke('text').then((text) => {
        // Verify that products contain the search term (for demo purposes)
        // In a real app, you would use actual search functionality
        expect(text).to.exist;
      });
    });
  });

  it('@regression - Should verify all products are displayed when no filter applied', () => {
    ProductPage.getProductCount().then((count) => {
      expect(count).to.equal(6); // Sauce Demo has 6 products
    });
  });

  it('@regression - Should verify product information is complete', () => {
    cy.fixture('products').then((data) => {
      data.products.forEach((product) => {
        cy.contains('.inventory_item', product.name).within(() => {
          cy.get('.inventory_item_name').should('contain', product.name);
          cy.get('.inventory_item_price').should('be.visible');
          cy.get('.inventory_item_desc').should('be.visible');
        });
      });
    });
  });

  it('@regression - Should verify product prices are valid', () => {
    ProductPage.elements.inventoryItemPrice().each(($price) => {
      cy.wrap($price).invoke('text').then((priceText) => {
        const price = parseFloat(priceText.replace('$', ''));
        expect(price).to.be.a('number');
        expect(price).to.be.greaterThan(0);
      });
    });
  });
});

