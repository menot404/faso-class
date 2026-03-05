import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, Upload, Trash2 } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { exportStudentsToCSV } from '@/utils/csv-utils'
import { exportStudentsToPDF } from '@/utils/pdf-utils'
import type { Student } from '@/types/student'

interface StudentActionsProps {
  students: Student[] // Liste complète (si on veut exporter tous)
  selectedIds?: number[] // IDs sélectionnés
  onImport?: () => void
  onDeleteSelected?: () => void
}

export function StudentActions({ students, selectedIds = [], onImport, onDeleteSelected }: StudentActionsProps) {
  const { t } = useTranslation('students')

  const handleExportCSV = () => {
    // Si des étudiants sont sélectionnés, exporter uniquement ceux-là, sinon tous
    const studentsToExport = selectedIds.length > 0
      ? students.filter(s => selectedIds.includes(s.id))
      : students
    exportStudentsToCSV(studentsToExport, 'etudiants')
  }

  const handleExportPDF = () => {
    const studentsToExport = selectedIds.length > 0
      ? students.filter(s => selectedIds.includes(s.id))
      : students
    exportStudentsToPDF(studentsToExport, 'Liste des étudiants')
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onImport}>
        <Upload className="mr-2 h-4 w-4" />
        {t('actions.import', 'Importer')}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {t('actions.export', 'Exporter')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleExportCSV}>
            {t('export.csv', 'CSV')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportPDF}>
            {t('export.pdf', 'PDF')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedIds.length > 0 && (
        <Button variant="destructive" size="sm" onClick={onDeleteSelected}>
          <Trash2 className="mr-2 h-4 w-4" />
          {t('actions.deleteSelected', 'Supprimer ({{count}})', { count: selectedIds.length })}
        </Button>
      )}
    </div>
  )
}