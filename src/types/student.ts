export interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  gender: 'male' | 'female' | 'other'
  address: string
  classId: string
  className?: string
  enrollmentDate: string
  status: 'active' | 'inactive' | 'graduated' | 'suspended'
  gradeLevel: 'primary' | 'middle' | 'high'
  parentName?: string
  parentPhone?: string
  parentEmail?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface StudentFilters {
  search?: string
  classId?: string
  status?: string
  gradeLevel?: string
  gender?: string
}

export interface StudentCreateData {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  gender: 'male' | 'female' | 'other'
  address: string
  classId: string
  gradeLevel: 'primary' | 'middle' | 'high'
  parentName?: string
  parentPhone?: string
  parentEmail?: string
  notes?: string
}