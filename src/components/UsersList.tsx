// src/components/UsersList.tsx

import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import type { CreateUserRequest } from '../types/api';

const UsersList: React.FC = () => {
  const { users, loading, error, deleteUser, createUser } = useUsers();
  const [newUser, setNewUser] = useState<Omit<CreateUserRequest, 'age'> & { age: string }>({
    name: '',
    email: '',
    age: ''
  });

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await createUser({
        ...newUser,
        age: parseInt(newUser.age)
      });
      setNewUser({ name: '', email: '', age: '' });
    } catch {
      // Error is already handled in the hook
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="text-center py-4">Loading users...</div>;

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: {error}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newUser.age}
            onChange={handleInputChange}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add User
        </button>
      </form>

      {/* Users List */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500">Age: {user.age}</p>
                <p className="text-gray-400 text-sm">ID: {user.id}</p>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found. Add your first user above.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;