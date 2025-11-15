import { Combobox } from '@/components/combobox'
import { DataPicker } from '@/components/data-picker'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from '@tanstack/react-form'
import z from 'zod'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
]

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your name.')
    .min(2, 'Name must be at least 2 characters.')
    .max(30, 'Name must not be longer than 30 characters.'),
  dob: z.date('Please select your date of birth.'),
  language: z.string('Please select a language.'),
})

export function AccountForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      dob: undefined as Date | undefined,
      language: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      console.log(data)
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
                </FieldDescription>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )
          }}
        />
        <form.Field
          name="dob"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>
                <DataPicker
                  selected={field.state.value}
                  onSelect={(date: Date | undefined) =>
                    field.handleChange((prev) => (date ? date : prev))
                  }
                  placeholder="Select your date of birth"
                />
                <FieldDescription>
                  Your date of birth is used to calculate your age.
                </FieldDescription>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )
          }}
        />
        <form.Field
          name="language"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                <Combobox
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  placeholder="Select a language"
                  options={languages}
                />
                <FieldDescription>
                  This is the language that will be used in the dashboard.
                </FieldDescription>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )
          }}
        />
        <Button type="submit">Save</Button>
      </FieldGroup>
    </form>
  )
}
