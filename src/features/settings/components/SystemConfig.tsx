import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSettings } from '../hooks/useSettings'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import type { SystemConfig } from '../types'

const systemSchema = z.object({
  academicYear: z.string().min(1, 'Année scolaire requise'),
  semester: z.coerce.number().int().min(1).max(2),
  allowRegistration: z.boolean(),
  allowGrading: z.boolean(),
})

export function SystemConfig() {
  const { t } = useTranslation()
  const { system, updateSystem } = useSettings()

  const form = useForm({
    resolver: zodResolver(systemSchema),
    defaultValues: system,
  })

  const onSubmit = (data: Partial<SystemConfig>) => {
    updateSystem(data)
    toast.success(t('Configuration système mise à jour'))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Semestre actif')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
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
        <FormField
          control={form.control}
          name="allowRegistration"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>{t('Autoriser les inscriptions')}</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allowGrading"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>{t('Autoriser la saisie des notes')}</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">{t('Enregistrer')}</Button>
      </form>
    </Form>
  )
}