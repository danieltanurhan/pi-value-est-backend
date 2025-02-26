import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { walletRoutes } from './routes/wallet.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined')); // Logging
app.use(express.json()); // Parse JSON bodies

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

// Routes
app.use('/wallet', walletRoutes);

// Root route for health checks
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Pi Network Wallet Balance API is running' });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
