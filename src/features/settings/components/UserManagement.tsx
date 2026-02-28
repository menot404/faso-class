import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from '@/hooks/useTranslation'

export function UserManagement() {
  const { t } = useTranslation()
  // À compléter avec une vraie gestion des utilisateurs
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground">
          {t('Interface de gestion des utilisateurs à implémenter.')}
        </p>
      </CardContent>
    </Card>
  )
}