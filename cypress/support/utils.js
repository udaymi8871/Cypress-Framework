// ***********************************************
// Utility Functions
// ***********************************************

/**
 * Generate random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
export const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate random email
 * @returns {string} Random email address
 */
export const generateRandomEmail = () => {
  return `test_${generateRandomString(8)}@example.com`;
};

/**
 * Generate random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export const generateRandomNumber = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Format date to string
 * @param {Date} date - Date object
 * @param {string} format - Date format
 * @returns {string} Formatted date string
 */
export const formatDate = (date = new Date(), format = 'YYYY-MM-DD') => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
};

/**
 * Wait for element to be visible with retry
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 */
export const waitForElement = (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
};

/**
 * Verify API response structure
 * @param {object} response - API response object
 * @param {object} schema - Expected schema
 */
export const verifyResponseSchema = (response, schema) => {
  Object.keys(schema).forEach((key) => {
    expect(response).to.have.property(key);
    if (typeof schema[key] === 'object' && !Array.isArray(schema[key])) {
      verifyResponseSchema(response[key], schema[key]);
    }
  });
};

/**
 * Calculate total price from items
 * @param {Array} items - Array of items with price
 * @returns {number} Total price
 */
export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + parseFloat(item.price.replace('$', ''));
  }, 0);
};

/**
 * Get current timestamp
 * @returns {string} Current timestamp
 */
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Parse price string to number
 * @param {string} priceString - Price string (e.g., "$29.99")
 * @returns {number} Price as number
 */
export const parsePrice = (priceString) => {
  return parseFloat(priceString.replace('$', ''));
};

/**
 * Compare two prices
 * @param {string} price1 - First price
 * @param {string} price2 - Second price
 * @returns {boolean} True if price1 > price2
 */
export const comparePrices = (price1, price2) => {
  return parsePrice(price1) > parsePrice(price2);
};

