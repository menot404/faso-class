export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student'
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}