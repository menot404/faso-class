import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label' // <-- Importer Label
import { useSettings } from '../hooks/useSettings'
import { useTranslation } from '@/hooks/useTranslation'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import type { SystemConfig } from '../types'

const systemSchema = z.object({
  academicYear: z.string().min(1, 'Année scolaire requise'),
  semester: z.coerce.number().int().min(1).max(2),
  allowRegistration: z.boolean(),
  allowGrading: z.boolean(),
})

export function SystemConfig() {
  const { t } = useTranslation()
  const {
    system,
    updateSystem,
    theme,
    setTheme,
    language,
    setLanguage,
    notifications,
    setNotifications,
  } = useSettings()

  

  const form = useForm({
    resolver: zodResolver(systemSchema),
    defaultValues: system,
  })

  const onSubmit = (data: Partial<SystemConfig>) => {
    updateSystem(data)
    toast.success(t('Configuration système mise à jour'))
  }

  return (
    <div className="space-y-6">
      {/* Paramètres généraux (avec formulaire) */}
      <div>
        <h3 className="text-lg font-medium mb-4">{t('Paramètres généraux')}</h3>
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
                    <FormDescription>
                      {t('Permet aux étudiants de s\'inscrire aux classes')}
                    </FormDescription>
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
                    <FormDescription>
                      {t('Active ou désactive la modification des notes')}
                    </FormDescription>
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
      </div>

      <Separator className="my-6" />

      {/* Préférences utilisateur (sans formulaire) */}
      <div>
        <h3 className="text-lg font-medium mb-4">{t('Préférences')}</h3>
        <div className="space-y-4">
          {/* Thème */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label>{t('Thème')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('Choisissez l\'apparence de l\'application')}
              </p>
            </div>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t('Clair')}</SelectItem>
                <SelectItem value="dark">{t('Sombre')}</SelectItem>
                <SelectItem value="system">{t('Système')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Langue */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label>{t('Langue')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('Langue de l\'interface')}
              </p>
            </div>
            <Select value={language} onValueChange={(value: 'fr' | 'en') => setLanguage(value)}>
              <SelectTrigger className="w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label>{t('Notifications')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('Afficher les notifications toast')}
              </p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </div>
    </div>
  )
}