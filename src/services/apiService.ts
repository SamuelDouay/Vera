import type { User, HealthStatus, MetricsData, LoginRequest, CreateUserRequest, ApiResponse, AuthResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as T;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Users endpoints
    async getUsers(): Promise<User[]> {
        const res = await this.request<ApiResponse<User[]>>('/users');
        return res.data ?? [];
    }

    async getUserById(id: number): Promise<User> {
        const res = await this.request<ApiResponse<User>>(`/users/${id}`);
        if (!res.data) throw new Error('User not found');
        return res.data;
    }

    async createUser(userData: CreateUserRequest): Promise<User> {
        const res = await this.request<ApiResponse<User>>('/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        if (!res.data) throw new Error('User not created');
        return res.data;
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const res = await this.request<ApiResponse<User>>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
        if (!res.data) throw new Error('User not updated');
        return res.data;
    }

    async deleteUser(id: number): Promise<void> {
        await this.request<ApiResponse>(`/users/${id}`, {
            method: 'DELETE',
        });
    }

    // Health check
    async healthCheck(): Promise<HealthStatus> {
        const res = await this.request<ApiResponse<HealthStatus>>('/health');
        if (!res.data) throw new Error('Health status unavailable');
        return res.data;
    }

    // Metrics
    async getMetrics(): Promise<MetricsData> {
        const res = await this.request<ApiResponse<MetricsData>>('/metrics');
        if (!res.data) throw new Error('Metrics unavailable');
        return res.data;
    }

    // Authentication
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const res = await this.request<ApiResponse<AuthResponse>>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        if (!res.data) throw new Error('Login failed');
        return res.data;
    }
}

export default new ApiService();