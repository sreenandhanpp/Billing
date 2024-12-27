import express from 'express';
import Expense from '../models/Expense.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all expenses with filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const filters = {};
    const {
      expenseDetails,
      partyName,
      gstNumber,
      serialNumber,
      description,
      date,
      day,
      paymentMode,
      paymentStatus,
    } = req.query;

    if (expenseDetails) filters.expenseDetails = new RegExp(expenseDetails, 'i');
    if (partyName) filters.partyName = new RegExp(partyName, 'i');
    if (gstNumber) filters.gstNumber = gstNumber;
    if (serialNumber) filters.serialNumber = serialNumber;
    if (description) filters.description = new RegExp(description, 'i');
    if (date) filters.date = new Date(date);
    if (day) filters.day = day;
    if (paymentMode) filters.paymentMode = paymentMode;
    if (paymentStatus) filters.paymentStatus = paymentStatus;

    const expenses = await Expense.find(filters);
    res.json(expenses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new expense
router.post('/', authenticateToken, async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: error.message });
  }
});

export default router;