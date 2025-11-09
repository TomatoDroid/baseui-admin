import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Separator } from '../base/separator'
import { SidebarTrigger } from '../ui/sidebar'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}
export default function Header({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }
    // 将 passive 设为 true 可以启用性能优化，并可大幅改善应用性能
    document.addEventListener('scroll', onScroll, { passive: true })

    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'h-16 z-20',
        fixed && 'sticky top-0 w-[inherit]',
        offset > 10 && fixed ? 'shadow' : 'shadow-none',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex h-full items-center gap-3 p-4 sm:gap-4',
          offset > 10 &&
            fixed &&
            'after:bg-background/20 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg',
        )}
      >
        <SidebarTrigger variant={'outline'} className="max-md:scale-125" />
        <Separator className={'h-6'} orientation="vertical" />
        {children}
      </div>
    </header>
  )
}
