import type {
  LoginRequest,
  RegisterRequest,
  RefreshRequest,
  ResetPasswordRequest,
  User,
  ResponseApi
} from '../types/api';


const API_BASE_URL = import.meta.env.DEV
  ? '/api'  // Utilise le proxy en développement
  : import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.token;
  }

  removeToken(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.token}`,
      };
    }


    try {
      const response = await fetch(url, config);
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        responseData = { message: 'Invalid JSON response' };
      }

      if (!response.ok) {
        // Créer une erreur enrichie avec les données de la réponse
        const error = new Error(`${responseData.data}`) as any;
        error.status = response.status;
        error.responseData = responseData;
        throw error;
      }

      return responseData as T;
    } catch (error) {
      ;
      throw error;
    }
  }

  async login(email: string, password: string): Promise<ResponseApi<{ token: string; user: User }>> {
    const loginData: LoginRequest = { email, password };

    console.log('🔄 Login attempt:', { email });

    const data = await this.request<ResponseApi<{ token: string; user: User }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    console.log('📨 Login response:', data);

    if (data.data?.token) {
      this.setToken(data.data.token);
      localStorage.setItem('authToken', data.data.token);
      console.log('✅ Token stored');
    }

    if (data.data?.user) {
      localStorage.setItem('user', JSON.stringify(data.data.user));
      console.log('✅ User stored:', data.data.user);
    }


    return data;
  }

  async register(userData: RegisterRequest): Promise<ResponseApi<User>> {
    return await this.request<ResponseApi<User>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.removeToken();
    }
  }

  async refreshToken(refreshToken: string): Promise<ResponseApi<{ token: string }>> {
    return await this.request<ResponseApi<{ token: string }>>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken } as RefreshRequest),
    });
  }

  async forgotPassword(email: string): Promise<ResponseApi> {
    return await this.request<ResponseApi>(`/auth/forgot?email=${encodeURIComponent(email)}`, {
      method: 'POST',
    });
  }

  async resetPassword(resetData: ResetPasswordRequest): Promise<ResponseApi> {
    return await this.request<ResponseApi>('/auth/reset', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
  }

  // Users endpoints
  async getAllUsers(limit: number = 100, offset: number = 0): Promise<ResponseApi<User[]>> {
    return await this.request<ResponseApi<User[]>>(`/users?limit=${limit}&offset=${offset}`);
  }

  async getUserById(id: number): Promise<ResponseApi<User>> {
    return await this.request<ResponseApi<User>>(`/users/${id}`);
  }

  async getUserByEmail(email: string): Promise<ResponseApi<User>> {
    return await this.request<ResponseApi<User>>(`/users/email?email=${encodeURIComponent(email)}`);
  }

  async createUser(userData: User): Promise<ResponseApi<User>> {
    return await this.request<ResponseApi<User>>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<ResponseApi<User>> {
    return await this.request<ResponseApi<User>>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async getUsersCount(): Promise<ResponseApi<number>> {
    return await this.request<ResponseApi<number>>('/users/count');
  }

  // Health check
  async healthCheck(): Promise<ResponseApi> {
    return await this.request<ResponseApi>('/health');
  }
}

export const apiService = new ApiService();