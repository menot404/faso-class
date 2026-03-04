import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from './useTranslation'

export function useNetworkStatus() {
  const { t } = useTranslation()
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success(t('Connexion rétablie'), { duration: 3000 })
    }
    const handleOffline = () => {
      setIsOnline(false)
      toast.error(t('Connexion perdue. Vérifiez votre réseau.'), { duration: Infinity })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [t])

  return isOnline
}