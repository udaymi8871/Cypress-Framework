/**
 * Checkout Flow Test Suite
 * Tests complete checkout process
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Checkout Flow Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('@smoke @regression - Should complete full checkout flow', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const productName = data.products[0].name;
        const user = users.validUser;
        
        ProductPage.addProductToCart(productName);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifySuccessMessage('Your order has been dispatched');
      });
    });
  });

  it('@regression - Should fill checkout information form', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.verifyCheckoutInformationPage();
        CheckoutPage.fillCheckoutForm(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.clickContinue();
        CheckoutPage.verifyCheckoutOverviewPage();
      });
    });
  });

  it('@regression - Should verify checkout overview displays correct products', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const products = [data.products[0].name, data.products[1].name];
        const user = users.validUser;
        
        products.forEach((productName) => {
          ProductPage.addProductToCart(productName);
        });
        
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeCheckoutInformation(user.firstName, user.lastName, user.postalCode);
        
        products.forEach((productName) => {
          CheckoutPage.verifyProductInOverview(productName);
        });
      });
    });
  });

  it('@regression - Should verify order summary calculations', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeCheckoutInformation(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifyOrderSummary();
      });
    });
  });

  it('@regression - Should cancel checkout from information page', () => {
    cy.fixture('products').then((data) => {
      ProductPage.addProductToCart(data.products[0].name);
      ProductPage.navigateToCart();
      CartPage.clickCheckout();
      CheckoutPage.verifyCheckoutInformationPage();
      CheckoutPage.clickCancel();
      CartPage.verifyCartPageDisplayed();
    });
  });

  it('@regression - Should cancel checkout from overview page', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeCheckoutInformation(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.overviewElements.cancelButton().click();
        ProductPage.verifyProductPageDisplayed();
      });
    });
  });

  it('@regression - Should navigate back to products after order completion', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.clickBackHome();
        ProductPage.verifyProductPageDisplayed();
      });
    });
  });

  it('@regression - Should complete checkout with multiple products', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        const products = [data.products[0].name, data.products[1].name, data.products[2].name];
        
        products.forEach((productName) => {
          ProductPage.addProductToCart(productName);
        });
        
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifyCheckoutCompletePage();
      });
    });
  });
});

