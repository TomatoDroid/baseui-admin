import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input as InputComponent } from '../ui/input'
import { useFieldContext } from './form-context'

type InputProps = {
  label: string
  placeholder?: string
}

export default function Input({ label, placeholder }: InputProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputComponent
        autoComplete="off"
        aria-invalid={isInvalid}
        placeholder={placeholder}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldError errors={errors} />
    </Field>
  )
}
