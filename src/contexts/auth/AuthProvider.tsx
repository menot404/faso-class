import { useState, useEffect } from 'react'
import type { User, AuthState } from '@/types/types'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    // Simuler une restauration de session
    const storedUser = localStorage.getItem('faso-user')
    if (storedUser) {
      setState({ user: JSON.parse(storedUser), isLoading: false, error: null })
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      // Simuler un appel API
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
      console.error(error);
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