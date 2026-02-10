export interface ApiError {
  message: string
  code?: string
  statusCode: number
  timestamp: string
  errors?: Record<string, string[]>
}

export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
  timestamp: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface ApiParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  [key: string]:  string | number | boolean | undefined
}

export interface KpiCard {
  title: string
  value: number | string
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: string
  color: string
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }>
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  activeStudents: number
  attendanceRate: number
  averageGrade: number
  recentEnrollments: number
}

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface TabItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
}

export interface FilterOption {
  id: string
  label: string
  value: string
  type: 'checkbox' | 'radio' | 'select' | 'date'
  options?: SelectOption[]
}

export interface ExportOptions {
  format: 'csv' | 'pdf' | 'excel'
  includeHeaders: boolean
  fileName: string
  fields?: string[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  action?: {
    label: string
    url: string
  }
}

export interface ActivityLog {
  id: string
  action: string
  userId: string
  userName: string
  userRole: string
  targetId?: string
  targetType?: string
  ipAddress?: string
  userAgent?: string
  timestamp: string
  details?: Record<string, unknown>
}

export interface SystemConfig {
  schoolName: string
  schoolLogo?: string
  academicYear: string
  timezone: string
  dateFormat: string
  language: string
  enableNotifications: boolean
  enableAutoBackup: boolean
  maxFileSize: number
  allowedFileTypes: string[]
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface UploadResponse {
  url: string
  fileName: string
  fileSize: number
  mimeType: string
  uploadedAt: string
}

export interface SearchResult<T> {
  items: T[]
  total: number
  query: string
  time: number
}

export interface CacheConfig {
  enabled: boolean
  ttl: number // Time to live in seconds
  key: string
}

export interface RateLimitConfig {
  enabled: boolean
  maxRequests: number
  windowMs: number
}

export interface ApiConfig {
  baseURL: string
  timeout: number
  headers: Record<string, string>
  withCredentials: boolean
}

export interface PaginationOptions {
  page: number
  limit: number
  sortField?: string
  sortDirection?: 'asc' | 'desc'
}

export interface BulkOperationResult {
  success: number
  failed: number
  errors: Array<{
    item: unknown
    error: string
  }>
}

export interface ImportResult {
  total: number
  imported: number
  skipped: number
  errors: Array<{
    row: number
    errors: ValidationError[]
  }>
}

export interface SyncResult {
  synced: number
  created: number
  updated: number
  deleted: number
  errors: string[]
}

export interface BackupResult {
  id: string
  fileName: string
  fileSize: number
  createdAt: string
  status: 'success' | 'failed' | 'in_progress'
  error?: string
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  services: Array<{
    name: string
    status: 'up' | 'down'
    responseTime: number
    error?: string
  }>
  metrics: {
    memoryUsage: number
    cpuUsage: number
    diskUsage: number
    activeConnections: number
  }
}