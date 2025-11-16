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
import { useAppForm } from '@/components/form'
import React, { useState } from 'react'
import z from 'zod'

type SignUpFormProps = React.HTMLAttributes<HTMLFormElement>

const formSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === '' ? 'Please enter an email to sign in' : undefined,
    }),
    password: z
      .string()
      .min(1, 'Please enter a password to sign in')
      .min(7, 'Password must be at least 7 characters long'),
    confirmPassword: z
      .string()
      .min(1, 'Please enter a confirm password to sign in'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: () => {
      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
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
            <field.Password label="Password" placeholder="********" />
          )}
        />
        <form.AppField
          name="confirmPassword"
          children={(field) => (
            <field.Password label="Confirm Password" placeholder="********" />
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Create Account
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
