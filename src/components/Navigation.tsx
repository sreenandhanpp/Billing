import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  ShoppingCart, 
  Receipt, 
  Users, 
  RepeatIcon, 
  LogOut 
} from 'lucide-react';

const Navigation = () => {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <NavLink to="/dashboard" icon={<BarChart3 />} text="Sales" />
          <NavLink to="/dashboard" icon={<ShoppingCart />} text="Purchase" />
          <NavLink to="/expenses" icon={<Receipt />} text="Expense" />
          <NavLink to="/dashboard" icon={<Users />} text="Payroll" />
          <NavLink to="/dashboard" icon={<RepeatIcon />} text="Repeat" />
          {role === 'admin' && (
            <NavLink to="/admin/users" icon={<Users />} text="Users" />
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Exit
        </button>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link
    to={to}
    className="flex items-center text-gray-600 hover:text-gray-900"
  >
    <span className="w-5 h-5 mr-2">{icon}</span>
    {text}
  </Link>
);

export default Navigation;