import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchReports, fetchTemplates, generateReport } from '@/features/reports/services/report-service'
import type { ReportFilters, ReportFormat } from '@/features/reports/types'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export const REPORTS_QUERY_KEY = 'reports'
export const TEMPLATES_QUERY_KEY = 'report-templates'

export const useReports = (filters?: ReportFilters) => {
  return useQuery({
    queryKey: [REPORTS_QUERY_KEY, filters],
    queryFn: () => fetchReports(filters),
  })
}

export const useTemplates = () => {
  return useQuery({
    queryKey: [TEMPLATES_QUERY_KEY],
    queryFn: fetchTemplates,
  })
}

export const useGenerateReport = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: ({ templateId, format, filters }: { templateId: string; format: ReportFormat; filters?: any }) =>
      generateReport(templateId, format, filters),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REPORTS_QUERY_KEY] })
      toast.success(t('Rapport généré avec succès'))
    },
    onError: () => {
      toast.error(t('Erreur lors de la génération'))
    },
  })
}