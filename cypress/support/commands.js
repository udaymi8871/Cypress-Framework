// ***********************************************
// Custom Commands
// ***********************************************

/**
 * Custom command to login with credentials
 * @example cy.login('username', 'password')
 */
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

/**
 * Custom command to login using fixture data
 * @example cy.loginWithFixture('validUser')
 */
Cypress.Commands.add('loginWithFixture', (userType = 'validUser') => {
  cy.fixture('users').then((users) => {
    const user = users[userType];
    cy.login(user.username, user.password);
  });
});

/**
 * Custom command to add product to cart by name
 * @example cy.addProductToCart('Sauce Labs Backpack')
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('.inventory_item', productName).within(() => {
    cy.get('button').contains('Add to cart').click();
  });
});

/**
 * Custom command to remove product from cart by name
 * @example cy.removeProductFromCart('Sauce Labs Backpack')
 */
Cypress.Commands.add('removeProductFromCart', (productName) => {
  cy.contains('.inventory_item', productName).within(() => {
    cy.get('button').contains('Remove').click();
  });
});

/**
 * Custom command to verify cart badge count
 * @example cy.verifyCartBadgeCount(2)
 */
Cypress.Commands.add('verifyCartBadgeCount', (expectedCount) => {
  if (expectedCount > 0) {
    cy.get('.shopping_cart_badge').should('be.visible').and('contain', expectedCount);
  } else {
    cy.get('.shopping_cart_badge').should('not.exist');
  }
});

/**
 * Custom command to navigate to cart
 * @example cy.navigateToCart()
 */
Cypress.Commands.add('navigateToCart', () => {
  cy.get('.shopping_cart_link').click();
});

/**
 * Custom command to fill checkout form
 * @example cy.fillCheckoutForm('John', 'Doe', '12345')
 */
Cypress.Commands.add('fillCheckoutForm', (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
});

/**
 * Custom command to complete checkout flow
 * @example cy.completeCheckout('John', 'Doe', '12345')
 */
Cypress.Commands.add('completeCheckout', (firstName, lastName, postalCode) => {
  cy.navigateToCart();
  cy.get('[data-test="checkout"]').click();
  cy.fillCheckoutForm(firstName, lastName, postalCode);
  cy.get('[data-test="finish"]').click();
});

/**
 * Custom command to verify product is displayed
 * @example cy.verifyProductDisplayed('Sauce Labs Backpack')
 */
Cypress.Commands.add('verifyProductDisplayed', (productName) => {
  cy.get('.inventory_item_name').should('contain', productName);
});

/**
 * Custom command to verify error message
 * @example cy.verifyErrorMessage('Username is required')
 */
Cypress.Commands.add('verifyErrorMessage', (expectedMessage) => {
  cy.get('[data-test="error"]').should('be.visible').and('contain', expectedMessage);
});

/**
 * Custom command to wait for page load
 * @example cy.waitForPageLoad()
 */
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.window().its('document.readyState').should('eq', 'complete');
});

/**
 * Custom command to visit page with retry logic for load event issues
 * @example cy.visitWithRetry('/')
 * @example cy.visitWithRetry('/', { maxRetries: 3 })
 */
Cypress.Commands.add('visitWithRetry', (url, options = {}) => {
  const maxRetries = options.maxRetries || 2;
  const visitOptions = { ...options };
  delete visitOptions.maxRetries;
  
  const attemptVisit = (retryCount = 0) => {
    return cy.visit(url, {
      failOnStatusCode: false,
      ...visitOptions,
      onLoad: (contentWindow) => {
        // Manually handle load - helps when load event doesn't fire
        cy.log(`Page load attempt ${retryCount + 1}`);
      }
    }).then(() => {
      // Wait for body to confirm page is loading
      return cy.get('body', { timeout: 30000 }).should('be.visible');
    }).catch((error) => {
      if (retryCount < maxRetries && error.message.includes('load event')) {
        cy.log(`Retrying visit (attempt ${retryCount + 2}/${maxRetries + 1})`);
        cy.wait(2000); // Wait before retry
        return attemptVisit(retryCount + 1);
      }
      throw error;
    });
  };
  
  return attemptVisit();
});

/**
 * Custom command to clear cookies and local storage
 * @example cy.clearAppState()
 */
Cypress.Commands.add('clearAppState', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

/**
 * Custom command to select dropdown option by text
 * @example cy.selectDropdownOption('[data-test="product_sort_container"]', 'Price (low to high)')
 */
Cypress.Commands.add('selectDropdownOption', (selector, optionText) => {
  cy.get(selector).select(optionText);
});

/**
 * Custom command to verify URL contains text
 * @example cy.verifyUrlContains('inventory')
 */
Cypress.Commands.add('verifyUrlContains', (text) => {
  cy.url().should('include', text);
});

/**
 * Custom command to verify element is visible and contains text
 * @example cy.verifyElementText('.title', 'Products')
 */
Cypress.Commands.add('verifyElementText', (selector, expectedText) => {
  cy.get(selector).should('be.visible').and('contain', expectedText);
});

/**
 * Custom command to take custom screenshot
 * @example cy.takeCustomScreenshot('custom-screenshot-name')
 */
Cypress.Commands.add('takeCustomScreenshot', (name) => {
  cy.screenshot(name, { capture: 'viewport' });
});

/**
 * Custom command to wait for API response
 * @example cy.waitForApiResponse('@getProducts')
 */
Cypress.Commands.add('waitForApiResponse', (alias) => {
  cy.wait(alias).then((interception) => {
    expect(interception.response.statusCode).to.be.oneOf([200, 201]);
  });
});

/**
 * Custom command to verify API response
 * @example cy.verifyApiResponse('@getProducts', { statusCode: 200, bodyProperty: 'data' })
 */
Cypress.Commands.add('verifyApiResponse', (alias, options = {}) => {
  cy.wait(alias).then((interception) => {
    if (options.statusCode) {
      expect(interception.response.statusCode).to.eq(options.statusCode);
    }
    if (options.bodyProperty) {
      expect(interception.response.body).to.have.property(options.bodyProperty);
    }
    if (options.bodyContains) {
      expect(JSON.stringify(interception.response.body)).to.include(options.bodyContains);
    }
  });
});

// Note: TypeScript type definitions are available in cypress/support/index.d.ts
// if you're using TypeScript. For JavaScript projects, these are not needed.

