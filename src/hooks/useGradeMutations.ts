import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGrade, updateGrade, deleteGrade } from '@/features/grades/services/grade-service'
import { GRADES_QUERY_KEY } from './useGrades'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import type { Grade } from '@/types/grade'

export const useCreateGrade = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRADES_QUERY_KEY] })
      toast.success(t('Note ajoutée avec succès'))
    },
  })
}

export const useUpdateGrade = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Grade> }) =>
      updateGrade(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [GRADES_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [GRADES_QUERY_KEY, id] })
      toast.success(t('Note mise à jour'))
    },
  })
}

export const useDeleteGrade = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: deleteGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRADES_QUERY_KEY] })
      toast.success(t('Note supprimée'))
    },
  })
}