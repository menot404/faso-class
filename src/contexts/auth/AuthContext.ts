import { createContext } from "react"
import type { AuthState } from "@/types/types"
interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}


export const AuthContext = createContext<AuthContextValue | null>(null)
