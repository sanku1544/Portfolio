import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes Placeholder
app.get('/', (req, res) => {
  res.send('API is running...');
});

import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
