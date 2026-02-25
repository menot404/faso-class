import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { AnimatedPage } from '@/components/shared/AnimatedPage'
// Wrapper pour Suspense + AnimatedPage
const withAnimation = <P extends object>(Component: React.ComponentType<P>) => (props: P) => (
  <Suspense fallback={<LoadingSpinner />}>
    <AnimatedPage>
      <Component {...props} />
    </AnimatedPage>
  </Suspense>
)

const DashboardPage = withAnimation(lazy(() => import('@/features/dashboard/components/DashboardPage')))
const StudentsPage = withAnimation(lazy(() => import('@/features/students/components/StudentsPage')))
const ClassesPage = withAnimation(lazy(() => import('@/features/classes/components/ClassesPage')))
const GradesPage = withAnimation(lazy(() => import('@/features/grades/components/GradesPage')))
const ReportsPage = withAnimation(lazy(() => import('@/features/reports/components/ReportsPage')))
//const SettingsPage = withAnimation(lazy(() => import('@/features/settings/components/settings-page')))
const AttendancePage = withAnimation(lazy(() => import('@/features/attendance/components/AttendancePage')))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'students', element: <StudentsPage /> },
          { path: 'classes', element: <ClassesPage /> },
          { path: 'grades', element: <GradesPage /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: 'attendance', element: <AttendancePage /> },
         // { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
])