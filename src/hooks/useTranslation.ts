// src/hooks/useTranslation.ts
import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslation(ns?: string | string[]) {
  const { t, i18n } = useI18nTranslation(ns);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const currentLanguage = i18n.language;

  return {
    t,
    i18n,
    changeLanguage,
    currentLanguage,
  };
}