import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import ExpenseFilter from '../components/expenses/ExpenseFilter';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { useAuth } from '../context/AuthContext';
import { Expense } from '../types/expense';
import { Plus } from 'lucide-react';

const ExpensesPage = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    expenseDetails: '',
    partyName: '',
    gstNumber: '',
    serialNumber: '',
    description: '',
    date: '',
    day: '',
    paymentMode: '',
    paymentStatus: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = async (expenseData: any) => {
    try {
      console.log(expenseData)
      await axios.post('http://localhost:5000/api/expenses', expenseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExpenses();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </button>
        </div>

        <ExpenseFilter
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <ExpenseList expenses={expenses} />

        {showForm && (
          <ExpenseForm
            onSubmit={handleAddExpense}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;