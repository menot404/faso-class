import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/shared/DataTable'
import { useStudents } from '../hooks/useStudents'
import type { Student } from '@/types/student'
import {  } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
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

interface StudentTableProps {
  onEdit: (student: Student) => void
}

export function StudentTable({ onEdit }: StudentTableProps) {
  const { t } = useTranslation()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = useStudents({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search,
  })

  const deleteMutation = useDeleteStudent()

  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
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
    [t, onEdit]
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