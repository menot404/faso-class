import { useState } from 'react'
import { PageContainer } from '@/components/shared/PageContainer'
import { ClassCard } from './ClassCard'
import { ClassForm } from './ClassForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useClasses } from '../hooks/useClasses'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { EmptyState } from '@/components/shared/EmptyState'
import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'

const ClassesPage = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const { data: classes, isLoading } = useClasses({
    search: debouncedSearch,
  })

  return (
    <PageContainer>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">{t('Gestion des classes')}</h1>
        <div className="flex gap-2">
          <Input
            placeholder={t('Rechercher une classe...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Nouvelle classe')}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : !classes?.length ? (
        <EmptyState
          icon={<GraduationCap className="h-12 w-12" />}
          title={t('Aucune classe')}
          description={t('Commencez par créer votre première classe.')}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      )}

      <ClassForm open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </PageContainer>
  )
}

export default ClassesPage;