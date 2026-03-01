import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface StudentFiltersProps {
  value: string
  onChange: (value: string) => void
}

export function StudentFilters({ value, onChange }: StudentFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('Rechercher un étudiant...')}
          className="pl-8"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}