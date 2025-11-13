import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { sleep } from '@/lib/utils'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === '' ? 'Please enter an email to reset password' : undefined,
  }),
})

export function ForgotPasswordForm({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      setIsLoading(true)
      toast.promise(sleep(2000), {
        loading: 'Sending reset password email...',
        success: () => {
          setIsLoading(false)
          navigate({ to: "/otp" })
          form.reset()
          return `Reset password email sent to ${data.value.email}`
        },
        error: 'Error sending reset password email',
      })
    },
  })
  return (
    <form
      className={className}
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
                  placeholder="Email"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )
          }}
        />
        <Button type="submit" disabled={isLoading}>
          Continue
          {isLoading ? <Loader2 className="animate-ping" /> : <ArrowRight />}
        </Button>
      </FieldGroup>
    </form>
  )
}
