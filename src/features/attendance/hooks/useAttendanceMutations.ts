import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAttendance, updateAttendance, deleteAttendance } from '../services/attendance-service'
import { ATTENDANCE_QUERY_KEY } from './useAttendance'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import type { Attendance } from '../types'

export const useCreateAttendance = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_QUERY_KEY] })
      toast.success(t('Présence enregistrée'))
    },
  })
}

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Attendance> }) =>
      updateAttendance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_QUERY_KEY, 'date'] })
      toast.success(t('Présence mise à jour'))
    },
  })
}

export const useDeleteAttendance = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: deleteAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_QUERY_KEY] })
      toast.success(t('Présence supprimée'))
    },
  })
}