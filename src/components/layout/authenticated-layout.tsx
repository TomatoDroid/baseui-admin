import { SearchProvider } from '@/context/search-provider'
import { cn } from '@/lib/utils'
import { Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'

export function AuthenticatedLayout() {
  return (
    <SearchProvider>
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
    </SearchProvider>
  )
}
