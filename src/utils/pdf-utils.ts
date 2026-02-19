import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Student } from '@/types/student'
import type { Class } from '@/types/class'

export const exportStudentsToPDF = (students: Student[], title: string = 'Liste des étudiants') => {
  const doc = new jsPDF()
  doc.text(title, 14, 10)
  
  const tableColumn = ['ID', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Classe']
  const tableRows = students.map((s) => [
    s.id,
    s.firstName,
    s.lastName,
    s.email,
    s.phone || '-',
    s.class || '-',
  ])

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  })

  doc.save('etudiants.pdf')
}

export const exportClassesToPDF = (classes: Class[], title: string = 'Liste des classes') => {
  const doc = new jsPDF()
  doc.text(title, 14, 10)

  const tableColumn = ['Nom', 'Niveau', 'Année', 'Effectif', 'Professeur']
  const tableRows = classes.map((c) => [
    c.name,
    c.level === 0 ? 'Terminale' : `${c.level}ème`,
    c.academicYear,
    c.studentIds?.length || 0,
    c.teacherId || '-',
  ])

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  })

  doc.save('classes.pdf')
}