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
import type { Class } from '@/types/class'
import { useTranslation } from '@/hooks/useTranslation'

interface EnrollmentChartProps {
  classes: Class[]
}

export function EnrollmentChart({ classes }: EnrollmentChartProps) {
  const { t } = useTranslation()

  const data = classes.map((cls) => ({
    name: cls.name,
    effectif: cls.studentIds?.length || 0,
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{t('Effectifs par classe')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="effectif" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}