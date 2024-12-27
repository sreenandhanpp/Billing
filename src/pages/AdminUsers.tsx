import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import { User } from '../types/user';
import { Plus, Users } from 'lucide-react';

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (userData: { username: string; password?: string; role: 'admin' | 'user' }) => {
    try {
      if (selectedUser) {
        await axios.put(
          `http://localhost:5000/api/users/${selectedUser._id}`,
          userData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/users',
          userData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchUsers();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(undefined);
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add User
          </button>
        </div>

        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmit}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsers;