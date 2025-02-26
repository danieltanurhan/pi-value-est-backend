import { createCustomError } from '../utils/errorUtils.js';

/**
 * Middleware to validate the Pi Network access token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const validateToken = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    
    // Check if auth header exists
    if (!authHeader) {
      throw createCustomError('Authorization header is required', 401);
    }
    
    // Check if auth header has the correct format
    if (!authHeader.startsWith('Bearer ')) {
      throw createCustomError('Authorization header must start with Bearer', 401);
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw createCustomError('Access token is required', 401);
    }
    
    // Store the token in the request for later use
    req.accessToken = token;
    
    next();
  } catch (error) {
    next(error);
  }
};
