import { useState, useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/shared/DataTable'
import { useAttendance } from '../hooks/useAttendance'
import type { Attendance } from '../types'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useDeleteAttendance } from '../hooks/useAttendanceMutations'
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
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/useTranslation'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const statusColors: Record<string, string> = {
  present: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  absent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  late: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  excused: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
}

const statusLabels: Record<string, string> = {
  present: 'Présent',
  absent: 'Absent',
  late: 'En retard',
  excused: 'Excusé',
}

export function AttendanceTable() {
  const { t, i18n } = useTranslation()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: attendance, isLoading } = useAttendance()
  const deleteMutation = useDeleteAttendance()

  const columns = useMemo<ColumnDef<Attendance>[]>(
    () => [
      {
        accessorKey: 'date',
        header: t('Date'),
        cell: ({ row }) =>
          format(new Date(row.original.date), 'P', {
            locale: i18n.language === 'fr' ? fr : undefined,
          }),
      },
      {
        accessorKey: 'studentId',
        header: t('Étudiant'),
        cell: ({ row }) => `Élève ${row.original.studentId}`, // à remplacer par vrai nom
      },
      {
        accessorKey: 'classId',
        header: t('Classe'),
        cell: ({ row }) => `Classe ${row.original.classId}`,
      },
      {
        accessorKey: 'status',
        header: t('Statut'),
        cell: ({ row }) => (
          <Badge className={statusColors[row.original.status]}>
            {t(statusLabels[row.original.status])}
          </Badge>
        ),
      },
      {
        accessorKey: 'reason',
        header: t('Motif'),
        cell: ({ row }) => row.original.reason || '—',
      },
      {
        id: 'actions',
        header: t('Actions'),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
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
    [t, i18n.language]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={attendance || []}
        totalCount={attendance?.length || 0}
        pageCount={Math.ceil((attendance?.length || 0) / pagination.pageSize)}
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