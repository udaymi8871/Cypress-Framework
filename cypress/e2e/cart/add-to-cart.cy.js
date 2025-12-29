/**
 * Add to Cart Test Suite
 * Tests adding products to cart functionality
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';

describe('Add to Cart Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('@smoke @regression - Should add single product to cart', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      ProductPage.addProductToCart(productName);
      ProductPage.verifyCartBadgeCount(1);
      ProductPage.navigateToCart();
      CartPage.verifyProductInCart(productName);
    });
  });

  it('@regression - Should add multiple products to cart', () => {
    cy.fixture('products').then((data) => {
      const products = [data.products[0].name, data.products[1].name, data.products[2].name];
      
      products.forEach((productName) => {
        ProductPage.addProductToCart(productName);
      });
      
      ProductPage.verifyCartBadgeCount(products.length);
      ProductPage.navigateToCart();
      CartPage.verifyMultipleProductsInCart(products);
    });
  });

  it('@regression - Should update cart badge count when adding products', () => {
    cy.fixture('products').then((data) => {
      ProductPage.addProductToCart(data.products[0].name);
      ProductPage.verifyCartBadgeCount(1);
      
      ProductPage.addProductToCart(data.products[1].name);
      ProductPage.verifyCartBadgeCount(2);
      
      ProductPage.addProductToCart(data.products[2].name);
      ProductPage.verifyCartBadgeCount(3);
    });
  });

  it('@regression - Should change button text from "Add to cart" to "Remove"', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      
      cy.contains('.inventory_item', productName).within(() => {
        cy.get('button').should('contain', 'Add to cart');
      });
      
      ProductPage.addProductToCart(productName);
      
      cy.contains('.inventory_item', productName).within(() => {
        cy.get('button').should('contain', 'Remove');
      });
    });
  });

  it('@regression - Should add all products to cart', () => {
    cy.fixture('products').then((data) => {
      data.products.forEach((product) => {
        ProductPage.addProductToCart(product.name);
      });
      
      ProductPage.verifyCartBadgeCount(data.products.length);
    });
  });

  it('@regression - Should verify product price in cart matches product page', () => {
    cy.fixture('products').then((data) => {
      const product = data.products[0];
      
      ProductPage.getProductPrice(product.name).then((productPagePrice) => {
        ProductPage.addProductToCart(product.name);
        ProductPage.navigateToCart();
        
        CartPage.getProductPrice(product.name).then((cartPrice) => {
          expect(cartPrice).to.equal(productPagePrice);
        });
      });
    });
  });

  it('@regression - Should add product to cart from product listing page', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      
      ProductPage.verifyProductDisplayed(productName);
      ProductPage.addProductToCart(productName);
      ProductPage.verifyCartBadgeCount(1);
    });
  });
});

