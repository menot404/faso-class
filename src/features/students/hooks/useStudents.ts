import { useQuery } from '@tanstack/react-query'
import { getStudents } from '../services/student-service'
import type { StudentFilters } from '@/types/student'

export const STUDENTS_QUERY_KEY = 'students'

export const useStudents = (filters: StudentFilters) => {
  return useQuery({
    queryKey: [STUDENTS_QUERY_KEY, filters],
    queryFn: () => getStudents(filters),
    placeholderData: (previousData) => previousData, // keep previous data while fetching
  })
}