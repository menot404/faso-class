import type { Grade, GradeFilters, GradeStats } from '../types'

const STORAGE_KEY = 'faso-grades'

// Données initiales
const defaultGrades: Grade[] = [
  {
    id: '1',
    studentId: 1,
    classId: '1',
    subject: 'Mathématiques',
    value: 15,
    coefficient: 2,
    date: new Date().toISOString(),
    semester: 1,
    academicYear: '2025-2026',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    studentId: 2,
    classId: '1',
    subject: 'Français',
    value: 12,
    coefficient: 1,
    date: new Date().toISOString(),
    semester: 1,
    academicYear: '2025-2026',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Initialisation
const initializeGrades = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGrades))
  }
}
initializeGrades()

const getGrades = (): Grade[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : defaultGrades
}

const saveGrades = (grades: Grade[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(grades))
}

// CRUD
export const fetchGrades = async (filters?: GradeFilters): Promise<Grade[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  let grades = getGrades()

  if (filters) {
    if (filters.studentId) grades = grades.filter((g) => g.studentId === filters.studentId)
    if (filters.classId) grades = grades.filter((g) => g.classId === filters.classId)
    if (filters.subject) grades = grades.filter((g) => g.subject === filters.subject)
    if (filters.semester) grades = grades.filter((g) => g.semester === filters.semester)
    if (filters.academicYear) grades = grades.filter((g) => g.academicYear === filters.academicYear)
    if (filters.minValue) grades = grades.filter((g) => g.value >= filters.minValue!)
    if (filters.maxValue) grades = grades.filter((g) => g.value <= filters.maxValue!)
  }

  return grades.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const fetchGradeById = async (id: string): Promise<Grade | undefined> => {
  const grades = getGrades()
  return grades.find((g) => g.id === id)
}

export const createGrade = async (grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>): Promise<Grade> => {
  const grades = getGrades()
  const id = (Math.max(...grades.map((g) => parseInt(g.id)), 0) + 1).toString()
  const now = new Date().toISOString()
  const newGrade: Grade = {
    ...grade,
    id,
    createdAt: now,
    updatedAt: now,
  }
  grades.push(newGrade)
  saveGrades(grades)
  return newGrade
}

export const updateGrade = async (id: string, data: Partial<Grade>): Promise<Grade> => {
  const grades = getGrades()
  const index = grades.findIndex((g) => g.id === id)
  if (index === -1) throw new Error('Note non trouvée')
  const updated = {
    ...grades[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  grades[index] = updated
  saveGrades(grades)
  return updated
}

export const deleteGrade = async (id: string): Promise<void> => {
  const grades = getGrades()
  const filtered = grades.filter((g) => g.id !== id)
  saveGrades(filtered)
}

// Statistiques
export const computeGradeStats = (grades: Grade[]): GradeStats => {
  if (grades.length === 0) {
    return { average: 0, median: 0, min: 0, max: 0, count: 0 }
  }
  const values = grades.map((g) => g.value).sort((a, b) => a - b)
  const sum = values.reduce((acc, v) => acc + v, 0)
  const avg = sum / values.length
  const mid = Math.floor(values.length / 2)
  const median = values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid]
  return {
    average: Math.round(avg * 10) / 10,
    median,
    min: values[0],
    max: values[values.length - 1],
    count: values.length,
  }
}