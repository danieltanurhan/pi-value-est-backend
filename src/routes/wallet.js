import express from 'express';
import { getWalletBalance } from '../controllers/walletController.js';
import { validateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to protect the route
router.get('/balance', validateToken, getWalletBalance);

export { router as walletRoutes };
