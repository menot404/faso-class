import { useTranslation } from "@/hooks/useTranslation"

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} FasoClass Pro – {t('app.description')}
    </footer>
  )
}