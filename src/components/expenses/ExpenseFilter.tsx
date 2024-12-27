import React from 'react';
import { Search } from 'lucide-react';

interface FilterProps {
  filters: {
    expenseDetails: string;
    partyName: string;
    gstNumber: string;
    serialNumber: string;
    description: string;
    date: string;
    day: string;
    paymentMode: string;
    paymentStatus: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const ExpenseFilter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const paymentModes = ['Cash', 'Card', 'UPI'];
  const paymentStatuses = ['Paid', 'Pending', 'Partial'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold">Filter Expenses</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Expense Details"
          value={filters.expenseDetails}
          onChange={(e) => onFilterChange('expenseDetails', e.target.value)}
          className="p-2 border rounded"
        />
        
        <input
          type="text"
          placeholder="Party Name"
          value={filters.partyName}
          onChange={(e) => onFilterChange('partyName', e.target.value)}
          className="p-2 border rounded"
        />
        
        <input
          type="text"
          placeholder="GST Number"
          value={filters.gstNumber}
          onChange={(e) => onFilterChange('gstNumber', e.target.value)}
          className="p-2 border rounded"
        />
        
        <input
          type="number"
          placeholder="Serial Number"
          value={filters.serialNumber}
          onChange={(e) => onFilterChange('serialNumber', e.target.value)}
          className="p-2 border rounded"
        />
        
        <input
          type="text"
          placeholder="Description"
          value={filters.description}
          onChange={(e) => onFilterChange('description', e.target.value)}
          className="p-2 border rounded"
        />
        
        <input
          type="date"
          value={filters.date}
          onChange={(e) => onFilterChange('date', e.target.value)}
          className="p-2 border rounded"
        />
        
        <select
          value={filters.day}
          onChange={(e) => onFilterChange('day', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        
        <select
          value={filters.paymentMode}
          onChange={(e) => onFilterChange('paymentMode', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Payment Mode</option>
          {paymentModes.map(mode => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
        
        <select
          value={filters.paymentStatus}
          onChange={(e) => onFilterChange('paymentStatus', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Payment Status</option>
          {paymentStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;