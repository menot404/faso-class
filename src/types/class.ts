export interface Class {
  id: string
  name: string
  level: number
  academicYear: string 
  teacherId?: string
  studentIds: number[] 
  createdAt: string
  updatedAt: string
}

export interface ClassFilters {
  level?: number
  academicYear?: string
  search?: string
}

export interface ClassWithStats extends Class {
  studentCount: number
}