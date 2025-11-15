import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { useAppForm } from '@/components/form'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { sleep } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

type UserAuthFormProps = React.HTMLAttributes<HTMLFormElement> & {
  redirectTo?: string
}

const formSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === '' ? 'Please enter an email to sign in' : undefined,
  }),
  password: z
    .string()
    .min(1, 'Please enter a password to sign in')
    .min(7, 'Password must be at least 7 characters long'),
})

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      setIsLoading(true)
      toast.promise(sleep(2000), {
        loading: 'Signing in...',
        success: () => {
          setIsLoading(false)
          const mockUser = {
            accountNo: 'ACC9527',
            email: data.value.email,
            role: ['user'],
            exp: Date.now() + 1000 * 60 * 60 * 24,
          }
          auth.setUser(mockUser)
          auth.setAccessToken('mock-access-token')
          const targetPath = redirectTo ?? '/'
          navigate({ to: targetPath, replace: true })
          return `Welcome back, ${data.value.email}!`
        },
        error: 'Error',
      })
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      {...props}
    >
      <FieldGroup>
        <form.AppField
          name="email"
          children={(field) => (
            <field.Input label="Email" placeholder="name@example.com" />
          )}
        />

        <form.AppField
          name="password"
          children={(field) => (
            <div className="relative">
              <field.Password label="Password" placeholder="********" />
              <Link
                to="/forgot-password"
                className="text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75"
              >
                Forgot password?
              </Link>
            </div>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
          Sign in
        </Button>
      </FieldGroup>

      <div className="my-4 relative">
        <div className="flex items-center absolute inset-0">
          <span className="w-full border-t"></span>
        </div>
        <div className="flex justify-center text-xs uppercase relative">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant={'outline'} type="button" disabled={isLoading}>
          <IconGithub />
          GitHub
        </Button>
        <Button variant={'outline'} type="button" disabled={isLoading}>
          <IconFacebook />
          Facebook
        </Button>
      </div>
    </form>
  )
}
