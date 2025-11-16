import { Button } from '@/components/ui/button'
import { useAppForm } from '@/components/form'
import z from 'zod'
import { FieldGroup } from '@/components/ui/field'

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
  language: z.string().min(1, 'Please select a language.'),
})

export function AccountForm() {
  const form = useAppForm({
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
        <form.AppField
          name="name"
          children={(field) => (
            <field.Input label="Name" placeholder="Enter your name" />
          )}
        />
        <form.AppField
          name="dob"
          children={(field) => (
            <field.DataPicker
              label="Date of Birth"
              placeholder="Select your date of birth"
            />
          )}
        />
        <form.AppField
          name="language"
          children={(field) => (
            <field.Combobox
              label="Language"
              placeholder="Select a language"
              options={languages}
            />
          )}
        />
        <Button type="submit">Save</Button>
      </FieldGroup>
    </form>
  )
}
