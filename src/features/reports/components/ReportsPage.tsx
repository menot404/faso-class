import { useState } from 'react'
import { PageContainer } from '@/components/shared/PageContainer'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useReports } from '../hooks/useReports'
import { ReportBuilder } from './ReportBuilder'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Download } from 'lucide-react'

export default function ReportsPage() {
  const { t, i18n } = useTranslation()
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const { data: reports, isLoading } = useReports()

  const dateLocale = i18n.language === 'fr' ? fr : undefined

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('Rapports')}</h1>
        <Button onClick={() => setIsBuilderOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('Nouveau rapport')}
        </Button>
      </div>

      <div className="space-y-4">
        {!isLoading && reports?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">{t('Aucun rapport généré')}</p>
            </CardContent>
          </Card>
        ) : (
          reports?.map((report) => (
            <Card key={report.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{report.name}</CardTitle>
                    <CardDescription>
                      {format(new Date(report.createdAt), 'Pp', { locale: dateLocale })}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{report.format.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t('Taille')} : {report.size ? `${(report.size / 1024).toFixed(1)} KB` : '-'}
                </span>
                {report.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={report.url} download>
                      <Download className="mr-2 h-4 w-4" />
                      {t('Télécharger')}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <ReportBuilder open={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />
    </PageContainer>
  )
}