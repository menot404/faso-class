import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/shared/DataTable'
import { useGrades } from '../hooks/useGrades'
import type { Grade } from '../types'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { useDeleteGrade } from '../hooks/useGradeMutations'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useTranslation } from '@/hooks/useTranslation'
import { usePermissions } from '@/hooks/usePermissions'

interface GradeTableProps {
  onEdit: (grade: Grade) => void
}

export function GradeTable({ onEdit }: GradeTableProps) {
  const { t } = useTranslation()
  const { canEdit, canDelete } = usePermissions()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: grades, isLoading } = useGrades()
  const deleteMutation = useDeleteGrade()

  // Enrichir avec les noms des étudiants et classes (simulé ici)
  const enrichedGrades = useMemo(() => {
    return (grades || []).map((g) => ({
      ...g,
      studentName: `Élève ${g.studentId}`, // À remplacer par vraie donnée
      className: `Classe ${g.classId}`,
    }))
  }, [grades])

  const columns = useMemo<ColumnDef<typeof enrichedGrades[0]>[]>(
    () => [
      { accessorKey: 'studentName', header: t('Étudiant') },
      { accessorKey: 'className', header: t('Classe') },
      { accessorKey: 'subject', header: t('Matière') },
      {
        accessorKey: 'value',
        header: t('Note'),
        cell: ({ row }) => (
          <span className="font-mono font-medium">{row.original.value}/20</span>
        ),
      },
      { accessorKey: 'coefficient', header: t('Coeff.') },
      {
        accessorKey: 'date',
        header: t('Date'),
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: t('Actions'),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {canEdit && (
              <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {canDelete && (
              <Button variant="ghost" size="icon" onClick={() => setDeleteId(row.original.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ),
      },
    ],
    [t, canEdit, canDelete, onEdit]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={enrichedGrades}
        totalCount={enrichedGrades.length}
        pageCount={Math.ceil(enrichedGrades.length / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Confirmer la suppression')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('Cette action est irréversible.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Annuler')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  deleteMutation.mutate(deleteId)
                  setDeleteId(null)
                }
              }}
            >
              {t('Supprimer')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}