/**
 * Create a custom error with status code
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Error} - Custom error object
 */
export const createCustomError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
