const TOKEN_KEY = 'faso-token'
const USER_KEY = 'faso-user'

export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const setUser = (user: unknown) => localStorage.setItem(USER_KEY, JSON.stringify(user))
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}
export const removeUser = () => localStorage.removeItem(USER_KEY)

export const clearAuth = () => {
  removeToken()
  removeUser()
}