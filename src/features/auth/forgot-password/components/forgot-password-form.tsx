import { useAppForm } from '@/components/form'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { sleep } from '@/lib/utils'
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

  const form = useAppForm({
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
          navigate({ to: '/otp' })
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
        <form.AppField
          name="email"
          children={(field) => (
            <field.Input label="Email" placeholder="name@example.com" />
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Continue
          {isLoading ? <Loader2 className="animate-ping" /> : <ArrowRight />}
        </Button>
      </FieldGroup>
    </form>
  )
}
