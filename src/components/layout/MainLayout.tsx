import { Outlet } from 'react-router-dom'
import { AppSidebar } from "./AppSidebar"
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Footer } from './Footer'

export function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <MobileNav />
        <main className="flex-1 p-6 pt-4 md:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}