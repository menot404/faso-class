import React, { useState, useEffect } from 'react'
import { AuthContext, type AuthContextType } from './AuthContext'
import authService from '@/services/auth.service'
import type { User } from '@/types/auth'
import type { RegisterFormData } from '@/features/auth/schemas/auth.schema'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('fasoClass_user')
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Failed to load user', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authService.login({ email, password })
      
      // S'assurer que le rôle est du bon type
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        role: response.user.role as User['role'], // Conversion du type
        language: response.user.language,
        schoolId: response.user.schoolId,
      }
      
      setUser(userData)
      localStorage.setItem('fasoClass_user', JSON.stringify(userData))
    } catch (error) {
      console.error('Login failed', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterFormData) => {
    setIsLoading(true)
    try {
      const response = await authService.register(userData)
      
      // S'assurer que le rôle est du bon type
      const newUser: User = {
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        role: response.user.role as User['role'], // Conversion du type
        language: response.user.language,
        schoolId: response.user.schoolId,
      }
      
      setUser(newUser)
      localStorage.setItem('fasoClass_user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Registration failed', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setUser(null)
      localStorage.removeItem('fasoClass_user')
    } catch (error) {
      console.error('Logout failed', error)
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}