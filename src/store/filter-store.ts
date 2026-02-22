import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StudentFilters {
  search: string
  classId: string | null
  level: number | null
  page: number
  limit: number
}

interface FilterState {
  studentFilters: StudentFilters
  setStudentFilters: (filters: Partial<StudentFilters>) => void
  resetStudentFilters: () => void
}

const defaultStudentFilters: StudentFilters = {
  search: '',
  classId: null,
  level: null,
  page: 1,
  limit: 10,
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      studentFilters: defaultStudentFilters,
      setStudentFilters: (filters) =>
        set((state) => ({
          studentFilters: { ...state.studentFilters, ...filters },
        })),
      resetStudentFilters: () => set({ studentFilters: defaultStudentFilters }),
    }),
    {
      name: 'faso-filters',
    }
  )
)