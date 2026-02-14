import { apiClient } from './client'
import type { Student, StudentFilters, StudentsResponse } from '@/types/student'

export const getStudents = async (filters: StudentFilters) => {
  const { search, page, limit } = filters
  const skip = (page - 1) * limit

  let url = `/users?limit=${limit}&skip=${skip}`

  if (search) {
    // DummyJSON supporte /users/search?q=
    url = `/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
  }

  const { data } = await apiClient.get<StudentsResponse>(url)
  return {
    users: data.users,
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  }
}

export const getStudentById = async (id: number) => {
  const { data } = await apiClient.get<Student>(`/users/${id}`)
  return data
}

export const createStudent = async (student: Omit<Student, 'id'>) => {
  // DummyJSON accepte POST /users/add (mais c'est un mock)
  const { data } = await apiClient.post<Student>('/users/add', student)
  return data
}

export const updateStudent = async (id: number, student: Partial<Student>) => {
  const { data } = await apiClient.put<Student>(`/users/${id}`, student)
  return data
}

export const deleteStudent = async (id: number) => {
  await apiClient.delete(`/users/${id}`)
  return id
}