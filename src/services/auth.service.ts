// src/services/auth.service.ts
import axios from 'axios';
import type { LoginFormData, RegisterFormData } from '../features/auth/schemas/auth.schema';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.fasoclass.com/v1';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    language: string;
    schoolId: string;
  };
}

export interface RegisterResponse extends AuthResponse {
  message: string;
  requiresVerification: boolean;
}

class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      
      if (response.data.token) {
        this.setToken(response.data.token);
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData: RegisterFormData): Promise<RegisterResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      if (response.data.token) {
        this.setToken(response.data.token);
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: this.getAuthHeaders(),
      });
    } finally {
      this.clearAuth();
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
        headers: this.getAuthHeaders(),
      });
      
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  private setToken(token: string): void {
    localStorage.setItem('accessToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private setUser(user: AuthResponse['user']): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private clearAuth(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Une erreur est survenue';
      return new Error(message);
    }
    return new Error('Une erreur inattendue est survenue');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}

export default AuthService.getInstance();