export interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  birthDate?: string
  grade?: number
  class?: string
  address?: string
  // DummyJSON a ces champs
  image?: string
  gender?: string
}

export interface StudentFilters {
  search?: string
  grade?: string
  class?: string
  page: number
  limit: number
}

export interface StudentsResponse {
  users: Student[]
  total: number
  skip: number
  limit: number
}