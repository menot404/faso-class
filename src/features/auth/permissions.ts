import type { UserRole } from '@/types/user'

export type Permission = 'view:students' | 'create:student' | 'edit:student' | 'delete:student'
  | 'view:classes' | 'create:class' | 'edit:class' | 'delete:class'
  | 'view:grades' | 'create:grade' | 'edit:grade' | 'delete:grade' | 'view:grades' | 'create:grade' | 'edit:grade' | 'delete:grade'
  | 'view:reports' | 'create:report'
  | 'view:dashboard' | 'export:data'

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'view:students', 'create:student', 'edit:student', 'delete:student',
    'view:classes', 'create:class', 'edit:class', 'delete:class',
    'view:grades', 'create:grade', 'edit:grade', 'delete:grade',
    'view:dashboard', 'export:data',
    'view:grades', 'create:grade', 'edit:grade', 'delete:grade',
  'view:reports', 'create:report',
  ],
  teacher: [
    'view:students', 'create:student', 'edit:student',
    'view:classes', 'edit:class',
    'view:grades', 'create:grade', 'edit:grade',
    'view:dashboard', 'export:data',
    'view:grades', 'create:grade', 'edit:grade',
  'view:reports', 'create:report',
  ],
  student: [
    'view:students', 'view:classes', 'view:grades', 'view:dashboard',
     'view:grades', 'view:reports',
  ],
}

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return rolePermissions[role]?.includes(permission) ?? false
}