import React from 'react';
import Navigation from '../components/Navigation';
import { BarChart3 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          
          <p className="text-gray-600">
            Welcome to the Expense Tracker Dashboard. Use the navigation above to manage your expenses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;