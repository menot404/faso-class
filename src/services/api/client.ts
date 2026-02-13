import axios from 'axios'
import { getToken, removeToken } from "../auth/token-service"

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_DUMMYJSON_BASE_URL || 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' },
})

// Intercepteur pour ajouter le token JWT (si présent)
apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)