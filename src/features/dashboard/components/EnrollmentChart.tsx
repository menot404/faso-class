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

// Tooltip personnalisé qui utilise les classes Tailwind pour le thème
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  const { t } = useTranslation()
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="text-sm text-foreground">{`${label} : ${payload[0].value}`}</p>
        <p className="text-xs text-muted-foreground">
          {t('Nombre d’étudiants')}
        </p>
      </div>
    )
  }
  return null
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
              <XAxis
                dataKey="name"
                stroke="#888888"  // s'adapte au thème
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar
                dataKey="effectif"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}