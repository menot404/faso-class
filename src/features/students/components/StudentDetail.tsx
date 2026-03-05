import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from '@/hooks/useTranslation'
import type { Student } from '../types'

interface StudentDetailProps {
  student: Student | null
  open: boolean
  onClose: () => void
}

export function StudentDetail({ student, open, onClose }: StudentDetailProps) {
  const { t } = useTranslation('students')

  if (!student) return null

  const fullName = `${student.firstName} ${student.lastName}`
  const initials = `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('detail.title', 'Détail de l’étudiant')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.image} alt={fullName} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">{t('fields.id', 'ID')}</p>
              <p>{student.id}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">{t('fields.phone', 'Téléphone')}</p>
              <p>{student.phone || '—'}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">{t('fields.birthDate', 'Date de naissance')}</p>
              <p>{student.birthDate ? new Date(student.birthDate).toLocaleDateString() : '—'}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">{t('fields.class', 'Classe')}</p>
              <Badge variant="outline">{student.class || 'Non assigné'}</Badge>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">{t('fields.grade', 'Niveau')}</p>
              <p>{student.grade || '—'}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">{t('fields.address', 'Adresse')}</p>
              <p>{student.address || '—'}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}