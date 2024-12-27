import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  expenseDetails: {
    type: String,
    required: true,
  },
  partyName: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: Number,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'Card', 'UPI'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
    required: true,
  },
  transactionId: {
    type: String,
  },
  balanceAmount: {
    type: Number,
  },
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);
