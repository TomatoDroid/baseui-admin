import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../../ui/field'
import {
  RadioGroup as RadioGroupComponent,
  RadioGroupItem,
} from '../../ui/radio-group'
import { Label } from '../../ui/label'
import { useFieldContext } from '../form-context'

type RadioGroupProps = {
  label: string
  options: {
    label: string
    value: string
  }[]
}

export default function RadioGroup({ label, options }: RadioGroupProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel>{label}</FieldLabel>
      <RadioGroupComponent
        id={field.name}
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
            <Label
              htmlFor={`${field.name}-${option.value}`}
              className="font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroupComponent>
      <FieldError errors={errors} />
    </Field>
  )
}

