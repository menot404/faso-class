import { useAttendance } from '../hooks/useAttendance'
import { computeAttendanceStats } from '../services/attendance-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '@/components/ui/skeleton'

export function AttendanceStats() {
  const { t } = useTranslation()
  const { data: attendance, isLoading } = useAttendance()

  if (isLoading) {
    return <Skeleton className="h-50 w-full" />
  }

  const stats = attendance ? computeAttendanceStats(attendance) : null

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{t('Présents')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.present || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{t('Absents')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.absent || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{t('Retards')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.late || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{t('Excusés')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.excused || 0}</div>
        </CardContent>
      </Card>
    </div>
  )
}