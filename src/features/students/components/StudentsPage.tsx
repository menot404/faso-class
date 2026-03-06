// src/features/students/components/StudentsPage.tsx
import { useState } from 'react'
import { PageContainer } from '@/components/shared/PageContainer'
import { StudentTable } from './StudentTable'
import { StudentFilters } from './StudentFilters'
import { StudentForm } from './StudentForm'
import { StudentDetail } from './StudentDetail'
import { StudentActions } from './StudentActions'
import { ImportStudents } from './ImportStudents'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useDebounce } from '@/hooks/useDebounce'
import type { Student } from '@/types'

const StudentsPage = () => {
  const { t } = useTranslation('students')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [detailStudent, setDetailStudent] = useState<Student | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  const handleView = (student: Student) => {
    setDetailStudent(student)
    setIsDetailOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setDetailStudent(null)
  }

  const handleDeleteSelected = () => {
    // Implémenter la suppression groupée
    console.log('Supprimer les IDs:', selectedIds)
    // À faire : appeler une mutation qui supprime en lot
  }

  const handleImportSuccess = () => {
    // Rafraîchir la liste
    // On pourrait invalider la query ou recharger
  }

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('Gestion des étudiants')}</h1>
        <div className="flex items-center gap-2">
          <StudentActions
            selectedIds={selectedIds}
            onImport={() => setIsImportOpen(true)}
            onDeleteSelected={handleDeleteSelected}
            //students={}
          />
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Ajouter un étudiant')}
          </Button>
        </div>
      </div>

      <StudentFilters value={search} onChange={setSearch} />
      <StudentTable
        onEdit={handleEdit}
        onView={handleView}
        search={debouncedSearch}
        onSelectionChange={setSelectedIds}
      />

      <StudentForm
        open={isFormOpen}
        onClose={handleCloseForm}
        student={editingStudent}
      />

      <StudentDetail
        student={detailStudent}
        open={isDetailOpen}
        onClose={handleCloseDetail}
      />

      <ImportStudents
        open={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={handleImportSuccess}
      />
    </PageContainer>
  )
}

export default StudentsPage