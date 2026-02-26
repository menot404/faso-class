export interface SchoolInfo {
  name: string
  address: string
  phone: string
  email: string
  website?: string
  logo?: string
}

export interface UserSettings {
  language: 'fr' | 'en'
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
}

export interface SystemConfig {
  academicYear: string
  semester: number
  allowRegistration: boolean
  allowGrading: boolean
}