import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
import { useCreateClass, useUpdateClass } from '../hooks/useClasses'
import type { Class } from '../types'
import { useTranslation } from 'react-i18next'

const classSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  level: z.number().int().min(1).max(12),
  academicYear: z.string().min(1, 'Année scolaire requise'),
  teacherId: z.string().optional(),
})

type ClassFormValues = z.infer<typeof classSchema>

interface ClassFormProps {
  open: boolean
  onClose: () => void
  classToEdit?: Class
}

export function ClassForm({ open, onClose, classToEdit }: ClassFormProps) {
  const { t } = useTranslation()
  const createMutation = useCreateClass()
  const updateMutation = useUpdateClass()

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: '',
      level: 6,
      academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
      teacherId: '',
    },
  })

  useEffect(() => {
    if (classToEdit) {
      form.reset({
        name: classToEdit.name,
        level: classToEdit.level,
        academicYear: classToEdit.academicYear,
        teacherId: classToEdit.teacherId || '',
      })
    } else {
      form.reset()
    }
  }, [classToEdit, form])

  const onSubmit = (values: ClassFormValues) => {
    if (classToEdit) {
      updateMutation.mutate(
        { id: classToEdit.id, data: values },
        { onSuccess: () => onClose() }
      )
    } else {
      createMutation.mutate(
        { ...values, studentIds: [] },
        { onSuccess: () => onClose() }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-105.25">
        <DialogHeader>
          <DialogTitle>
            {classToEdit ? t('Modifier la classe') : t('Créer une classe')}
          </DialogTitle>
          <DialogDescription>
            {t('Remplissez les informations de la classe.')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Nom de la classe')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="6ème A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Niveau')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('Sélectionner un niveau')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[6, 5, 4, 3, 2, 1, 0].map((level) => (
                        <SelectItem key={level} value={level.toString()}>
                          {level === 0 ? t('Terminale') : `${level}ème`}
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
            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Professeur (ID)')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ID enseignant" />
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
                {classToEdit ? t('Mettre à jour') : t('Créer')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}