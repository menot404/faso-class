import { useState, useEffect } from 'react'
import type { SchoolInfo, SystemConfig } from '@/features/settings/types'
import { useTranslation } from '@/hooks/useTranslation'
import { useTheme } from './useTheme'

const defaultSchool: SchoolInfo = {
  name: 'École FasoClass',
  address: 'Ouagadougou, Burkina Faso',
  phone: '+226 XX XX XX XX',
  email: 'contact@fasoclass.bf',
}

const defaultSystem: SystemConfig = {
  academicYear: '2025-2026',
  semester: 1,
  allowRegistration: true,
  allowGrading: true,
}

export const useSettings = () => {
  const { theme, setTheme } = useTheme()
  const { i18n } = useTranslation()
  const [school, setSchool] = useState<SchoolInfo>(() => {
    const stored = localStorage.getItem('faso-school')
    return stored ? JSON.parse(stored) : defaultSchool
  })
  const [system, setSystem] = useState<SystemConfig>(() => {
    const stored = localStorage.getItem('faso-system')
    return stored ? JSON.parse(stored) : defaultSystem
  })
  const [language, setLanguage] = useState<'fr' | 'en'>(
    () => (localStorage.getItem('faso-language') as 'fr' | 'en') || 'fr'
  )
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('faso-notifications')
    return stored ? JSON.parse(stored) : true
  })

  useEffect(() => {
    localStorage.setItem('faso-school', JSON.stringify(school))
  }, [school])

  useEffect(() => {
    localStorage.setItem('faso-system', JSON.stringify(system))
  }, [system])

  useEffect(() => {
    localStorage.setItem('faso-language', language)
    i18n.changeLanguage(language)
  }, [language, i18n])

  useEffect(() => {
    localStorage.setItem('faso-notifications', JSON.stringify(notifications))
  }, [notifications])

  const updateSchool = (data: Partial<SchoolInfo>) => {
    setSchool(prev => ({ ...prev, ...data }))
  }

  const updateSystem = (data: Partial<SystemConfig>) => {
    setSystem(prev => ({ ...prev, ...data }))
  }

  return {
    school,
    system,
    language,
    notifications,
    theme,
    setTheme,
    setLanguage,
    setNotifications,
    updateSchool,
    updateSystem,
  }
}