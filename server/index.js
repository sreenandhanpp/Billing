import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import userRoutes from './routes/users.js';
import { setupAdminUser } from './config/adminSetup.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Set up admin user after successful connection
    await setupAdminUser();
  })
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});