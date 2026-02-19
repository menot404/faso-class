import { PageContainer } from '@/components/shared/PageContainer'
import { KpiCards } from './KpiCards'
import { EnrollmentChart } from './EnrollmentChart'
import { RecentActivities } from './RecentActivities'
import { useDashboard } from '../hooks/useDashboard'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useTranslation } from 'react-i18next'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { totalStudents, totalClasses, activeClasses, classes, isLoading } =
    useDashboard()

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner className='h-8 w-8' />
      </div>
    )
  }

  return (
    <PageContainer>
      <h1 className="mb-6 text-2xl font-bold">{t('Tableau de bord')}</h1>

      <KpiCards
        totalStudents={totalStudents}
        totalClasses={totalClasses}
        activeClasses={activeClasses}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <EnrollmentChart classes={classes} />
        <RecentActivities />
      </div>
    </PageContainer>
  )
}