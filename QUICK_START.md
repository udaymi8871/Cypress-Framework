# Quick Start Guide

##  Get Up and Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Open Cypress
```bash
npm run cy:open
```

### Step 3: Run Your First Test
1. Click on a test file (e.g., `login.cy.js`)
2. Watch it execute in the browser
3. See results in real-time

### Step 4: Run All Tests
```bash
npm run cy:run
```

##  Common Commands

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress Test Runner |
| `npm run cy:run` | Run all tests headlessly |
| `npm run cy:run:smoke` | Run smoke tests only |
| `npm run cy:run:regression` | Run regression tests only |
| `npm run test:all` | Run all tests with HTML report |
| `npm run allure:generate` | Generate Allure report |
| `npm run allure:open` | Open Allure report |

##  Test Structure

```
cypress/e2e/
├── login/              # Login tests
├── products/           # Product tests
├── cart/               # Cart tests
├── checkout/           # Checkout tests
├── api/                # API tests
├── integration/        # E2E tests
└── negative/          # Negative tests
```

##  Writing Your First Test

```javascript
import LoginPage from '../../pages/LoginPage';

describe('My First Test', () => {
  it('@smoke - Should login successfully', () => {
    LoginPage.visit();
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
      LoginPage.verifySuccessfulLogin();
    });
  });
});
```

##  Key Concepts

1. **Page Objects**: Located in `cypress/pages/`
2. **Fixtures**: Test data in `cypress/fixtures/`
3. **Custom Commands**: Reusable commands in `cypress/support/commands.js`
4. **Test Tags**: Use `@smoke` or `@regression` tags

##  Viewing Reports

### HTML Reports
```bash
npm run test:all
npm run report:generate
# Open cypress/reports/html/index.html
```

### Allure Reports
```bash
npm run allure:generate
npm run allure:open
```

##  Next Steps

1. Read the full [README.md](./README.md)
2. Explore test files in `cypress/e2e/`
3. Study page objects in `cypress/pages/`
4. Modify existing tests
5. Create your own tests

##  Need Help?

- Check [README.md](./README.md) for detailed documentation
- Review Cypress docs: https://docs.cypress.io
- Examine existing test files for examples

Happy Testing! 

