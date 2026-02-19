import { useQueries } from '@tanstack/react-query'
import { fetchClasses } from '@/features/classes/services/class-service'
import { getStudents } from '@/services/api/students'
import { STUDENTS_QUERY_KEY } from '@/features/students/hooks/useStudents'
import { CLASSES_QUERY_KEY } from '@/features/classes/hooks/useClasses'
import type { Class } from '@/features/classes/types' // adapter le chemin si nécessaire

export const useDashboard = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: [STUDENTS_QUERY_KEY, { page: 1, limit: 1 }],
        queryFn: () => getStudents({ page: 1, limit: 1 }),
        // Typage explicite de la réponse : on suppose que getStudents renvoie un objet contenant 'total'
        select: (data: { total: number }) => data.total,
      },
      {
        queryKey: [CLASSES_QUERY_KEY],
        // On appelle fetchClasses sans argument (paramètre optionnel)
        queryFn: () => fetchClasses(),
        // Typage des données en tant que tableau de Class
        select: (data: Class[]) => ({
          total: data.length,
          withStudents: data.filter((c) => c.studentIds.length > 0).length,
        }),
      },
      {
        queryKey: [CLASSES_QUERY_KEY, 'all'],
        queryFn: () => fetchClasses(),
        // Pas de select, on récupère toutes les classes
      },
    ],
  })

  const [studentsResult, classesStatsResult, allClassesResult] = results

  return {
    totalStudents: studentsResult.data ?? 0,
    totalClasses: classesStatsResult.data?.total ?? 0,
    activeClasses: classesStatsResult.data?.withStudents ?? 0,
    classes: allClassesResult.data ?? [],
    isLoading:
      studentsResult.isLoading ||
      classesStatsResult.isLoading ||
      allClassesResult.isLoading,
    error:
      studentsResult.error ||
      classesStatsResult.error ||
      allClassesResult.error,
  }
}