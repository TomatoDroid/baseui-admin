import { HTMLAttributes, useState } from 'react'
import { useForm, useStore } from '@tanstack/react-form'
import { z } from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

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

  const form = useForm({
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
        <form.Field
          name="otp"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <InputOTP
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  maxLength={6}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )
          }}
        />
        <Button type="submit" disabled={isLoading || otp.length !== 6}>
          Verify
        </Button>
      </FieldGroup>
    </form>
  )
}
