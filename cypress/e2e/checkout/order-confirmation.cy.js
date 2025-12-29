/**
 * Order Confirmation Test Suite
 * Tests order confirmation and completion
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Order Confirmation Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('@smoke @regression - Should display order confirmation page', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifyCheckoutCompletePage();
      });
    });
  });

  it('@regression - Should display success message on order completion', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifySuccessMessage('Your order has been dispatched');
      });
    });
  });

  it('@regression - Should verify order confirmation elements are displayed', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        
        CheckoutPage.completeElements.completeTitle().should('be.visible');
        CheckoutPage.completeElements.completeText().should('be.visible');
        CheckoutPage.completeElements.backHomeButton().should('be.visible');
        CheckoutPage.completeElements.ponyExpressImage().should('be.visible');
      });
    });
  });

  it('@regression - Should verify cart is cleared after order completion', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.verifyCartBadgeCount(1);
        
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.clickBackHome();
        
        ProductPage.verifyCartBadgeCount(0);
      });
    });
  });

  it('@regression - Should navigate back to products from confirmation page', () => {
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
});

