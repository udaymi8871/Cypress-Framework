/**
 * End-to-End Test Suite
 * Complete user journey tests covering multiple flows
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('End-to-End Flow Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('@smoke @regression - Complete user journey: Login -> Browse -> Add to Cart -> Checkout -> Order Confirmation', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        const products = [data.products[0].name, data.products[1].name];
        
        // Step 1: Login
        LoginPage.login(user.username, user.password);
        LoginPage.verifySuccessfulLogin();
        
        // Step 2: Browse products
        ProductPage.verifyProductPageDisplayed();
        products.forEach((productName) => {
          ProductPage.verifyProductDisplayed(productName);
        });
        
        // Step 3: Add products to cart
        products.forEach((productName) => {
          ProductPage.addProductToCart(productName);
        });
        ProductPage.verifyCartBadgeCount(products.length);
        
        // Step 4: View cart
        ProductPage.navigateToCart();
        CartPage.verifyCartPageDisplayed();
        CartPage.verifyMultipleProductsInCart(products);
        
        // Step 5: Proceed to checkout
        CartPage.clickCheckout();
        CheckoutPage.verifyCheckoutInformationPage();
        
        // Step 6: Fill checkout information
        CheckoutPage.completeCheckoutInformation(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifyCheckoutOverviewPage();
        
        // Step 7: Verify order summary
        CheckoutPage.verifyOrderSummary();
        products.forEach((productName) => {
          CheckoutPage.verifyProductInOverview(productName);
        });
        
        // Step 8: Complete order
        CheckoutPage.clickFinish();
        CheckoutPage.verifyCheckoutCompletePage();
        CheckoutPage.verifySuccessMessage('Your order has been dispatched');
        
        // Step 9: Return to products
        CheckoutPage.clickBackHome();
        ProductPage.verifyProductPageDisplayed();
        ProductPage.verifyCartBadgeCount(0);
      });
    });
  });

  it('@regression - Complete flow with product sorting', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        // Login
        LoginPage.login(user.username, user.password);
        
        // Sort products by price
        ProductPage.sortProducts('Price (low to high)');
        ProductPage.verifyProductsSortedByPriceLowToHigh();
        
        // Add cheapest product
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.verifyCartBadgeCount(1);
        
        // Complete checkout
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifyCheckoutCompletePage();
      });
    });
  });

  it('@regression - Complete flow with multiple products and validation', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        const allProducts = data.products.map(p => p.name);
        
        // Login
        LoginPage.login(user.username, user.password);
        
        // Add all products
        allProducts.forEach((productName) => {
          ProductPage.addProductToCart(productName);
        });
        
        // Verify cart count
        ProductPage.verifyCartBadgeCount(allProducts.length);
        
        // Verify in cart
        ProductPage.navigateToCart();
        CartPage.verifyMultipleProductsInCart(allProducts);
        CartPage.getCartItemCount().then((count) => {
          expect(count).to.equal(allProducts.length);
        });
        
        // Complete checkout
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        CheckoutPage.verifyCheckoutCompletePage();
      });
    });
  });

  it('@regression - Complete flow with logout and re-login', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        // Login and add product
        LoginPage.login(user.username, user.password);
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.verifyCartBadgeCount(1);
        
        // Logout
        ProductPage.logout();
        LoginPage.verifyLoginPageDisplayed();
        
        // Re-login
        LoginPage.login(user.username, user.password);
        ProductPage.verifyProductPageDisplayed();
        
        // Cart should be empty after logout
        ProductPage.verifyCartBadgeCount(0);
      });
    });
  });
});

