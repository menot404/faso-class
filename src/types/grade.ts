export interface Grade {
  id: string
  studentId: number
  classId: string
  subject: string
  value: number
  coefficient: number
  date: string
  semester: number
  academicYear: string
  createdAt: string
  updatedAt: string
}

export interface GradeFilters {
  studentId?: number
  classId?: string
  subject?: string
  semester?: number
  academicYear?: string
  minValue?: number
  maxValue?: number
}

export interface GradeWithDetails extends Grade {
  studentName?: string
  className?: string
}

export interface GradeStats {
  average: number
  median: number
  min: number
  max: number
  count: number
}