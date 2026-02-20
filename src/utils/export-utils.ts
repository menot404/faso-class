import { exportToCSV } from './csv-utils'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Grade } from '@/types/grade'

/**
 * Exporte une liste de notes au format CSV
 */
export function exportGradesToCSV(grades: Grade[], filename: string = 'notes') {
  const data = grades.map((g) => ({
    ID: g.id,
    'Étudiant ID': g.studentId,
    'Classe ID': g.classId,
    Matière: g.subject,
    Note: g.value,
    Coefficient: g.coefficient,
    Date: new Date(g.date).toLocaleDateString('fr-FR'),
    Semestre: g.semester,
    'Année scolaire': g.academicYear,
  }))

  const columns = [
    { key: 'ID', label: 'ID' },
    { key: 'Étudiant ID', label: 'Étudiant ID' },
    { key: 'Classe ID', label: 'Classe ID' },
    { key: 'Matière', label: 'Matière' },
    { key: 'Note', label: 'Note' },
    { key: 'Coefficient', label: 'Coefficient' },
    { key: 'Date', label: 'Date' },
    { key: 'Semestre', label: 'Semestre' },
    { key: 'Année scolaire', label: 'Année scolaire' },
  ]

  exportToCSV(data, filename, columns)
}

/**
 * Exporte une liste de notes au format PDF
 */
export function exportGradesToPDF(grades: Grade[], title: string = 'Liste des notes') {
  const doc = new jsPDF()
  doc.text(title, 14, 10)

  const tableColumn = [
    'ID',
    'Étudiant ID',
    'Classe ID',
    'Matière',
    'Note',
    'Coeff.',
    'Date',
    'Semestre',
    'Année',
  ]
  const tableRows = grades.map((g) => [
    g.id,
    g.studentId.toString(),
    g.classId,
    g.subject,
    g.value.toString(),
    g.coefficient.toString(),
    new Date(g.date).toLocaleDateString('fr-FR'),
    g.semester.toString(),
    g.academicYear,
  ])

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  })

  doc.save('notes.pdf')
}