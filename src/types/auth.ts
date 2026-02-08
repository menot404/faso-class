export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'teacher' | 'parent' | 'student'
  language: string
  schoolId: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  role: 'admin' | 'teacher' | 'parent'
  schoolName: string
}