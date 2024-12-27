import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, role } = useAuth();
  
  return token && role === 'admin' ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AdminRoute;