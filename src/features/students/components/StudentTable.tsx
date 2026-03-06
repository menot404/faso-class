// src/features/students/components/StudentTable.tsx
import { useMemo, useState, useEffect } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/shared/DataTable'
import { useStudents } from '../hooks/useStudents'
import type { Student } from '@/types/student'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye } from 'lucide-react'
import { useDeleteStudent } from '../hooks/useStudentMutations'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslation } from '@/hooks/useTranslation'
import { Checkbox } from '@/components/ui/checkbox'

interface StudentTableProps {
  onEdit: (student: Student) => void
  onView?: (student: Student) => void // Nouveau prop optionnel
  search: string
  onSelectionChange?: (selectedIds: number[]) => void
}

export function StudentTable({ onEdit, onView, search, onSelectionChange }: StudentTableProps) {
  const { t } = useTranslation()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [rowSelection, setRowSelection] = useState({})

  // Réinitialiser la page à 0 quand la recherche change
  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
  }, [search])

  const { data, isLoading } = useStudents({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search,
  })

  const deleteMutation = useDeleteStudent()

  // Notifier le parent quand la sélection change
  useEffect(() => {
    if (onSelectionChange && data?.users) {
      const selectedIndices = Object.keys(rowSelection).map(Number)
      const selectedIds = selectedIndices.map(index => data.users[index].id)
      onSelectionChange(selectedIds)
    }
  }, [rowSelection, data, onSelectionChange])

  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'image',
        header: '',
        cell: ({ row }) => (
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.original.image} alt={row.original.firstName} />
            <AvatarFallback>
              {row.original.firstName?.[0]}
              {row.original.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        ),
        size: 50,
      },
      {
        accessorKey: 'firstName',
        header: t('Prénom'),
        cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
      },
      {
        accessorKey: 'email',
        header: t('Email'),
      },
      {
        accessorKey: 'phone',
        header: t('Téléphone'),
      },
      {
        accessorKey: 'class',
        header: t('Classe'),
        cell: ({ row }) => row.original.class || '—',
      },
      {
        id: 'actions',
        header: t('Actions'),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {onView && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView(row.original)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(row.original)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteId(row.original.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [t, onEdit, onView]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.users ?? []}
        totalCount={data?.total ?? 0}
        pageCount={Math.ceil((data?.total ?? 0) / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Confirmer la suppression')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('Cette action est irréversible. Voulez‑vous vraiment supprimer cet étudiant ?')}
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