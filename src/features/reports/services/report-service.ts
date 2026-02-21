import type { Report, ReportTemplate, ReportFilters, ReportFormat } from '@/types/report'
import { getStudents } from '@/services/api/students'
import { fetchGrades } from '@/features/grades/services/grade-service'
import { fetchClasses } from '@/features/classes/services/class-service'
import { generateCSVBlob } from '@/utils/csv-utils'
import { generatePDF } from '@/utils/pdf-utils'

// Templates prédéfinis
const defaultTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Liste des étudiants',
    description: 'Export de tous les étudiants avec leurs informations',
    type: 'students',
    format: 'pdf',
    columns: ['id', 'firstName', 'lastName', 'email', 'class'],
  },
  {
    id: '2',
    name: 'Relevé de notes',
    description: 'Notes des étudiants par classe',
    type: 'grades',
    format: 'pdf',
    columns: ['studentName', 'className', 'subject', 'value', 'coefficient'],
  },
]

const STORAGE_KEY = 'faso-reports'
const defaultReports: Report[] = []

const initializeReports = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReports))
}
initializeReports()

export const fetchReports = async (filters?: ReportFilters): Promise<Report[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const stored = localStorage.getItem(STORAGE_KEY)
  let reports: Report[] = stored ? JSON.parse(stored) : defaultReports
  // filtre simplifié non implémenté
  return reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const fetchTemplates = async (): Promise<ReportTemplate[]> => {
  return defaultTemplates
}

export const generateReport = async (
  templateId: string,
  format: ReportFormat,
  _customFilters?: any
): Promise<Report> => {
  const templates = await fetchTemplates()
  const template = templates.find(t => t.id === templateId)
  if (!template) throw new Error('Template non trouvé')

  // Récupérer les données selon le type
  let data: any[] = []
  if (template.type === 'students') {
    const studentsRes = await getStudents({ page: 1, limit: 1000 })
    data = studentsRes.users
  } else if (template.type === 'grades') {
    const grades = await fetchGrades()
    data = grades.map(g => ({
      ...g,
      studentName: `Élève ${g.studentId}`,
      className: `Classe ${g.classId}`,
    }))
  } else if (template.type === 'classes') {
    data = await fetchClasses()
  }

  let url = ''

  if (format === 'pdf') {
    url = await generatePDF(data, template.columns, template.name)
  } else {
    // format CSV
    const columns = template.columns.map(col => ({ key: col, label: col }))
    url = generateCSVBlob(data, columns)
  }

  const newReport: Report = {
    id: Math.random().toString(36).substring(2, 9),
    name: template.name,
    templateId,
    format,
    createdAt: new Date().toISOString(),
    createdBy: 'admin',
    url,
  }

  const reports = await fetchReports()
  reports.push(newReport)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))

  return newReport
}