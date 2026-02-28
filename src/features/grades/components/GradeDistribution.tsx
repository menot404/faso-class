import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import { useGrades } from '../hooks/useGrades'
import { useTranslation } from '@/hooks/useTranslation'
import { Skeleton } from '@/components/ui/skeleton'

export function GradeDistribution() {
  const { t } = useTranslation()
  const { data: grades, isLoading } = useGrades()

  if (isLoading) {
    return <Skeleton className="h-75 w-full" />
  }

  // Grouper les notes par tranche de 2 points
  const distribution = Array.from({ length: 10 }, (_, i) => {
    const min = i * 2
    const max = min + 2
    const count = grades?.filter((g) => g.value >= min && g.value < max).length || 0
    return {
      range: `${min}-${max}`,
      count,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Distribution des notes')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution}>
              <XAxis dataKey="range" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}