import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useTranslation } from 'react-i18next'

// Données statiques pour l'exemple (pourrait être connecté à une API d'activités)
const activities = [
  {
    id: 1,
    user: 'Admin',
    action: 'a ajouté un étudiant',
    target: 'Jean Dupont',
    time: 'Il y a 5 minutes',
  },
  {
    id: 2,
    user: 'Mme. Koné',
    action: 'a modifié la classe',
    target: '6ème A',
    time: 'Il y a 1 heure',
  },
  {
    id: 3,
    user: 'M. Ouédraogo',
    action: 'a inscrit 3 élèves',
    target: '5ème B',
    time: 'Il y a 3 heures',
  },
]

export function RecentActivities() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Activités récentes')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{activity.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}