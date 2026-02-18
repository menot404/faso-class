import type {Class, ClassFilters } from '../types'
import { defaultClasse} from '../../../../data//defaultClasses'

const STORAGE_KEY = 'faso-classes'
const defaultClasses: Class[] = defaultClasse
// Initialiser le localStorage si vide
const initializeClasses = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultClasses))
  }
}
initializeClasses()

// Helper pour lire et écrire
const getClasses = (): Class[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : defaultClasses
}

const saveClasses = (classes: Class[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(classes))
}

// CRUD
export const fetchClasses = async (filters?: ClassFilters): Promise<Class[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300)) // simulate network
  let classes = getClasses()

  if (filters) {
    if (filters.level) {
      classes = classes.filter((c) => c.level === filters.level)
    }
    if (filters.academicYear) {
      classes = classes.filter((c) => c.academicYear === filters.academicYear)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      classes = classes.filter((c) => c.name.toLowerCase().includes(searchLower))
    }
  }

  return classes
}

export const fetchClassById = async (id: string): Promise<Class | undefined> => {
  const classes = getClasses()
  return classes.find((c) => c.id === id)
}

export const createClass = async (newClass: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>): Promise<Class> => {
  const classes = getClasses()
  const id = (Math.max(...classes.map((c) => parseInt(c.id)), 0) + 1).toString()
  const now = new Date().toISOString()
  const created: Class = {
    ...newClass,
    id,
    studentIds: newClass.studentIds || [],
    createdAt: now,
    updatedAt: now,
  }
  classes.push(created)
  saveClasses(classes)
  return created
}

export const updateClass = async (id: string, data: Partial<Class>): Promise<Class> => {
  const classes = getClasses()
  const index = classes.findIndex((c) => c.id === id)
  if (index === -1) throw new Error('Classe non trouvée')
  const updated = {
    ...classes[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  classes[index] = updated
  saveClasses(classes)
  return updated
}

export const deleteClass = async (id: string): Promise<void> => {
  const classes = getClasses()
  const filtered = classes.filter((c) => c.id !== id)
  saveClasses(filtered)
}

// Méthodes spécifiques
export const addStudentToClass = async (classId: string, studentId: number): Promise<Class> => {
  const classes = getClasses()
  const index = classes.findIndex((c) => c.id === classId)
  if (index === -1) throw new Error('Classe non trouvée')
  if (!classes[index].studentIds.includes(studentId)) {
    classes[index].studentIds.push(studentId)
    classes[index].updatedAt = new Date().toISOString()
    saveClasses(classes)
  }
  return classes[index]
}

export const removeStudentFromClass = async (classId: string, studentId: number): Promise<Class> => {
  const classes = getClasses()
  const index = classes.findIndex((c) => c.id === classId)
  if (index === -1) throw new Error('Classe non trouvée')
  classes[index].studentIds = classes[index].studentIds.filter((id) => id !== studentId)
  classes[index].updatedAt = new Date().toISOString()
  saveClasses(classes)
  return classes[index]
}