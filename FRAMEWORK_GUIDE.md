# Framework Architecture Guide

## Architecture Overview

This framework follows industry-standard patterns for maintainable, scalable test automation.

## Design Patterns

### 1. Page Object Model (POM)

**Purpose**: Encapsulate page-specific logic and selectors

**Location**: `cypress/pages/`

**Structure**:
```javascript
class PageName {
  // Selectors
  elements = {
    elementName: () => cy.get('selector')
  };
  
  // Methods
  actionName() {
    // Implementation
    return this; // For method chaining
  }
}

export default new PageName();
```

**Benefits**:
- Single source of truth for selectors
- Easy maintenance when UI changes
- Reusable across multiple tests
- Clear separation of concerns

### 2. Custom Commands

**Purpose**: Reusable test operations

**Location**: `cypress/support/commands.js`

**Usage**:
```javascript
// Define
Cypress.Commands.add('commandName', (param) => {
  // Implementation
});

// Use
cy.commandName(param);
```

**Benefits**:
- DRY (Don't Repeat Yourself)
- Consistent test execution
- Easy to extend
- Better readability

### 3. Fixtures

**Purpose**: Centralized test data management

**Location**: `cypress/fixtures/`

**Usage**:
```javascript
cy.fixture('filename').then((data) => {
  // Use data
});
```

**Benefits**:
- Data separated from test logic
- Easy to update test data
- Support multiple scenarios
- Version control friendly

### 4. Utilities

**Purpose**: Helper functions for common operations

**Location**: `cypress/support/utils.js`

**Usage**:
```javascript
import { functionName } from '../support/utils';
```

**Benefits**:
- Reusable utility functions
- Common operations centralized
- Easy to test and maintain

##File Organization

### Test Files Structure

```
cypress/e2e/
├── [feature]/
│   └── [test-suite].cy.js
```

**Naming Convention**:
- Feature folders: lowercase, descriptive (e.g., `login`, `cart`)
- Test files: kebab-case, descriptive (e.g., `login.cy.js`, `add-to-cart.cy.js`)

### Page Objects Structure

```
cypress/pages/
└── [PageName]Page.js
```

**Naming Convention**:
- PascalCase with "Page" suffix
- Match page/feature name (e.g., `LoginPage.js`, `CartPage.js`)

##Test Tagging Strategy

### Tags Used

- `@smoke`: Critical path tests
- `@regression`: Full regression suite

### Usage

```javascript
it('@smoke @regression - Test description', () => {
  // Test code
});
```

### Running Tagged Tests

```bash
# Smoke tests only
npm run cy:run:smoke

# Regression tests only
npm run cy:run:regression
```

## Test Lifecycle

### Hooks

1. **before()**: Runs once before all tests in suite
2. **beforeEach()**: Runs before each test
3. **afterEach()**: Runs after each test
4. **after()**: Runs once after all tests in suite

### Global Hooks

Located in `cypress/support/e2e.js`:
- Global before/after hooks
- Uncaught exception handling
- Test logging

##Reporting Strategy

### Mochawesome Reports

- **Format**: HTML
- **Location**: `cypress/reports/html/`
- **Usage**: `npm run test:all`

### Allure Reports

- **Format**: HTML with rich features
- **Location**: `allure-report/`
- **Usage**: `npm run allure:generate && npm run allure:open`

##Configuration Management

### Environment Configuration

**File**: `.cypress.env.json`

**Purpose**: Environment-specific variables

**Usage**:
```javascript
Cypress.env('variableName');
```

### Cypress Configuration

**File**: `cypress.config.js`

**Key Settings**:
- Base URL
- Viewport size
- Timeouts
- Retries
- Video/Screenshot settings

##Test Data Management

### Fixture Files

1. **users.json**: User credentials and profiles
2. **products.json**: Product information
3. **checkout.json**: Checkout form data
4. **api.json**: API endpoints and test data

### Best Practices

- Keep data separate from logic
- Use meaningful names
- Support multiple scenarios
- Version control all fixtures

##Extending the Framework

### Adding a New Page Object

1. Create file: `cypress/pages/NewPage.js`
2. Define class with selectors and methods
3. Export instance: `export default new NewPage();`
4. Import in tests: `import NewPage from '../../pages/NewPage';`

### Adding a Custom Command

1. Open: `cypress/support/commands.js`
2. Add command definition
3. Add TypeScript definitions (optional)
4. Use in tests

### Adding Test Data

1. Create/update fixture: `cypress/fixtures/filename.json`
2. Load in test: `cy.fixture('filename')`
3. Use data in test

### Adding a New Test Suite

1. Create directory: `cypress/e2e/feature-name/`
2. Create test file: `test-name.cy.js`
3. Import page objects
4. Write tests following patterns
5. Add appropriate tags

## Best Practices

### 1. Selectors

**Prefer**:
- Data attributes: `[data-test="element"]`
- Stable selectors
- Descriptive names

**Avoid**:
- XPath (when possible)
- CSS classes that change
- Fragile selectors

### 2. Assertions

**Prefer**:
- Explicit assertions
- Multiple assertions when needed
- Clear error messages

**Avoid**:
- Implicit assertions only
- Single assertion for multiple checks
- Vague assertions

### 3. Test Organization

**Prefer**:
- One concept per test
- Descriptive test names
- Logical grouping
- Independent tests

**Avoid**:
- Multiple concepts per test
- Vague test names
- Test dependencies
- Shared state

### 4. Error Handling

**Prefer**:
- Expected error handling
- Graceful failures
- Clear error messages
- Retry mechanisms

**Avoid**:
- Ignoring errors
- Silent failures
- Generic error handling

## 🔍 Debugging Strategies

### 1. Interactive Mode

```bash
npm run cy:open
```

### 2. Console Logging

```javascript
cy.log('Debug message');
console.log('Debug info');
```

### 3. Screenshots

Automatically captured on failure

### 4. Videos

Automatically recorded for all runs

### 5. Cypress Studio

Use `experimentalStudio: true` in config

## Performance Considerations

### 1. Test Execution Time

- Keep tests focused
- Avoid unnecessary waits
- Use appropriate timeouts

### 2. Resource Usage

- Clean up after tests
- Use fixtures instead of API calls when possible
- Optimize selectors

### 3. Parallel Execution

- Structure tests for parallelization
- Avoid test dependencies
- Use tags for test selection

## Learning Path

### Beginner

1. Understand Cypress basics
2. Study existing page objects
3. Run existing tests
4. Modify simple tests

### Intermediate

1. Create new page objects
2. Write custom commands
3. Add new test scenarios
4. Understand reporting

### Advanced

1. API testing integration
2. CI/CD setup
3. Framework customization
4. Performance optimization

## Additional Resources

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model](https://martinfowler.com/bliki/PageObject.html)
- [Test Design Patterns](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)

---

This framework is designed to grow with your needs. Start simple, add complexity as required, and always prioritize maintainability and readability.

