import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateGrade, useUpdateGrade } from '../hooks/useGradeMutations'
import type { Grade } from '../types'
import { useStudents } from '@/features/students/hooks/useStudents'
import { useClasses } from '@/hooks/useClasses'
import { useTranslation } from 'react-i18next'

const gradeSchema = z.object({
  studentId: z.coerce.number().int().positive('Étudiant requis'),
  classId: z.string().min(1, 'Classe requise'),
  subject: z.string().min(1, 'Matière requise'),
  value: z.coerce.number().min(0, 'Minimum 0').max(20, 'Maximum 20'),
  coefficient: z.coerce.number().int().min(1, 'Coefficient ≥ 1'),
  date: z.string().min(1, 'Date requise'),
  semester: z.coerce.number().int().min(1).max(2),
  academicYear: z.string().min(1, 'Année scolaire requise'),
})

type GradeFormValues = z.infer<typeof gradeSchema>

interface GradeFormProps {
  open: boolean
  onClose: () => void
  gradeToEdit?: Grade | null
}

export function GradeForm({ open, onClose, gradeToEdit }: GradeFormProps) {
  const { t } = useTranslation()
  const createMutation = useCreateGrade()
  const updateMutation = useUpdateGrade()
  const { data: students } = useStudents({ page: 1, limit: 100 })
  const { data: classes } = useClasses()
const resolver: Resolver<GradeFormValues> = zodResolver(gradeSchema) as Resolver<GradeFormValues>
  const form = useForm<GradeFormValues>({
    resolver,
    defaultValues: {
      studentId: undefined,
      classId: '',
      subject: '',
      value: undefined,
      coefficient: 1,
      date: new Date().toISOString().split('T')[0],
      semester: 1,
      academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
    },
  })

  useEffect(() => {
    if (gradeToEdit) {
      form.reset({
        studentId: gradeToEdit.studentId,
        classId: gradeToEdit.classId,
        subject: gradeToEdit.subject,
        value: gradeToEdit.value,
        coefficient: gradeToEdit.coefficient,
        date: gradeToEdit.date.split('T')[0],
        semester: gradeToEdit.semester,
        academicYear: gradeToEdit.academicYear,
      })
    } else {
      form.reset()
    }
  }, [gradeToEdit, form])

  const onSubmit = (values: GradeFormValues) => {
    if (gradeToEdit) {
      updateMutation.mutate(
        { id: gradeToEdit.id, data: values },
        { onSuccess: () => onClose() }
      )
    } else {
      createMutation.mutate(values as any, { onSuccess: () => onClose() })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {gradeToEdit ? t('Modifier la note') : t('Ajouter une note')}
          </DialogTitle>
          <DialogDescription>
            {t('Saisissez les informations de la note.')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Étudiant')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Sélectionner')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {students?.users.map((s) => (
                          <SelectItem key={s.id} value={s.id.toString()}>
                            {s.firstName} {s.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Classe')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Sélectionner')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes?.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Matière')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Mathématiques" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Note /20')}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" min="0" max="20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coefficient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Coefficient')}</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Date')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Semestre')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Sélectionner')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Semestre 1</SelectItem>
                        <SelectItem value="2">Semestre 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Année scolaire')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="2025-2026" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {t('Annuler')}
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {gradeToEdit ? t('Mettre à jour') : t('Ajouter')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}