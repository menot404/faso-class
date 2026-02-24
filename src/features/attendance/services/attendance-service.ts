import type { Attendance, AttendanceFilters, AttendanceStats } from '../types'

const STORAGE_KEY = 'faso-attendance'

// Données initiales (exemple)
const defaultAttendance: Attendance[] = [
  {
    id: '1',
    studentId: 1,
    classId: '1',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    studentId: 2,
    classId: '1',
    date: new Date().toISOString().split('T')[0],
    status: 'absent',
    reason: 'Maladie',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const initialize = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAttendance))
  }
}
initialize()

const getAttendance = (): Attendance[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : defaultAttendance
}

const saveAttendance = (data: Attendance[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const fetchAttendance = async (filters?: AttendanceFilters): Promise<Attendance[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  let records = getAttendance()
  if (filters) {
    if (filters.studentId) records = records.filter((a) => a.studentId === filters.studentId)
    if (filters.classId) records = records.filter((a) => a.classId === filters.classId)
    if (filters.dateFrom) records = records.filter((a) => a.date >= filters.dateFrom!)
    if (filters.dateTo) records = records.filter((a) => a.date <= filters.dateTo!)
    if (filters.status) records = records.filter((a) => a.status === filters.status)
  }
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const fetchAttendanceByDate = async (date: string, classId?: string): Promise<Attendance[]> => {
  const records = getAttendance()
  return records.filter((a) => a.date === date && (!classId || a.classId === classId))
}

export const createAttendance = async (attendance: Omit<Attendance, 'id' | 'createdAt' | 'updatedAt'>): Promise<Attendance> => {
  const records = getAttendance()
  const id = (Math.max(...records.map((r) => parseInt(r.id)), 0) + 1).toString()
  const now = new Date().toISOString()
  const newRecord: Attendance = {
    ...attendance,
    id,
    createdAt: now,
    updatedAt: now,
  }
  records.push(newRecord)
  saveAttendance(records)
  return newRecord
}

export const updateAttendance = async (id: string, data: Partial<Attendance>): Promise<Attendance> => {
  const records = getAttendance()
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) throw new Error('Présence non trouvée')
  const updated = {
    ...records[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  records[index] = updated
  saveAttendance(records)
  return updated
}

export const deleteAttendance = async (id: string): Promise<void> => {
  const records = getAttendance()
  const filtered = records.filter((r) => r.id !== id)
  saveAttendance(filtered)
}

export const computeAttendanceStats = (records: Attendance[], totalStudents?: number): AttendanceStats => {
  const present = records.filter((r) => r.status === 'present').length
  const absent = records.filter((r) => r.status === 'absent').length
  const late = records.filter((r) => r.status === 'late').length
  const excused = records.filter((r) => r.status === 'excused').length
  const total = records.length
  const rate = totalStudents ? (present / totalStudents) * 100 : 0
  return { present, absent, late, excused, total, rate }
}