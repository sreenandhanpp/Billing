export interface Expense {
  _id: string;
  expenseDetails: string;
  partyName: string;
  gstNumber: string;
  serialNumber: number;
  description: string;
  date: string;
  day: string;
  paymentMode: 'Cash' | 'Card' | 'UPI';
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  createdBy: string;
}