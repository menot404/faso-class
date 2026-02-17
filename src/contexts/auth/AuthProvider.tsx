import { useState } from 'react'
import type { AuthState } from '@/types'
import { AuthContext } from './AuthContext'
import { login as loginService } from '@/services/auth/auth-service'
import { getToken, getUser, clearAuth, setUser as saveUser } from '@/services/auth/token-service'

const getInitialState = (): AuthState => {
  const token = getToken();
  const user = getUser();
  if (token && user) {
    return { user, isLoading: false, error: null };
  }
  return { user: null, isLoading: false, error: null };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(getInitialState);

  const login = async (username: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await loginService({ username, password })
      const user = {
        id: response.id.toString(),
        name: `${response.firstName} ${response.lastName}`,
        email: response.email,
        role: 'admin' as const,
      }
      saveUser(user)
      setState({ user, isLoading: false, error: null })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Échec de connexion',
      }))
      throw error
    }
  }

  const logout = () => {
    clearAuth()
    setState({ user: null, isLoading: false, error: null })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}