import { useState } from 'react'
import { PageContainer } from '@/components/shared/PageContainer'
import { StudentTable } from './StudentTable'
import { StudentFilters } from './StudentFilters'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { StudentForm } from './StudentForm'
import { useTranslation } from '@/hooks/useTranslation'
import { useDebounce } from '@/hooks/useDebounce'
import type { Student } from '@/types'

const StudentsPage = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

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

      <StudentFilters value={search} onChange={setSearch} />
      <StudentTable onEdit={handleEdit} search={debouncedSearch} />

      <StudentForm
        open={isFormOpen}
        onClose={handleCloseForm}
        student={editingStudent}
      />
    </PageContainer>
  )
}

export default StudentsPage