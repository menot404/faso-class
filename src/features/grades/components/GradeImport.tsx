import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import * as Papa from 'papaparse'
import { useCreateGrade } from '../hooks/useGradeMutations'
import type { Grade } from '../types'

// Example implementation of parse function

export function GradeImport() {
  const { t } = useTranslation()
  const [isUploading, setIsUploading] = useState(false)
  const createGrade = useCreateGrade()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: {data: Partial<Grade>[]}) => {
        const grades = results.data
        // Validation basique
        const validGrades = grades.filter((g) => g.studentId && g.classId && g.subject && g.value)
        if (validGrades.length === 0) {
          toast.error(t('Aucune note valide trouvée'))
          setIsUploading(false)
          return
        }

        // Importer chaque note
        validGrades.forEach((grade) => {
          createGrade.mutate({
            studentId: Number(grade.studentId),
            classId: String(grade.classId),
            subject: String(grade.subject),
            value: Number(grade.value),
            coefficient: Number(grade.coefficient) || 1,
            date: grade.date || new Date().toISOString(),
            semester: Number(grade.semester) || 1,
            academicYear: grade.academicYear || '2025-2026',
          } as Grade);
        })

        toast.success(t(`${validGrades.length} notes importées`))
        setIsUploading(false)
      },
      error: (error: unknown) => {
        const errorMessage =
          typeof error === 'object' && error !== null && 'message' in error
            ? String((error as { message: unknown }).message)
            : t('Erreur inconnue')
        toast.error(`${t(`Erreur lors de l'import : ${errorMessage}`)}`)
        setIsUploading(false)
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Importer des notes')}</CardTitle>
        <CardDescription>
          {t('Téléversez un fichier CSV avec les colonnes : studentId, classId, subject, value, coefficient, date, semester, academicYear')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button variant="outline" disabled={isUploading} onClick={() => document.getElementById('csv-upload')?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? t('Import en cours...') : t('Choisir un fichier CSV')}
          </Button>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </CardContent>
    </Card>
  )
}