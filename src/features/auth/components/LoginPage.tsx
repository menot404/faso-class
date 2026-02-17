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
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function LoginPage() {
  const { t } = useTranslation()
  const { login, user, isLoading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(username, password)
      toast.success(t('Connexion réussie'))
    } catch {
      toast.error(t('Identifiants incorrects'))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>FasoClass Pro</CardTitle>
          <CardDescription>{t('Connectez-vous à votre espace')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("Nom d'utilisateur")}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="kminchelle"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('Mot de passe')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="0lelplR"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('Connexion...') : t('Se connecter')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}