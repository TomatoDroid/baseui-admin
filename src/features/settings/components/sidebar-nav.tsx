import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

type SidebarNavItem = React.HTMLAttributes<HTMLElement> & {
  items: {
    title: string
    href: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ items, className, ...props }: SidebarNavItem) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [val, setVal] = useState(pathname ?? '/settings')

  const handleChange = (value: string) => {
    setVal(value)
    navigate({ to: value })
  }
  return (
    <>
      <div className="p-1 md:hidden">
        <Select value={val} onValueChange={handleChange}>
          <SelectTrigger className="h-12 sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex items-center gap-4">
                  <span className="scale-125">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="bg-background hidden md:block w-full min-w-40 px-1 py-2">
        <nav
          className={cn(
            'flex lg:flex-col lg:space-y-1 lg:space-x-0 space-x-2 py-1',
            className,
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              to={item.href}
              key={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href
                  ? 'bg-muted hover:bg-accent'
                  : 'hover:bg-accent hover:underline',
                'justify-start',
              )}
            >
              <span className="me-2">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </>
  )
}
