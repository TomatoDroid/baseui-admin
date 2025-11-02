import { cn } from '@/lib/utils'
import React from 'react'

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
  fluid?: boolean
}
export function Main({ fixed, className, fluid, ...props }: MainProps) {
  return (
    <main
      className={cn(
        'px-4 py-6',
        fixed && 'flex grow flex-col',
        !fluid && '@7xl/content:mx-auto',
        className,
      )}
      {...props}
    />
  )
}
