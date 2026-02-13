import { useState } from 'react'
import type { User, AuthState } from '@/types/types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state lazily from localStorage – no effect needed
  const [state, setState] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem('faso-user')
    if (storedUser) {
      return { user: JSON.parse(storedUser), isLoading: false, error: null }
    }
    return { user: null, isLoading: false, error: null }
  })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const mockUser: User = {
        id: '1',
        name: 'Admin Faso',
        email,
        role: 'admin',
      }
      localStorage.setItem('faso-user', JSON.stringify(mockUser))
      setState({ user: mockUser, isLoading: false, error: null })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Échec de connexion' }))
      console.error(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('faso-user')
    setState({ user: null, isLoading: false, error: null })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}