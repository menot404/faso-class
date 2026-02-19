import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, School } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface KpiCardsProps {
  totalStudents: number
  totalClasses: number
  activeClasses: number
}

export function KpiCards({ totalStudents, totalClasses, activeClasses }: KpiCardsProps) {
  const { t } = useTranslation()

  const items = [
    {
      title: t('Total élèves'),
      value: totalStudents,
      icon: Users,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
    {
      title: t('Total classes'),
      value: totalClasses,
      icon: School,
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
    },
    {
      title: t('Classes actives'),
      value: activeClasses,
      icon: GraduationCap,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className={`rounded-full p-2 ${item.bgColor} ${item.textColor}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}