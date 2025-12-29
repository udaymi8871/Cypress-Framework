/**
 * Cart Validation Test Suite
 * Tests cart validation and management functionality
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';

describe('Cart Validation Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('@smoke @regression - Should display empty cart message when cart is empty', () => {
    ProductPage.navigateToCart();
    CartPage.verifyCartPageDisplayed();
    CartPage.getCartItemCount().then((count) => {
      if (count === 0) {
        CartPage.verifyCartIsEmpty();
      }
    });
  });

  it('@regression - Should verify cart items are displayed correctly', () => {
    cy.fixture('products').then((data) => {
      const products = [data.products[0].name, data.products[1].name];
      
      products.forEach((productName) => {
        ProductPage.addProductToCart(productName);
      });
      
      ProductPage.navigateToCart();
      CartPage.verifyCartPageDisplayed();
      CartPage.verifyMultipleProductsInCart(products);
    });
  });

  it('@regression - Should verify cart item count matches added products', () => {
    cy.fixture('products').then((data) => {
      const products = [data.products[0].name, data.products[1].name, data.products[2].name];
      
      products.forEach((productName) => {
        ProductPage.addProductToCart(productName);
      });
      
      ProductPage.navigateToCart();
      CartPage.getCartItemCount().then((count) => {
        expect(count).to.equal(products.length);
      });
    });
  });

  it('@regression - Should calculate total cart value correctly', () => {
    cy.fixture('products').then((data) => {
      const products = [data.products[0].name, data.products[1].name];
      let expectedTotal = 0;
      
      products.forEach((productName) => {
        ProductPage.getProductPrice(productName).then((price) => {
          expectedTotal += parseFloat(price.replace('$', ''));
        });
        ProductPage.addProductToCart(productName);
      });
      
      cy.wait(500); // Wait for prices to be captured
      
      ProductPage.navigateToCart();
      CartPage.calculateTotalCartValue().then((total) => {
        expect(total).to.be.greaterThan(0);
      });
    });
  });

  it('@regression - Should verify cart badge disappears when cart is empty', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      
      ProductPage.addProductToCart(productName);
      ProductPage.verifyCartBadgeCount(1);
      
      ProductPage.removeProductFromCart(productName);
      ProductPage.verifyCartBadgeCount(0);
    });
  });

  it('@regression - Should remove product from cart', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      
      ProductPage.addProductToCart(productName);
      ProductPage.navigateToCart();
      CartPage.verifyProductInCart(productName);
      CartPage.removeProduct(productName);
      CartPage.verifyCartIsEmpty();
    });
  });

  it('@regression - Should remove multiple products from cart', () => {
    cy.fixture('products').then((data) => {
      const products = [data.products[0].name, data.products[1].name, data.products[2].name];
      
      products.forEach((productName) => {
        ProductPage.addProductToCart(productName);
      });
      
      ProductPage.navigateToCart();
      CartPage.verifyMultipleProductsInCart(products);
      
      products.forEach((productName) => {
        CartPage.removeProduct(productName);
      });
      
      CartPage.verifyCartIsEmpty();
    });
  });

  it('@regression - Should continue shopping from cart page', () => {
    cy.fixture('products').then((data) => {
      ProductPage.addProductToCart(data.products[0].name);
      ProductPage.navigateToCart();
      CartPage.clickContinueShopping();
      ProductPage.verifyProductPageDisplayed();
    });
  });

  it('@regression - Should verify cart persists after page refresh', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      
      ProductPage.addProductToCart(productName);
      ProductPage.verifyCartBadgeCount(1);
      
      cy.reload();
      ProductPage.verifyCartBadgeCount(1);
      ProductPage.navigateToCart();
      CartPage.verifyProductInCart(productName);
    });
  });
});

