export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused'

export interface Attendance {
  id: string
  studentId: number
  classId: string
  date: string
  status: AttendanceStatus
  reason?: string
  createdAt: string
  updatedAt: string
}

export interface AttendanceFilters {
  studentId?: number
  classId?: string
  dateFrom?: string
  dateTo?: string
  status?: AttendanceStatus
}

export interface AttendanceStats {
  present: number
  absent: number
  late: number
  excused: number
  total: number
  rate: number // pourcentage de présence
}