import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, AlertCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useCreateStudent } from '../hooks/useStudentMutations'
import * as Papa from 'papaparse'

interface ImportStudentsProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function ImportStudents({ open, onClose, onSuccess }: ImportStudentsProps) {
  const { t } = useTranslation('students')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)
  const createStudent = useCreateStudent()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    setFile(selected || null)
    setError(null)
  }

  const handleImport = () => {
    if (!file) return

    setImporting(true)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data
        // Filtrer les lignes valides (avec firstName, lastName, email)
        const validRows = rows.filter(row => row.firstName && row.lastName && row.email)
        
        if (validRows.length === 0) {
          setError(t('import.noValidData', 'Aucune donnée valide trouvée'))
          setImporting(false)
          return
        }

        // Transformer les lignes CSV en objets Student (adapter selon votre type)
        const studentsToCreate = validRows.map(row => ({
          firstName: row.firstName!,
          lastName: row.lastName!,
          email: row.email!,
          phone: row.phone || '',
          class: row.class || '',
          grade: row.grade || '',
          birthDate: row.birthDate || '',
          address: row.address || '',
          // Ajoutez d'autres champs selon votre modèle
        }))

        // Importer chaque étudiant
        Promise.all(studentsToCreate.map(studentData => createStudent.mutateAsync(studentData)))
          .then(() => {
            setImporting(false)
            onSuccess?.()
            onClose()
          })
          .catch((err: unknown) => {
            const message = err instanceof Error ? err.message : 'Erreur inconnue'
            setError(message)
            setImporting(false)
          })
      },
      error: (err: unknown) => {
        const message = err instanceof Error ? err.message : 'Erreur inconnue'
        setError(message)
        setImporting(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('import.title', 'Importer des étudiants')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('import.description', 'Téléchargez un fichier CSV avec les colonnes : firstName, lastName, email, phone, class, grade, birthDate, address')}
          </p>

          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => document.getElementById('csv-upload')?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              {t('import.chooseFile', 'Choisir un fichier')}
            </Button>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            {file && <span className="text-sm">{file.name}</span>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              {t('common:cancel', 'Annuler')}
            </Button>
            <Button onClick={handleImport} disabled={!file || importing}>
              {importing ? t('common:importing', 'Import...') : t('import.start', 'Importer')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}