import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Met à jour l'état pour afficher le fallback
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log l'erreur (vous pouvez envoyer à un service comme Sentry)
    console.error('Erreur capturée:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Fallback par défaut si non fourni
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="flex min-h-100 flex-col items-center justify-center gap-4 p-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold">Quelque chose s'est mal passé</h2>
          <p className="text-muted-foreground text-center max-w-md">
            {this.state.error?.message || "Une erreur inattendue s'est produite."}
          </p>
          <Button onClick={() => window.location.reload()}>Recharger la page</Button>
        </div>
      )
    }

    return this.props.children
  }
}