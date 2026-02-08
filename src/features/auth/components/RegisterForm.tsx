import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, School, User, Mail, Lock, Phone } from 'lucide-react'
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema'

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>
  isLoading?: boolean
  error?: string
}

export function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps) {
  const { t } = useTranslation()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'teacher' as 'admin' | 'teacher' | 'parent',
    },
  })

  const watchPassword = watch('password')

  const handleFormSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await onSubmit(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {t('auth:register.title')}
        </CardTitle>
        <CardDescription className="text-center">
          {t('auth:register.description')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Informations personnelles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('auth:fields.firstName')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  placeholder={t('auth:placeholders.firstName')}
                  className="pl-10"
                  {...register('firstName')}
                  disabled={isLoading}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-destructive">{t(errors.firstName.message as string)}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('auth:fields.lastName')}</Label>
              <Input
                id="lastName"
                placeholder={t('auth:placeholders.lastName')}
                {...register('lastName')}
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{t(errors.lastName.message as string)}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth:fields.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={t('auth:placeholders.email')}
                className="pl-10"
                {...register('email')}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{t(errors.email.message as string)}</p>
            )}
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{t('auth:fields.phone')}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder={t('auth:placeholders.phone')}
                className="pl-10"
                {...register('phone')}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Nom de l'école */}
          <div className="space-y-2">
            <Label htmlFor="schoolName">{t('auth:fields.schoolName')}</Label>
            <div className="relative">
              <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="schoolName"
                placeholder={t('auth:placeholders.schoolName')}
                className="pl-10"
                {...register('schoolName')}
                disabled={isLoading}
              />
            </div>
            {errors.schoolName && (
              <p className="text-sm text-destructive">{t(errors.schoolName.message as string)}</p>
            )}
          </div>

          {/* Rôle */}
          <div className="space-y-2">
            <Label htmlFor="role">{t('auth:fields.role')}</Label>
            <Select
              onValueChange={(value) => setValue('role', value as 'admin' | 'teacher' | 'parent')}
              defaultValue="teacher"
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('auth:placeholders.role')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">{t('auth:roles.teacher')}</SelectItem>
                <SelectItem value="admin">{t('auth:roles.admin')}</SelectItem>
                <SelectItem value="parent">{t('auth:roles.parent')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mot de passe */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth:fields.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth:placeholders.password')}
                  className="pl-10"
                  {...register('password')}
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{t(errors.password.message as string)}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t('auth:fields.confirmPassword')}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t('auth:placeholders.confirmPassword')}
                {...register('confirmPassword')}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {t(errors.confirmPassword.message as string)}
                </p>
              )}
            </div>
          </div>

          {/* Force du mot de passe */}
          {watchPassword && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t('auth:passwordStrength')}
                </span>
                <span className={`text-sm font-medium ${
                  watchPassword.length >= 8 ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {watchPassword.length >= 8 ? 'Fort' : 'Moyen'}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    watchPassword.length >= 8 ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (watchPassword.length / 8) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('common:loading')}
              </>
            ) : (
              t('auth:register.submit')
            )}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          {t('auth:register.agreement')}
          <a href="/terms" className="underline underline-offset-4 hover:text-primary">
            {t('auth:register.terms')}
          </a>{' '}
          {t('common:and')}{' '}
          <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
            {t('auth:register.privacy')}
          </a>
        </div>
        
        <div className="text-center text-sm">
          {t('auth:register.haveAccount')}{' '}
          <a href="/login" className="font-medium text-primary hover:underline">
            {t('auth:register.loginLink')}
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}