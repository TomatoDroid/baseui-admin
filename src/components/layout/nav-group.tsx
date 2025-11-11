import { Link, useLocation } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '../ui/sidebar'
import {
  NavCollapsible,
  NavGroup as NavGroupProps,
  NavItem,
  NavLink,
} from './types'

export function NavGroup({ title, items }: NavGroupProps) {
  const { isMobile, state } = useSidebar()
  const href = useLocation({ select: (location) => location.href })
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`
          if (!item.items) {
            return <SidebarMenuLink key={key} item={item} href={href} />
          }
          if (state === 'collapsed' && !isMobile) {
            return (
              <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
            )
          }
          return <SidebarMenuCollapsible key={key} item={item} href={href} />
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function SidebarMenuLink({ item, href }: { item: NavLink; href: string }) {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.title}
        isActive={checkIsActive(href, item)}
        render={
          <Link to={item.url} onClick={() => setOpenMobile(false)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
          </Link>
        }
      ></SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarMenuCollapsible({
  item,
  href,
}: {
  item: NavCollapsible
  href: string
}) {
  return (
    <Collapsible>
      <SidebarMenuItem>
        <CollapsibleTrigger
          render={
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              {item.badge && <NavBadge>{item.badge}</NavBadge>}
              <ChevronRight className="h-4 w-4" />
            </SidebarMenuButton>
          }
        ></CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuButton isActive={checkIsActive(href, subItem)}>
                  <Link to={subItem.url}>
                    {subItem.icon && <subItem.icon />}
                    <span>{subItem.title}</span>
                    {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function SidebarMenuCollapsedDropdown({
  item,
  href,
}: {
  item: NavCollapsible
  href: string
}) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuButton
              tooltip={item.title}
              isActive={checkIsActive(href, item)}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              {item.badge && <NavBadge>{item.badge}</NavBadge>}
              <ChevronRight className="" />
            </SidebarMenuButton>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuPositioner side="right" align="start">
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                {item.title} {item.badge ? `(${item.badge})` : ''}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {item.items.map((sub) => (
                <DropdownMenuItem
                  key={`${sub.title}-${sub.url}`}
                  render={
                    <Link
                      to={sub.url}
                      className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}
                    >
                      {sub.icon && <sub.icon />}
                      <span className="max-w-52 text-wrap">{sub.title}</span>
                      {sub.badge && (
                        <span className="ms-auto text-xs">{sub.badge}</span>
                      )}
                    </Link>
                  }
                />
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPositioner>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function NavBadge({ children }: { children: React.ReactNode }) {
  return <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item.items?.filter((i) => i.url === href).length ||
    (mainNav &&
      href.split('/')[1] === '' &&
      href.split('/')[1] === item.url?.split('/')[1])
  )
}
