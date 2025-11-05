import { cn } from '@/lib/utils'
import { Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'

export function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset
        className={cn(
          "@container/content"
        )}
      >
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
