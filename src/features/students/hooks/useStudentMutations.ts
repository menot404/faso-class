import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createStudent, updateStudent, deleteStudent } from '../services/student-service'
import type { Student } from '@/types/student'
import { STUDENTS_QUERY_KEY } from './useStudents'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] })
      toast.success(t('Étudiant créé avec succès'))
    },
    onError: () => {
      toast.error(t('Erreur lors de la création'))
    },
  })
}

export const useUpdateStudent = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Student> }) =>
      updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] })
      toast.success(t('Étudiant mis à jour'))
    },
    onError: () => {
      toast.error(t('Erreur lors de la mise à jour'))
    },
  })
}

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] })
      toast.success(t('Étudiant supprimé'))
    },
    onError: () => {
      toast.error(t('Erreur lors de la suppression'))
    },
  })
}