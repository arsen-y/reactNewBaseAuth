export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface RegisterResponse {
  user: User
  token: string
}

export interface LoginResponse {
  token: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}
