import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
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
import { useStudents } from '../hooks/useStudents'
import { useDeleteStudents } from '../hooks/useStudentMutations'
import type { Student } from '@/types/student'

const StudentsPage = () => {
  const { t } = useTranslation('students')
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [detailStudent, setDetailStudent] = useState<Student | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)

  const { data, isLoading } = useStudents({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: debouncedSearch,
  })

  const deleteStudents = useDeleteStudents()

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
    if (selectedIds.length === 0) return
    deleteStudents.mutate(selectedIds, {
      onSuccess: () => setSelectedIds([]),
    })
  }

  const handleImportSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['students'] }) // À adapter si votre clé est différente
    setIsImportOpen(false)
  }

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('Gestion des étudiants')}</h1>
        <div className="flex items-center gap-2">
          <StudentActions
            students={data?.users ?? []}
            selectedIds={selectedIds}
            onImport={() => setIsImportOpen(true)}
            onDeleteSelected={handleDeleteSelected}
          />
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Ajouter un étudiant')}
          </Button>
        </div>
      </div>

      <StudentFilters value={search} onChange={setSearch} />
      <StudentTable
        data={data?.users ?? []}
        total={data?.total ?? 0}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        onEdit={handleEdit}
        onView={handleView}
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