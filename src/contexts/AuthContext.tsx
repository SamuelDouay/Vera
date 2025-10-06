import React, { createContext, useState, useContext, useEffect } from 'react';
import type {ReactNode} from 'react';
import { apiService } from '../services/apiService';
import type { User, RegisterRequest, AuthContextType } from '../types/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = apiService.getToken();
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        apiService.removeToken();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await apiService.login(email, password);
      
      if (response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        throw new Error('No user data received from server');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Échec de la connexion. Vérifiez vos identifiants.';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      await apiService.register(userData);
      // Après l'inscription, connectez automatiquement l'utilisateur
      await login(userData.email, userData.password);
    } catch (error: any) {
      const errorMessage = error.message || "Échec de l'inscription.";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setError(null);
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,  
    error,
    setError: (error: string | null) => setError(error),
    isAuthenticated: !!user && !!apiService.getToken(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};