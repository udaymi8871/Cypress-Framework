# Cypress E-Commerce Automation Framework

A production-grade, comprehensive Cypress automation framework for e-commerce web applications. This framework is designed for hands-on QA upskilling, interview readiness, and real-world industry standards.

## 🎯 Framework Overview

This framework implements industry best practices including:
- **Page Object Model (POM)** - Maintainable and reusable page objects
- **Custom Commands** - Reusable test commands for common operations
- **Fixtures-based Test Data** - Centralized test data management
- **Environment Configuration** - Support for multiple environments
- **Hooks & Lifecycle** - Before/after hooks for test setup and teardown
- **Assertions & Retries** - Robust error handling and retry mechanisms
- **Screenshots & Videos** - Automatic capture on test failures
- **API + UI Integration** - Combined API and UI testing examples
- **Test Tagging** - Smoke and regression test categorization
- **Reporting** - HTML and Allure report generation

## 📁 Project Structure

```
Cypress-Framework/
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   ├── api/                # API tests
│   │   ├── cart/               # Shopping cart tests
│   │   ├── checkout/           # Checkout flow tests
│   │   ├── integration/        # End-to-end tests
│   │   ├── login/              # Login tests
│   │   ├── negative/           # Negative test scenarios
│   │   └── products/           # Product listing and search tests
│   ├── fixtures/               # Test data files
│   │   ├── api.json
│   │   ├── checkout.json
│   │   ├── products.json
│   │   └── users.json
│   ├── pages/                  # Page Object Model classes
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── LoginPage.js
│   │   └── ProductPage.js
│   ├── screenshots/            # Screenshots on failure
│   ├── support/                # Support files
│   │   ├── commands.js         # Custom commands
│   │   ├── e2e.js              # Support file
│   │   └── utils.js            # Utility functions
│   └── videos/                 # Test execution videos
├── allure-results/             # Allure test results
├── allure-report/              # Allure HTML reports
├── cypress.config.js           # Cypress configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd Cypress-Framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify Cypress installation:**
   ```bash
   npx cypress verify
   ```

## 🏃 Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cy:open
```

This opens the Cypress Test Runner where you can:
- Select and run individual tests
- Watch tests execute in real-time
- Debug tests interactively
- View test results

### Run Tests in Headless Mode

```bash
# Run all tests
npm run cy:run

# Run in specific browser
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge

# Run with UI (headed mode)
npm run cy:run:ui
```

### Run Tests by Tag

```bash
# Run smoke tests only
npm run cy:run:smoke

# Run regression tests only
npm run cy:run:regression
```

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

### Run Tests with Custom Configuration

```bash
# Run with custom base URL
npx cypress run --config baseUrl=https://example.com

# Run with custom viewport
npx cypress run --config viewportWidth=1280,viewportHeight=720
```

## 📊 Test Coverage

### Core E-Commerce Flows

1. **User Login**
   - Valid credentials
   - Invalid credentials
   - Locked out user
   - Empty fields
   - Special characters

2. **Product Search & Listing**
   - Product display
   - Product details
   - Product sorting (name, price)
   - Product count validation

3. **Add to Cart**
   - Single product
   - Multiple products
   - Cart badge updates
   - Button state changes

4. **Cart Validation**
   - Cart items display
   - Cart count verification
   - Total calculation
   - Remove products
   - Empty cart handling

5. **Checkout Flow**
   - Checkout information form
   - Order summary validation
   - Total calculation
   - Order completion

6. **Order Confirmation**
   - Success message
   - Order details
   - Cart clearing
   - Navigation

7. **Negative Scenarios**
   - Invalid inputs
   - Empty fields
   - Special characters
   - SQL injection attempts
   - Long inputs

8. **API Tests**
   - GET requests
   - POST requests
   - PUT requests
   - DELETE requests
   - Error handling

9. **UI + API Integration**
   - Cart validation via API
   - Order creation via API
   - Data consistency checks

## 🏗️ Framework Components

### Page Object Model (POM)

Page objects encapsulate page-specific logic and selectors:

```javascript
// Example: LoginPage.js
class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]')
  };

  login(username, password) {
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }
}
```

### Custom Commands

Reusable commands for common operations:

```javascript
// Usage in tests
cy.login('username', 'password');
cy.addProductToCart('Sauce Labs Backpack');
cy.verifyCartBadgeCount(2);
cy.completeCheckout('John', 'Doe', '12345');
```

### Fixtures

Centralized test data management:

```javascript
// Load fixture data
cy.fixture('users').then((users) => {
  LoginPage.login(users.validUser.username, users.validUser.password);
});
```

### Test Tagging

Tag tests for selective execution:

```javascript
it('@smoke @regression - Should successfully login', () => {
  // Test code
});
```

## 📈 Reporting

### Mochawesome Reports

Generate HTML reports:

```bash
# Run tests and generate report
npm run test:all

# Merge and generate HTML report
npm run report:merge
npm run report:generate
```

