import { SidebarContent } from './SidebarContent'

export function AppSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex">
      <SidebarContent />
    </aside>
  )
}