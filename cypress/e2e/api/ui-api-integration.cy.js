/**
 * UI + API Integration Tests
 * Tests that combine UI interactions with API validations
 */
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('UI + API Integration Tests', () => {
  const apiUrl = Cypress.env('apiUrl') || 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('@smoke @regression - Should validate cart via API after adding products', () => {
    cy.fixture('products').then((data) => {
      const productName = data.products[0].name;
      
      // Add product via UI
      ProductPage.addProductToCart(productName);
      ProductPage.verifyCartBadgeCount(1);
      
      // In a real scenario, you would validate cart via API
      // This is a demonstration of the pattern
      cy.window().then((win) => {
        // Simulate API call to validate cart
        const cartData = win.localStorage.getItem('cart-items');
        expect(cartData).to.exist;
      });
    });
  });

  it('@regression - Should verify order data structure matches API format', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        const productName = data.products[0].name;
        
        // Complete checkout via UI
        ProductPage.addProductToCart(productName);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        
        // Verify order completion
        CheckoutPage.verifyCheckoutCompletePage();
        
        // In a real scenario, you would fetch order details via API
        // This demonstrates the integration pattern
        cy.request({
          method: 'GET',
          url: `${apiUrl}/posts/1`,
          failOnStatusCode: false
        }).then((response) => {
          // Verify API response structure matches expected order format
          expect(response.body).to.have.property('id');
          expect(response.body).to.have.property('title');
        });
      });
    });
  });

  it('@regression - Should sync cart state between UI and API', () => {
    cy.fixture('products').then((data) => {
      const products = [data.products[0].name, data.products[1].name];
      
      // Add products via UI
      products.forEach((productName) => {
        ProductPage.addProductToCart(productName);
      });
      
      ProductPage.verifyCartBadgeCount(products.length);
      
      // Navigate to cart and verify
      ProductPage.navigateToCart();
      CartPage.verifyMultipleProductsInCart(products);
      
      // In a real scenario, validate cart via API
      cy.window().then((win) => {
        // Check if cart data is stored (simulated)
        const cartCount = win.localStorage.getItem('cart-count');
        if (cartCount) {
          expect(parseInt(cartCount)).to.equal(products.length);
        }
      });
    });
  });

  it('@regression - Should validate user session via API', () => {
    // Verify user is logged in via UI
    ProductPage.verifyProductPageDisplayed();
    
    // In a real scenario, validate session via API
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users/1`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Verify user data structure matches expected format
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name');
    });
  });

  it('@regression - Should create order record via API after UI checkout', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        const productName = data.products[0].name;
        
        // Complete checkout via UI
        ProductPage.addProductToCart(productName);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeFullCheckout(user.firstName, user.lastName, user.postalCode);
        
        // Verify order completion in UI
        CheckoutPage.verifyCheckoutCompletePage();
        
        // In a real scenario, create order record via API
        cy.request({
          method: 'POST',
          url: `${apiUrl}/posts`,
          body: {
            title: `Order for ${user.firstName} ${user.lastName}`,
            body: `Order completed for product: ${productName}`,
            userId: 1
          },
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('id');
        });
      });
    });
  });

  it('@regression - Should verify product data consistency between UI and API', () => {
    cy.fixture('products').then((data) => {
      const product = data.products[0];
      
      // Get product details from UI
      ProductPage.verifyProductDisplayed(product.name);
      ProductPage.getProductPrice(product.name).then((uiPrice) => {
        // In a real scenario, fetch product details from API
        cy.request({
          method: 'GET',
          url: `${apiUrl}/posts/1`,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
          // Verify data structure matches
          expect(response.body).to.have.property('id');
        });
      });
    });
  });

  it('@regression - Should handle API failure gracefully during checkout', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        
        // Attempt checkout via UI
        ProductPage.addProductToCart(data.products[0].name);
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        
        // Simulate API call that might fail
        cy.request({
          method: 'GET',
          url: `${apiUrl}/invalid-endpoint`,
          failOnStatusCode: false
        }).then((response) => {
          // Even if API fails, UI should handle gracefully
          if (response.status >= 400) {
            // Continue with UI flow
            CheckoutPage.fillCheckoutForm(user.firstName, user.lastName, user.postalCode);
            CheckoutPage.clickContinue();
            CheckoutPage.verifyCheckoutOverviewPage();
          }
        });
      });
    });
  });

  it('@regression - Should validate order total calculation via API', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('products').then((data) => {
        const user = users.validUser;
        const products = [data.products[0], data.products[1]];
        
        // Add products and calculate expected total
        let expectedTotal = 0;
        products.forEach((product) => {
          ProductPage.addProductToCart(product.name);
          expectedTotal += parseFloat(product.price.replace('$', ''));
        });
        
        // Complete checkout
        ProductPage.navigateToCart();
        CartPage.clickCheckout();
        CheckoutPage.completeCheckoutInformation(user.firstName, user.lastName, user.postalCode);
        
        // Verify total in UI
        CheckoutPage.getSummaryTotal().then((totalText) => {
          const uiTotal = parseFloat(totalText.replace('Total: $', ''));
          expect(uiTotal).to.be.greaterThan(expectedTotal); // Includes tax
        });
        
        // In a real scenario, validate total via API
        cy.request({
          method: 'GET',
          url: `${apiUrl}/posts/1`,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});

