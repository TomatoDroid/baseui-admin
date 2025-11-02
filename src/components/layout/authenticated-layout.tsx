import { Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { cn } from '@/lib/utils'

export function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
