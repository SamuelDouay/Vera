import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import type { User, ResponseApi } from '../types/api';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: (limit?: number, offset?: number) => Promise<ResponseApi<User[]>>;
  createUser: (userData: User) => Promise<ResponseApi<User>>;
  updateUser: (id: number, userData: Partial<User>) => Promise<ResponseApi<User>>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (limit: number = 100, offset: number = 0): Promise<ResponseApi<User[]>> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getAllUsers(limit, offset);
      setUsers(response.data || []);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: User): Promise<ResponseApi<User>> => {
    setError(null);
    try {
      const response = await apiService.createUser(userData);
      await fetchUsers();
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      throw err;
    }
  };

  const updateUser = async (id: number, userData: Partial<User>): Promise<ResponseApi<User>> => {
    setError(null);
    try {
      const response = await apiService.updateUser(id, userData);
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      ));
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteUser = async (id: number): Promise<void> => {
    setError(null);
    try {
      await apiService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};