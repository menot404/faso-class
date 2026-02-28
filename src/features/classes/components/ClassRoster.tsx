import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Class } from '../types'
import { useStudents } from '@/features/students/hooks/useStudents'
import { useAddStudentToClass, useRemoveStudentFromClass } from '../hooks/useClasses'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Check, X } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'

interface ClassRosterProps {
  open: boolean
  onClose: () => void
  classData: Class
}

export function ClassRoster({ open, onClose, classData }: ClassRosterProps) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const { data: studentsData } = useStudents({
    page: 1,
    limit: 100,
    search: debouncedSearch,
  })

  const addMutation = useAddStudentToClass()
  const removeMutation = useRemoveStudentFromClass()

  const enrolledIds = new Set(classData.studentIds)

  const handleToggle = (studentId: number) => {
    if (enrolledIds.has(studentId)) {
      removeMutation.mutate({ classId: classData.id, studentId })
    } else {
      addMutation.mutate({ classId: classData.id, studentId })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t('Inscriptions')} – {classData.name}
          </DialogTitle>
          <DialogDescription>
            {t('Ajoutez ou retirez des étudiants de cette classe.')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Input
            placeholder={t('Rechercher un étudiant...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12.5"></TableHead>
                  <TableHead>{t('Étudiant')}</TableHead>
                  <TableHead>{t('Email')}</TableHead>
                  <TableHead className="w-25 text-right">
                    {t('Inscrit')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsData?.users.map((student) => {
                  const isEnrolled = enrolledIds.has(student.id)
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.image} />
                          <AvatarFallback>
                            {student.firstName?.[0]}
                            {student.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={isEnrolled ? 'destructive' : 'default'}
                          onClick={() => handleToggle(student.id)}
                          disabled={addMutation.isPending || removeMutation.isPending}
                        >
                          {isEnrolled ? (
                            <>
                              <X className="mr-1 h-4 w-4" />
                              {t('Retirer')}
                            </>
                          ) : (
                            <>
                              <Check className="mr-1 h-4 w-4" />
                              {t('Ajouter')}
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}