import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  FieldError,
  FieldLabel,
  Field,
  FieldGroup,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { sleep } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { useForm } from '@tanstack/react-form'
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

  const form = useForm({
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
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                  placeholder="name@example.com"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium hover:opacity-75 text-muted-foreground"
                  >
                    Forgot password?
                  </Link>
                </div>
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                  placeholder="********"
                />

                <FieldError errors={field.state.meta.errors} />
              </Field>
            )
          }}
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
