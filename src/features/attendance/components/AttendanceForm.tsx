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
import { useCreateAttendance } from '../hooks/useAttendanceMutations'
import { useStudents } from '@/features/students/hooks/useStudents'
import { useClasses } from '@/features/classes/hooks/useClasses'
import { useTranslation } from '@/hooks/useTranslation'

const attendanceSchema = z.object({
  studentId: z.coerce.number().int().positive('Étudiant requis'),
  classId: z.string().min(1, 'Classe requise'),
  date: z.string().min(1, 'Date requise'),
  status: z.enum(['present', 'absent', 'late', 'excused'] as const),
  reason: z.string().optional(),
})

type AttendanceFormValues = z.infer<typeof attendanceSchema>

interface AttendanceFormProps {
  open: boolean
  onClose: () => void
}

export function AttendanceForm({ open, onClose }: AttendanceFormProps) {
  const { t } = useTranslation()
  const createMutation = useCreateAttendance()
  const { data: students } = useStudents({ page: 1, limit: 100 })
  const { data: classes } = useClasses()
const resolver : Resolver<AttendanceFormValues> = zodResolver(attendanceSchema) as Resolver<AttendanceFormValues>;
  const form = useForm<AttendanceFormValues>({
    resolver: resolver,
    defaultValues: {
      studentId: undefined,
      classId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      reason: '',
    },
  })

  const onSubmit = (values: AttendanceFormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose()
        form.reset()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>{t('Pointer une présence')}</DialogTitle>
          <DialogDescription>
            {t("Sélectionnez l'étudiant et le statut.")}
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Statut')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="present">{t('Présent')}</SelectItem>
                      <SelectItem value="absent">{t('Absent')}</SelectItem>
                      <SelectItem value="late">{t('En retard')}</SelectItem>
                      <SelectItem value="excused">{t('Excusé')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Motif (optionnel)')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {t('Annuler')}
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? t('Enregistrement...') : t('Enregistrer')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}