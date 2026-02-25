import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from './providers/QueryProvider.tsx'
import { ThemeProvider } from './contexts/theme/ThemeProvider.tsx'
import { AuthProvider } from './contexts/auth/AuthProvider.tsx'
import { I18nProvider } from './providers/I18nProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="system" storageKey="faso-theme">
        <I18nProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
