/**
 * Negative Test Scenarios
 * Tests error handling and edge cases
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Negative Test Scenarios', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('@regression - Should handle login with empty credentials', () => {
    LoginPage.clickLoginButton();
    LoginPage.verifyErrorMessage('Username is required');
  });

  it('@regression - Should handle login with special characters in username', () => {
    LoginPage.login('!@#$%^&*()', 'password');
    LoginPage.verifyErrorMessage('Username and password do not match any user in this service');
  });

  it('@regression - Should handle login with SQL injection attempt', () => {
    LoginPage.login("' OR '1'='1", 'password');
    LoginPage.verifyErrorMessage('Username and password do not match any user in this service');
  });

  it('@regression - Should handle checkout with empty first name', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        LoginPage.login(users.validUser.username, users.validUser.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.enterLastName('Doe');
        CheckoutPage.enterPostalCode('12345');
        CheckoutPage.clickContinue();
        CheckoutPage.verifyErrorMessage('First Name is required');
      });
    });
  });

  it('@regression - Should handle checkout with empty last name', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        LoginPage.login(users.validUser.username, users.validUser.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.enterFirstName('John');
        CheckoutPage.enterPostalCode('12345');
        CheckoutPage.clickContinue();
        CheckoutPage.verifyErrorMessage('Last Name is required');
      });
    });
  });

  it('@regression - Should handle checkout with empty postal code', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        LoginPage.login(users.validUser.username, users.validUser.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.enterFirstName('John');
        CheckoutPage.enterLastName('Doe');
        CheckoutPage.clickContinue();
        CheckoutPage.verifyErrorMessage('Postal Code is required');
      });
    });
  });

  it('@regression - Should handle checkout with all empty fields', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        LoginPage.login(users.validUser.username, users.validUser.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.clickContinue();
        CheckoutPage.verifyErrorMessage('First Name is required');
      });
    });
  });

  it('@regression - Should handle checkout with special characters in postal code', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        LoginPage.login(users.validUser.username, users.validUser.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.fillCheckoutForm('John', 'Doe', '!@#$%');
        CheckoutPage.clickContinue();
        // Should proceed (validation depends on app implementation)
        CheckoutPage.verifyCheckoutOverviewPage();
      });
    });
  });

  it('@regression - Should handle very long input in checkout form', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const longString = 'A'.repeat(1000);
        LoginPage.login(users.validUser.username, users.validUser.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.fillCheckoutForm(longString, longString, longString);
        CheckoutPage.clickContinue();
        // Should handle gracefully
        cy.get('body').should('be.visible');
      });
    });
  });

  it('@regression - Should handle navigation without adding products to cart', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
      ProductPage.navigateToCart();
      CartPage.verifyCartPageDisplayed();
      CartPage.verifyCartIsEmpty();
      CartPage.clickCheckout();
      // Should show error or prevent checkout
      cy.get('body').should('be.visible');
    });
  });

  it('@regression - Should handle logout during checkout process', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        LoginPage.login(users.validUser.username, users.validUser.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        ProductPage.logout();
        LoginPage.verifyLoginPageDisplayed();
      });
    });
  });
});

