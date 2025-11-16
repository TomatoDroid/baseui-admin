import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../../ui/field'
import { Checkbox as CheckboxComponent } from '../../ui/checkbox'
import { useFieldContext } from '../form-context'

type CheckboxProps = {
  label: string
  description?: string
}

export default function Checkbox({ label, description }: CheckboxProps) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center space-x-2">
        <CheckboxComponent
          id={field.name}
          name={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
        <FieldLabel htmlFor={field.name} className="font-normal cursor-pointer">
          {label}
        </FieldLabel>
      </div>
      {description && (
        <p className="text-muted-foreground text-sm leading-normal font-normal mt-1">
          {description}
        </p>
      )}
      <FieldError errors={errors} />
    </Field>
  )
}

