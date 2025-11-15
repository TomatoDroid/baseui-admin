import { Field, FieldError } from "../ui/field"
import { FieldLabel } from "../ui/field"
import { PasswordInput } from "../password-input"
import { useFieldContext } from "./form-context"
import { useStore } from "@tanstack/react-form"

type PasswordProps = {
  label: string
  placeholder?: string
}

export default function Password({ label, placeholder }: PasswordProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <PasswordInput
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
