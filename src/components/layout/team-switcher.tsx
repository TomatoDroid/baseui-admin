import { ChevronsUpDown, Plus } from 'lucide-react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../base/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'
import { Team } from './types'

type TeamSwitcherProps = {
  teams: Team[]
}
export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = useState(teams[0])
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size={'lg'}
                className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <activeTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
                <ChevronsUpDown className="ms-auto" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuPositioner
            align="start"
            sideOffset={4}
            side={isMobile ? 'bottom' : 'right'}
            className={'z-10'}
          >
            <DropdownMenuContent className="min-w-56 rounded-lg">
              <DropdownMenuGroup>
                <DropdownMenuLabel className={'text-xs text-muted-foreground'}>
                  Teams
                </DropdownMenuLabel>
                {teams.map((team, index) => (
                  <DropdownMenuItem key={team.name} className={'gap-2 p-2'}>
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="bg-background flex size-6  items-center justify-center rounded-md border">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add Item
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
