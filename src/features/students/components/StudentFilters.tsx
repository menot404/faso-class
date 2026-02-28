import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

export function StudentFilters() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    // Ici on pourrait mettre à jour le store de filtres (Zustand, Context, ou query params)
    // Pour l'exemple, on utilise un événement custom ou on modifie l'URL
    // On va stocker dans localStorage pour simplifier
    localStorage.setItem('students-search', debouncedSearch)
    // Déclencher un rechargement du tableau (via un event)
    window.dispatchEvent(new Event('students-filters-change'))
  }, [debouncedSearch])

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('Rechercher un étudiant...')}
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  )
}