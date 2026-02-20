import { useQuery } from '@tanstack/react-query'
import { computeGradeStats, fetchGrades } from '@/features/grades/services/grade-service' 
import type { GradeFilters, Grade } from '@/types/grade'

export const GRADES_QUERY_KEY = 'grades'

export const useGrades = (filters?: GradeFilters) => {
  return useQuery({
    queryKey: [GRADES_QUERY_KEY, filters],
    queryFn: () => fetchGrades(filters),
  })
}

export const useGradeStats = (grades: Grade[]) => {
  return useQuery({
    queryKey: ['grade-stats', grades],
    queryFn: () => computeGradeStats(grades),
    enabled: grades.length > 0,
  })
}