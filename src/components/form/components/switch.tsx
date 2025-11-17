import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../../ui/field'
import { Switch as SwitchComponent } from '../../ui/switch'
import { useFieldContext } from '../form-context'
import React from 'react'

type SwitchProps = {
  label: string
  description?: React.ReactNode
}

export default function Switch({ label, description }: SwitchProps) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center space-x-2">
        <SwitchComponent
          id={field.name}
          name={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked)}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <FieldLabel htmlFor={field.name} className="font-normal cursor-pointer">
          {label}
        </FieldLabel>
      </div>
      {description && (
        <div className="text-muted-foreground text-sm leading-normal font-normal mt-1">
          {description}
        </div>
      )}
      <FieldError errors={errors} />
    </Field>
  )
}

