# Websites for Automation Testing Practice

## 🎯 Currently Configured in Your Framework

### ✅ Sauce Demo (Already Set Up!)
- **URL**: https://www.saucedemo.com
- **Status**: ✅ Already configured in `cypress.config.js`
- **Features**: 
  - E-commerce functionality
  - Login/logout
  - Product browsing
  - Shopping cart
  - Checkout flow
  - Multiple user types (standard, locked, problem, performance)
- **Why it's great**: Perfect for learning, stable, no registration needed

---

## 🌐 Best Practice Websites for Automation

### 1. **The Internet (Herokuapp)**
- **URL**: https://the-internet.herokuapp.com
- **Features**:
  - Form authentication
  - Dynamic content
  - File upload/download
  - JavaScript alerts
  - Frames
  - Dropdowns
  - Checkboxes/Radio buttons
  - Tables
  - Drag and drop
- **Why it's great**: Comprehensive UI elements, perfect for learning

### 2. **DemoQA**
- **URL**: https://demoqa.com
- **Features**:
  - Forms
  - Elements (buttons, links, text boxes)
  - Widgets (accordion, date picker, slider)
  - Interactions (drag & drop, resizable)
  - Book store API
- **Why it's great**: Modern UI, real-world scenarios

### 3. **Automation Practice (Selenium Easy)**
- **URL**: https://demo.seleniumeasy.com
- **Features**:
  - Input forms
  - Date pickers
  - Table pagination
  - Dynamic data loading
  - Alerts and modals
- **Why it's great**: Simple, beginner-friendly

### 4. **ParaBank**
- **URL**: https://parabank.parasoft.com
- **Features**:
  - Banking application
  - Account management
  - Fund transfers
  - Bill payments
  - Transaction history
- **Why it's great**: Real-world banking scenarios

### 5. **OrangeHRM Demo**
- **URL**: https://opensource-demo.orangehrmlive.com
- **Credentials**: 
  - Username: Admin
  - Password: admin123
- **Features**:
  - HR management system
  - Employee management
  - Leave management
  - Performance reviews
- **Why it's great**: Enterprise application, complex workflows

### 6. **Swag Labs (Sauce Demo)**
- **URL**: https://www.saucedemo.com ✅ (Already configured!)
- **Why it's great**: E-commerce, perfect for your current framework

### 7. **Automation Exercise**
- **URL**: https://automationexercise.com
- **Features**:
  - E-commerce site
  - User registration
  - Product search
  - Cart management
  - Checkout
- **Why it's great**: Complete e-commerce flow

### 8. **Practice Test Automation**
- **URL**: https://practice.expandtesting.com
- **Features**:
  - Login/Registration
  - Forms
  - Alerts
  - File operations
  - API testing playground
- **Why it's great**: Modern, well-maintained

### 9. **LetCode**
- **URL**: https://letcode.in
- **Features**:
  - Input fields
  - Buttons
  - Dropdowns
  - Alerts
  - Frames
  - Drag and drop
- **Why it's great**: Simple, focused on specific elements

### 10. **ToolsQA**
- **URL**: https://demoqa.com (same as DemoQA)
- **Features**: Comprehensive UI elements and API testing

---

## 🎓 Interview-Focused Websites

### **Sauce Demo** (Most Common in Interviews)
- ✅ Already in your framework!
- Used by many companies for technical assessments
- Perfect for demonstrating POM, custom commands, etc.

### **The Internet (Herokuapp)**
- Very common in interviews
- Tests various UI element handling skills

---

## 🚀 How to Switch to Different Websites

### Option 1: Update baseUrl in cypress.config.js

```javascript
baseUrl: 'https://the-internet.herokuapp.com',
```

### Option 2: Use Environment Variable

```javascript
baseUrl: Cypress.env('baseUrl') || 'https://www.saucedemo.com',
```

### Option 3: Override in Test

```javascript
cy.visit('https://the-internet.herokuapp.com/login');
```

---

## 📝 Recommended Practice Order

1. **Start with Sauce Demo** (Already configured)
   - Master the basics
   - Understand your framework
   - Practice POM pattern

2. **Move to The Internet**
   - Practice different UI elements
   - Handle alerts, frames, dropdowns

3. **Try DemoQA**
   - Modern UI elements
   - Complex interactions

4. **Practice with ParaBank or OrangeHRM**
   - Real-world application scenarios
   - Complex workflows

---

## 💡 Tips for Practice

1. **Start Simple**: Begin with Sauce Demo (already set up)
2. **Practice POM**: Create page objects for each new site
3. **Add Custom Commands**: Create reusable commands
4. **Handle Edge Cases**: Test error scenarios
5. **API Testing**: Practice API calls on sites that support it
6. **Documentation**: Update your framework as you learn

---

## 🔧 Quick Setup for New Website

1. Update `baseUrl` in `cypress.config.js`
2. Create new page objects in `cypress/pages/`
3. Create test data in `cypress/fixtures/`
4. Write tests in `cypress/e2e/`
5. Run: `npm run cy:open`

---

## ✅ Your Current Setup

**Website**: Sauce Demo (https://www.saucedemo.com)
**Status**: ✅ Fully configured and ready
**Tests**: ✅ 11 test suites already written
**Framework**: ✅ Production-ready

**You can start practicing immediately!**

---

*Last Updated: Framework Creation*
*Recommended: Start with Sauce Demo, then explore other sites*

