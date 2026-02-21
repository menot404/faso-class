import { exportToCSV } from './csv-utils'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Grade } from '@/types/grade'

// Définir le type des données pour l'export CSV
type GradeExportData = {
  id: string
  studentId: number
  classId: string
  subject: string
  value: number
  coefficient: number
  date: string
  semester: number
  academicYear: string
}

export function exportGradesToCSV(grades: Grade[], filename: string = 'notes') {
  // Typer explicitement les données
  const data: GradeExportData[] = grades.map(g => ({
    id: g.id,
    studentId: g.studentId,
    classId: g.classId,
    subject: g.subject,
    value: g.value,
    coefficient: g.coefficient,
    date: g.date,
    semester: g.semester,
    academicYear: g.academicYear,
  }))

  // Typer les colonnes avec keyof GradeExportData
  const columns: { key: keyof GradeExportData; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'studentId', label: 'Étudiant ID' },
    { key: 'classId', label: 'Classe ID' },
    { key: 'subject', label: 'Matière' },
    { key: 'value', label: 'Note' },
    { key: 'coefficient', label: 'Coefficient' },
    { key: 'date', label: 'Date' },
    { key: 'semester', label: 'Semestre' },
    { key: 'academicYear', label: 'Année scolaire' },
  ]

  exportToCSV(data, filename, columns)
}

export function exportGradesToPDF(grades: Grade[], title: string = 'Liste des notes') {
  const doc = new jsPDF()
  doc.text(title, 14, 10)

  const tableColumn = ['ID', 'Étudiant', 'Classe', 'Matière', 'Note', 'Coeff.', 'Date']
  const tableRows = grades.map(g => [
    g.id,
    g.studentId.toString(),
    g.classId,
    g.subject,
    g.value.toString(),
    g.coefficient.toString(),
    new Date(g.date).toLocaleDateString('fr-FR'),
  ])

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  })

  doc.save('notes.pdf')
}