import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/students', label: 'Étudiants', icon: Users },
  { to: '/classes', label: 'Classes', icon: GraduationCap },
  { to: '/grades', label: 'Notes', icon: BookOpen },
  { to: '/reports', label: 'Rapports', icon: FileText },
  { to: '/settings', label: 'Paramètres', icon: Settings },
]

export function AppSidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const { logout } = useAuth()

  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">FasoClass Pro</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4" />
              {t(item.label)}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          {t('Déconnexion')}
        </Button>
      </div>
    </aside>
  )
}