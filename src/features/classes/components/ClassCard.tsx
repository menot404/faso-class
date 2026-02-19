import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Edit, Trash2, UserPlus } from 'lucide-react'
import type { Class } from '../types'
import { useDeleteClass } from '../hooks/useClasses'
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
import { ClassForm } from './ClassForm'
import { ClassRoster } from './ClassRoster'
import { useTranslation } from 'react-i18next'
import { usePermissions } from '../hooks/usePermissions'

interface ClassCardProps {
  classData: Class
}

export function ClassCard({ classData }: ClassCardProps) {
  const { t } = useTranslation()
  const { canEdit, canDelete } = usePermissions()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isRosterOpen, setIsRosterOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const deleteMutation = useDeleteClass()

  const studentCount = classData.studentIds?.length || 0

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{classData.name}</CardTitle>
              <CardDescription>
                {t('Niveau')} {classData.level} • {classData.academicYear}
              </CardDescription>
            </div>
            <Badge variant="outline">
              <Users className="mr-1 h-3 w-3" />
              {studentCount} {t('élèves')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          {classData.teacherId && (
            <p className="text-sm text-muted-foreground">
              {t('Professeur')}: ID {classData.teacherId} (à améliorer)
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsRosterOpen(true)}
          >
            <UserPlus className="mr-1 h-4 w-4" />
            {t('Inscriptions')}
          </Button>
          {canEdit && (
            <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Modals */}
      <ClassForm
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        classToEdit={classData}
      />
      <ClassRoster
        open={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        classData={classData}
      />
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Confirmer la suppression')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('Cette classe sera définitivement supprimée. Cette action est irréversible.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Annuler')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteMutation.mutate(classData.id)
                setDeleteDialogOpen(false)
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