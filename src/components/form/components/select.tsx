import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../../ui/field'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { useFieldContext } from '../form-context'

type SelectProps = {
  label: string
  placeholder?: string
  options: {
    label: string
    value: string
  }[]
}

export default function Select({ label, placeholder, options }: SelectProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <SelectComponent
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
        onOpenChange={(open) => {
          if (!open) {
            field.handleBlur()
          }
        }}
      >
        <SelectTrigger
          id={field.name}
          name={field.name}
          aria-invalid={isInvalid}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectComponent>
      <FieldError errors={errors} />
    </Field>
  )
}

