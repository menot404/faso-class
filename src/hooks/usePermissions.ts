import { useAuth } from './useAuth'
import { hasPermission } from '@/features/auth/permissions'
import type { Permission } from '@/features/auth/permissions'

export const usePermissions = () => {
  const { user } = useAuth()
  const role = user?.role ?? 'student'

  const can = (permission: Permission) => hasPermission(role, permission)

  // Raccourcis pratiques
  const canEdit = can('edit:student')
  const canDelete = can('delete:student')
  const canCreateClass = can('create:class')
  const canExport = can('export:data')

  return { can, canEdit, canDelete, canCreateClass, canExport }
}