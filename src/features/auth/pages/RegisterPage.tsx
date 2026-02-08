import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuth } from '@/hooks/useAuth'
import { RegisterForm } from '../components/RegisterForm'
import type { RegisterFormData } from '../schemas/auth.schema'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

export function RegisterPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { register: registerAuth } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError('')

    try {
      await registerAuth(data)
      
      toast.success(t('auth:register.success'), {
        description: t('auth:register.welcome'),
      })

      navigate('/dashboard', { replace: true })
    } catch (err: unknown) {
      const errorMessage =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
          ? (err as { message: string }).message
          : t('auth:register.error')
      setError(errorMessage)
      
      toast.error(t('auth:register.error'), {
        description: errorMessage,
      })
      
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {t('app:name')}
          </h1>
          <p className="text-muted-foreground">
            {t('app:description')} • {t('auth:register.tagline')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error}
          />

          <Card className="p-8 border-primary/20 bg-primary/5">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {t('auth:register.benefits.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('auth:register.benefits.description')}
                </p>
              </div>

              <div className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {t(`auth:register.benefits.features.${index}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`auth:register.benefits.features.${index}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {t('auth:register.contactSupport')}{' '}
                  <a href="mailto:support@fasoclass.com" className="text-primary hover:underline">
                    support@fasoclass.com
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FasoClass Pro. {t('auth:register.allRights')}</p>
          <p className="mt-1">
            {t('auth:register.supportedBy')}{' '}
            <span className="font-semibold">Ministère de l'Éducation Burkina Faso</span>
          </p>
        </div>
      </div>
    </div>
  )
}