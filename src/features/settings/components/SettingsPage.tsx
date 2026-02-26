import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SchoolSettings } from './SchoolSettings'
import { UserManagement } from './UserManagement'
import { SystemConfig } from './SystemConfig'
import { PageContainer } from '@/components/shared/PageContainer'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">{t('Paramètres')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('Configuration de l\'application')}</CardTitle>
          <CardDescription>
            {t('Gérez les paramètres généraux de FasoClass Pro.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="school" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="school">{t('École')}</TabsTrigger>
              <TabsTrigger value="users">{t('Utilisateurs')}</TabsTrigger>
              <TabsTrigger value="system">{t('Système')}</TabsTrigger>
            </TabsList>
            <TabsContent value="school">
              <SchoolSettings />
            </TabsContent>
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
            <TabsContent value="system">
              <SystemConfig />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageContainer>
  )
}