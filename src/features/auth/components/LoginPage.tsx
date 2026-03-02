import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useTranslation } from '@/hooks/useTranslation'
import { User, Lock, Loader2, Eye, EyeOff, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LoginPage() {
  const { t } = useTranslation()
  const { login, user, isLoading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  if (user) return <Navigate to="/" replace />

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {}
    if (!username.trim()) newErrors.username = t("Nom d'utilisateur requis")
    if (!password) newErrors.password = t('Mot de passe requis')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      await login(username, password)
      toast.success(t('Connexion réussie'))
    } catch {
      toast.error(t('Identifiants incorrects'))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md shadow-lg animate-in fade-in zoom-95 duration-300">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">FasoClass Pro</CardTitle>
          <CardDescription>
            {t('Connectez-vous à votre espace')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                {t("Nom d'utilisateur")}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }))
                  }}
                  className={cn(
                    'pl-10',
                    errors.username && 'border-destructive focus-visible:ring-destructive'
                  )}
                  placeholder="ex: kminchelle"
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {t('Mot de passe')}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  className={cn(
                    'pl-10 pr-10',
                    errors.password && 'border-destructive focus-visible:ring-destructive'
                  )}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-muted-foreground">
                  {t('Se souvenir de moi')}
                </Label>
              </div>
              <Link to="/forgot-password" className="text-primary hover:underline">
                {t('Mot de passe oublié ?')}
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('Connexion...')}
                </>
              ) : (
                t('Se connecter')
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('Pas encore de compte ?')}</span>{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              {t('Créer un compte')}
            </Link>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            {t('En continuant, vous acceptez nos')}{' '}
            <Link to="/terms" className="underline hover:text-primary">
              {t('conditions générales')}
            </Link>{' '}
            {t('et notre')}{' '}
            <Link to="/privacy" className="underline hover:text-primary">
              {t('politique de confidentialité')}
            </Link>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  )
}