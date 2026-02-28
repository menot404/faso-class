import { useState } from 'react'
import { PageContainer } from '@/components/shared/PageContainer'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { GradeTable } from './GradeTable'
import { GradeForm } from './GradeForm'
import { GradeDistribution } from './GradeDistribution'
import { GradeImport } from './GradeImport'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from '@/hooks/useTranslation'
import { ExportButton } from '@/components/shared/ExportButton'
import { exportGradesToCSV, exportGradesToPDF } from '@/utils/export-utils'
import { useGrades } from '../hooks/useGrades'
import type { Grade } from '../types'

const GradesPage = () => {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null)
  const { data: grades } = useGrades()

  const handleEdit = (grade: Grade) => {
    setEditingGrade(grade)
    setIsFormOpen(true)
  }

  const handleExportCSV = () => {
    if (grades) exportGradesToCSV(grades, 'notes')
  }

  const handleExportPDF = () => {
    if (grades) exportGradesToPDF(grades, 'Liste des notes')
  }

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('Gestion des notes')}</h1>
        <div className="flex gap-2">
          <ExportButton onExportCSV={handleExportCSV} onExportPDF={handleExportPDF} />
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Ajouter une note')}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">{t('Liste des notes')}</TabsTrigger>
          <TabsTrigger value="distribution">{t('Distribution')}</TabsTrigger>
          <TabsTrigger value="import">{t('Import')}</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <GradeTable onEdit={handleEdit} />
        </TabsContent>
        <TabsContent value="distribution">
          <GradeDistribution />
        </TabsContent>
        <TabsContent value="import">
          <GradeImport />
        </TabsContent>
      </Tabs>

      <GradeForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingGrade(null)
        }}
        gradeToEdit={editingGrade}
      />
    </PageContainer>
  )
}


export default GradesPage;