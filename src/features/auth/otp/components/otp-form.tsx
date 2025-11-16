import { HTMLAttributes, useState } from 'react'
import { useStore } from '@tanstack/react-form'
import { z } from 'zod'
import { FieldGroup } from '@/components/ui/field'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAppForm } from '@/components/form'

const formSchema = z.object({
  otp: z
    .string()
    .min(6, 'Please enter the 6-digit code.')
    .max(6, 'Please enter the 6-digit code.'),
})

export function OtpForm({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useAppForm({
    defaultValues: {
      otp: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: () => {
      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
        navigate({ to: '/' })
      }, 1000)
    },
  })

  const otp = useStore(form.store, (state) => state.values.otp)

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
          name="otp"
          children={(field) => (
            <field.InputOTP label="OTP" length={6} groups={[2, 2, 2]} />
          )}
        />
        <Button type="submit" disabled={isLoading || otp.length !== 6}>
          Verify
        </Button>
      </FieldGroup>
    </form>
  )
}
