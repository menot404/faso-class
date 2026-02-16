import { useState } from 'react'
import { PageContainer } from '@/components/shared/PageContainer'
import { StudentTable } from './StudentTable'
import { StudentFilters } from './StudentFilters'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { StudentForm } from './StudentForm'
import { useTranslation } from 'react-i18next'
import type { Student } from '@/types'

export default function StudentsPage() {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('Gestion des étudiants')}</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('Ajouter un étudiant')}
        </Button>
      </div>

      <StudentFilters />
      <StudentTable onEdit={handleEdit} />

      <StudentForm
        open={isFormOpen}
        onClose={handleCloseForm}
        student={editingStudent}
      />
    </PageContainer>
  )
}