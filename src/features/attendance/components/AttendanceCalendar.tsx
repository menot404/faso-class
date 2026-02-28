import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useAttendanceByDate } from '../hooks/useAttendance'
import { useTranslation } from '@/hooks/useTranslation'

export function AttendanceCalendar() {
  const { t, i18n } = useTranslation()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const { data: attendance } = useAttendanceByDate(format(selectedDate, 'yyyy-MM-dd'))

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy', { locale: i18n.language === 'fr' ? fr : undefined })}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
              <div key={d} className="py-2 font-medium">
                {d}
              </div>
            ))}
            {days.map((day) => {
              const hasAttendance = false // à améliorer
              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    rounded-md p-2 hover:bg-muted
                    ${!isSameMonth(day, currentMonth) ? 'text-muted-foreground' : ''}
                    ${isSameDay(day, selectedDate) ? 'bg-primary text-primary-foreground' : ''}
                    ${hasAttendance ? 'font-bold' : ''}
                  `}
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="mb-4 font-semibold">
            {t('Présences du')} {format(selectedDate, 'P', { locale: i18n.language === 'fr' ? fr : undefined })}
          </h3>
          {attendance?.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('Aucune présence')}</p>
          ) : (
            <ul className="space-y-2">
              {attendance?.map((a) => (
                <li key={a.id} className="text-sm">
                  Élève {a.studentId} – {a.status}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}