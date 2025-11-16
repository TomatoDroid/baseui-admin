import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../../ui/field'
import { Textarea as TextareaComponent } from '../../ui/textarea'
import { useFieldContext } from '../form-context'

type TextareaProps = {
  label: string
  placeholder?: string
  rows?: number
}

export default function Textarea({ label, placeholder, rows }: TextareaProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <TextareaComponent
        autoComplete="off"
        aria-invalid={isInvalid}
        placeholder={placeholder}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        rows={rows}
      />
      <FieldError errors={errors} />
    </Field>
  )
}

