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
import { useForm } from '@tanstack/react-form'
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

export function SignUpForm({
  className,
  ...props
}: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
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
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
        <form.Field
          name="confirmPassword"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
