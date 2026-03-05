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
        const students = results.data as any[]
        // Validation simple
        const validStudents = students.filter(s => s.firstName && s.lastName && s.email)
        
        if (validStudents.length === 0) {
          setError(t('import.noValidData', 'Aucune donnée valide trouvée'))
          setImporting(false)
          return
        }

        // Importer chaque étudiant
        Promise.all(validStudents.map(s => createStudent.mutateAsync(s)))
          .then(() => {
            setImporting(false)
            onSuccess?.()
            onClose()
          })
          .catch(err => {
            setError(err.message)
            setImporting(false)
          })
      },
      error: (err: any) => {
        setError(err.message)
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