Reports are generated in `cypress/reports/html/`

### Allure Reports

Generate Allure reports:

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Serve Allure report
npm run allure:serve
```

## 🔧 Configuration

### Environment Variables

Configure environments in `.cypress.env.json`:

```json
{
  "env": {
    "baseUrl": "https://www.saucedemo.com",
    "apiUrl": "https://jsonplaceholder.typicode.com",
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```

### Cypress Configuration

Key settings in `cypress.config.js`:

- **Base URL**: Configured for Sauce Demo
- **Viewport**: 1920x1080
- **Timeouts**: Custom timeouts for commands and requests
- **Retries**: 2 retries in run mode
- **Videos**: Enabled for all test runs
- **Screenshots**: Enabled on failure

## 🎓 Best Practices

### 1. Page Object Model

- Keep page objects focused on single pages
- Use descriptive method names
- Return `this` for method chaining
- Separate selectors from actions

### 2. Test Data Management

- Use fixtures for test data
- Keep data separate from test logic
- Use meaningful fixture names
- Support multiple test scenarios

### 3. Test Organization

- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests independent

### 4. Assertions

- Use explicit assertions
- Verify both positive and negative cases
- Check error messages
- Validate data consistency

### 5. Error Handling

- Handle expected errors gracefully
- Use try-catch for API calls
- Verify error messages
- Test edge cases

### 6. Maintenance

- Keep selectors updated
- Refactor common code
- Update test data regularly
- Review and optimize tests

## 🔍 Debugging

### Debug Mode

Run tests in interactive mode:

```bash
npm run cy:open
```

### Console Logging

Add console logs:

```javascript
cy.log('Debug message');
console.log('Debug info');
```

### Screenshots

Screenshots are automatically captured on failure in `cypress/screenshots/`

### Videos

Videos are automatically recorded in `cypress/videos/`

## 📝 Extending the Framework

### Adding New Page Objects

1. Create a new file in `cypress/pages/`
2. Define selectors and methods
3. Export the page object instance
4. Import in test files

### Adding Custom Commands

1. Add command in `cypress/support/commands.js`
2. Add TypeScript definitions (optional)
3. Use in tests

### Adding New Test Data

1. Create or update fixture file in `cypress/fixtures/`
2. Load fixture in tests
3. Use data in test scenarios

### Adding New Test Suites

1. Create test file in appropriate `cypress/e2e/` subdirectory
2. Import required page objects
3. Write test cases following existing patterns
4. Add appropriate tags

## 🎯 Interview Preparation

This framework demonstrates:

1. **Framework Design**
   - Page Object Model implementation
   - Custom commands and utilities
   - Test data management
   - Configuration management

2. **Test Automation Skills**
   - E2E test creation
   - API testing
   - UI + API integration
   - Negative testing

3. **Best Practices**
   - Code organization
   - Maintainability
   - Reusability
   - Scalability

4. **Tools & Technologies**
   - Cypress framework
   - JavaScript/ES6+
   - Reporting tools
   - CI/CD integration

## 🐛 Troubleshooting

### Common Issues

1. **Tests fail with timeout errors**
   - Increase timeout in `cypress.config.js`
   - Check network connectivity
   - Verify base URL is correct

2. **Element not found**
   - Verify selector is correct
   - Check if element is visible
   - Wait for element to appear

3. **Fixture data not loading**
   - Verify fixture file exists
   - Check JSON syntax
   - Verify file path

4. **Reports not generating**
   - Install report dependencies
   - Check report configuration
   - Verify output directory

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State)
- [Cypress API Reference](https://docs.cypress.io/api/api/table-of-contents)

## 🤝 Contributing

This framework is designed for learning and practice. Feel free to:
- Add new test scenarios
- Improve existing tests
- Enhance page objects
- Add new utilities
- Improve documentation

## 📄 License

MIT License - Feel free to use this framework for learning and interviews.

## 🎉 Getting Started Checklist

- [ ] Install Node.js and npm
- [ ] Clone/navigate to project directory
- [ ] Run `npm install`
- [ ] Verify installation with `npx cypress verify`
- [ ] Open Cypress with `npm run cy:open`
- [ ] Run a sample test
- [ ] Review project structure
- [ ] Read through page objects
- [ ] Explore test files
- [ ] Run all tests with `npm run cy:run`
- [ ] Generate reports
- [ ] Start customizing for your needs

## 💡 Tips for Success

1. **Practice Regularly**: Run tests frequently to understand framework behavior
2. **Read the Code**: Study page objects and custom commands
3. **Experiment**: Try modifying tests and see results
4. **Add Tests**: Create new test scenarios for practice
5. **Understand Patterns**: Learn why certain patterns are used
6. **Document Learnings**: Keep notes on framework features
7. **Stay Updated**: Keep Cypress and dependencies updated

---

**Happy Testing! 🚀**

For questions or issues, refer to Cypress documentation or framework code comments.

