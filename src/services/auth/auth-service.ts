import { apiClient } from '../api/client'
import { setToken, setUser } from './token-service'

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export const login = async (credentials: LoginCredentials) => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials)
  // DummyJSON retourne un token
  setToken(data.token)
  setUser({
    id: data.id,
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    role: 'admin', // par défaut, on peut enrichir plus tard
  })
  return data
}