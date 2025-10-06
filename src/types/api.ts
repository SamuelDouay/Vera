// Types pour l'authentification
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  resetToken: string;
}

// Types pour les utilisateurs
export interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  role?: string;
}

// Réponse API générique
export interface ResponseApi<T = undefined> {
  data: T;
  meta?: Record<string, undefined>;
}

// Contexte d'authentification
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  isAuthenticated: boolean;
}