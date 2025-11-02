import { Link } from '@tanstack/react-router'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../base/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../base/dropdown-menu'
import { SignOutDialog } from '../sign-out-dialog'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { User } from './types'

export function NavUser({ user }: { user: User }) {
  const [open, setOpen] = useState(true)
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                  size={'lg'}
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name}
                    ></AvatarImage>
                    <AvatarFallback className={"rounded-lg"}>LZ</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="size-4 ms-auto" />
                </SidebarMenuButton>
              }
            />
            <DropdownMenuPositioner side="right" align="end">
              <DropdownMenuContent className={"min-w-56 rounded-lg"}>
                <DropdownMenuGroup className={"p-0 font-normal"}>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                      <Avatar className={"rounded-lg size-8"}>
                        <AvatarImage
                          src={user.avatar}
                          alt={user.name}
                        ></AvatarImage>
                        <AvatarFallback>LZ</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-start text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={
                      <Link to="/">
                        <Sparkles />
                        Upgrade to Pro
                      </Link>
                    }
                  ></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={
                      <Link to="/">
                        <BadgeCheck />
                        Account
                      </Link>
                    }
                  />
                  <DropdownMenuItem
                    render={
                      <Link to="/">
                        <CreditCard />
                        Billing
                      </Link>
                    }
                  />
                  <DropdownMenuItem
                    render={
                      <Link to="/">
                        <Bell />
                        Notifications
                      </Link>
                    }
                  />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setOpen(false)}
                    variant="destructive"
                  >
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenuPositioner>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SignOutDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
