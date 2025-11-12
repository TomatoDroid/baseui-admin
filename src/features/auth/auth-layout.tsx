import { Logo } from '@/assets/logo'
import { PropsWithChildren } from 'react'

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="container grid h-svh max-w-none items-center justify-center">
      <div className="mx-auto flex flex-col justify-center space-y-2 sm:w-[480px] sm:p-8">
        <div className='flex items-center justify-center mb-4'>
          <Logo className='me-2'/>
          <h1 className="text-xl font-medium">Shadcn Admin</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
