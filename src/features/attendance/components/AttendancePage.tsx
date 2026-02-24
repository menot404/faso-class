import { useState } from 'react'
import { PageContainer } from '@/components/shared/PageContainer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AttendanceTable } from './AttendanceTable'
import { AttendanceStats } from './AttendanceStats'
import { AttendanceCalendar } from './AttendanceCalendar'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { AttendanceForm } from './AttendanceForm'

export default function AttendancePage() {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('Gestion des présences')}</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('Pointer')}
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">{t('Liste')}</TabsTrigger>
          <TabsTrigger value="stats">{t('Statistiques')}</TabsTrigger>
          <TabsTrigger value="calendar">{t('Calendrier')}</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <AttendanceTable />
        </TabsContent>
        <TabsContent value="stats">
          <AttendanceStats />
        </TabsContent>
        <TabsContent value="calendar">
          <AttendanceCalendar />
        </TabsContent>
      </Tabs>

      <AttendanceForm open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </PageContainer>
  )
}