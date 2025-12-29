/**
 * Login Test Suite
 * Tests user authentication functionality
 */
import LoginPage from '../../pages/LoginPage';

describe('Login Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('@smoke @regression - Should successfully login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
      LoginPage.verifySuccessfulLogin();
    });
  });

  it('@regression - Should display error message for invalid username', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login('invalid_username', users.validUser.password);
      LoginPage.verifyErrorMessage('Username and password do not match any user in this service');
    });
  });

  it('@regression - Should display error message for invalid password', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, 'invalid_password');
      LoginPage.verifyErrorMessage('Username and password do not match any user in this service');
    });
  });

  it('@regression - Should display error message for locked out user', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.lockedUser.username, users.lockedUser.password);
      LoginPage.verifyErrorMessage('Sorry, this user has been locked out.');
    });
  });

  it('@regression - Should display error message when username is empty', () => {
    LoginPage.enterPassword('password');
    LoginPage.clickLoginButton();
    LoginPage.verifyErrorMessage('Username is required');
  });

  it('@regression - Should display error message when password is empty', () => {
    cy.fixture('users').then((users) => {
      LoginPage.enterUsername(users.validUser.username);
      LoginPage.clickLoginButton();
      LoginPage.verifyErrorMessage('Password is required');
    });
  });

  it('@regression - Should display error message when both fields are empty', () => {
    LoginPage.clickLoginButton();
    LoginPage.verifyErrorMessage('Username is required');
  });

  it('@regression - Should clear error message when error button is clicked', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.lockedUser.username, users.lockedUser.password);
      LoginPage.verifyErrorMessage('Sorry, this user has been locked out.');
      LoginPage.clearErrorMessage();
      LoginPage.elements.errorMessage().should('not.exist');
    });
  });

  it('@regression - Should login with problem user', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.problemUser.username, users.problemUser.password);
      LoginPage.verifySuccessfulLogin();
    });
  });

  it('@regression - Should login with performance glitch user', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.performanceUser.username, users.performanceUser.password);
      LoginPage.verifySuccessfulLogin();
    });
  });

  it('@regression - Should verify login page elements are displayed', () => {
    LoginPage.verifyLoginPageDisplayed();
  });
});

