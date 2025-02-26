import axios from 'axios';
import { createCustomError } from '../utils/errorUtils.js';

// Base URL for the Pi Network API
const PI_API_URL = process.env.PI_API_URL || 'https://api.minepi.com';

// Create an axios instance for Pi Network API calls
const piApiClient = axios.create({
  baseURL: PI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle API response errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    return createCustomError(`Pi Network API Error: ${data.message || 'Unknown error'}`, status);
  } else if (error.request) {
    // The request was made but no response was received
    return createCustomError('No response received from Pi Network API', 503);
  } else {
    // Something happened in setting up the request that triggered an Error
    return createCustomError(`Error setting up request: ${error.message}`, 500);
  }
};

/**
 * Get wallet balance from Pi Network API
 * @param {string} accessToken - User's Pi Network access token
 * @returns {Promise<Object>} - Wallet balance data
 */
export const getPiNetworkWalletBalance = async (accessToken) => {
  try {
    const response = await piApiClient.get('/v2/wallet/balance', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
