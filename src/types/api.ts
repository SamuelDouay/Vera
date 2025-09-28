export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export interface ApiResponse<T = unknown> {
  message: string;
  status: number;
  data?: T;
}

export interface HealthStatus {
  status: 'UP' | 'DOWN';
  timestamp: string;
}

export interface MetricsData {
  metrics: {
    activeUsers: number;
    requestsPerSecond: number;
    uptime: string;
    memoryUsage: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  expiresIn: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
}