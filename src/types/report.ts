export type ReportFormat = 'pdf' | 'csv'

export interface ReportTemplate {
  id: string
  name: string
  description: string
  type: 'students' | 'grades' | 'classes' | 'attendance'
  format: ReportFormat
  columns: string[]
  filters?: Record<string, unknown>
}

export interface Report {
  id: string
  name: string
  templateId?: string
  format: ReportFormat
  createdAt: string
  createdBy: string
  url?: string // lien de téléchargement
  size?: number
}

export interface ReportFilters {
  dateFrom?: string
  dateTo?: string
  type?: string
}