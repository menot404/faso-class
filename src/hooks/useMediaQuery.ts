import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Fonction pour mettre à jour l'état
    const updateMatches = () => {
      setMatches(media.matches)
    }
    
    // Mettre à jour l'état initial
    updateMatches()
    
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    media.addEventListener('change', listener)
    
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}