import { getPiNetworkWalletBalance } from '../services/piNetworkService.js';

export const getWalletBalance = async (req, res, next) => {
  try {
    // The access token is passed through from the authentication middleware
    const { accessToken } = req;
    
    // Call the Pi Network service to get the wallet balance
    const balanceData = await getPiNetworkWalletBalance(accessToken);
    
    // Return the wallet balance data
    return res.status(200).json(balanceData);
  } catch (error) {
    next(error);
  }
};
