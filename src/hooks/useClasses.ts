import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchClasses,
  fetchClassById,
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass,
  removeStudentFromClass,
} from '../features/classes/services/class-service'
import type { Class, ClassFilters } from '@/types/class'
import { toast } from 'sonner'
import { useTranslation } from '@/hooks/useTranslation'

export const CLASSES_QUERY_KEY = 'classes'

// Queries
export const useClasses = (filters?: ClassFilters) => {
  return useQuery({
    queryKey: [CLASSES_QUERY_KEY, filters],
    queryFn: () => fetchClasses(filters),
  })
}

export const useClass = (id: string) => {
  return useQuery({
    queryKey: [CLASSES_QUERY_KEY, id],
    queryFn: () => fetchClassById(id),
    enabled: !!id,
  })
}

// Mutations
export const useCreateClass = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY] })
      toast.success(t('Classe créée avec succès'))
    },
  })
}

export const useUpdateClass = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Class> }) =>
      updateClass(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY, id] })
      toast.success(t('Classe mise à jour'))
    },
  })
}

export const useDeleteClass = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY] })
      toast.success(t('Classe supprimée'))
    },
  })
}

export const useAddStudentToClass = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: ({ classId, studentId }: { classId: string; studentId: number }) =>
      addStudentToClass(classId, studentId),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY, classId] })
      toast.success(t('Étudiant ajouté à la classe'))
    },
  })
}

export const useRemoveStudentFromClass = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: ({ classId, studentId }: { classId: string; studentId: number }) =>
      removeStudentFromClass(classId, studentId),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [CLASSES_QUERY_KEY, classId] })
      toast.success(t('Étudiant retiré de la classe'))
    },
  })
}