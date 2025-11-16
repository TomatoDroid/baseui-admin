import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { useAppForm } from '@/components/form'
import { XIcon } from 'lucide-react'
import z from 'zod'
import {
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from '@/components/ui/input-group'

const formSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters.')
    .max(30, 'Username must not be longer than 30 characters.'),
  email: z.email({
    error: (iss) =>
      iss.input === undefined
        ? 'Please select an email to display.'
        : undefined,
  }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.url('Please enter a valid URL.'),
      }),
    )
    .default([]),
})

export function ProfileForm() {
  const form = useAppForm({
    defaultValues: {
      username: '',
      email: '',
      bio: 'I own a computer.',
      urls: [
        { value: 'https://shadcn.com' },
        { value: 'http://twitter.com/shadcn' },
      ],
    },
    validators: {
      onSubmit: formSchema as any,
    },
    onSubmit: (data) => {
      showSubmittedData(data)
    },
  })
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.AppField
            name="username"
            children={(field) => (
              <field.Input label="Username" placeholder="shadcn" />
            )}
          />

          <form.AppField
            name="email"
            children={(field) => (
              <field.Select
                label="Email"
                placeholder="Select a verified email to display"
                options={[
                  { label: 'm@example.com', value: 'm@example.com' },
                  { label: 'm@google.com', value: 'm@google.com' },
                  { label: 'm@support.com', value: 'm@support.com' },
                ]}
              />
            )}
          />

          <form.AppField
            name="bio"
            children={(field) => (
              <field.Textarea
                label="Bio"
                placeholder="Tell us a little bit about yourself"
              />
            )}
          />

          <form.AppField
            mode="array"
            name="urls"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>URLs</FieldLabel>
                  <FieldDescription>
                    Add links to your website, blog, or social media profiles.
                  </FieldDescription>
                  <FieldGroup>
                    {field.state.value.map((_, index) => (
                      <form.AppField
                        key={index}
                        name={`urls[${index}].value`}
                        children={(subField) => (
                          <subField.InputGroup
                            label=""
                            children={
                              <>
                                <InputGroupInput placeholder="https://example.com" />
                                {subField.state.value.length > 1 && (
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      type="button"
                                      variant="ghost"
                                      size="icon-sm"
                                      onClick={() => field.removeValue(index)}
                                      aria-label="Remove URL"
                                    >
                                      <XIcon className="h-4 w-4" />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                )}
                              </>
                            }
                          />
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue({ value: '' })}
                      aria-label="Add URL"
                    >
                      Add URL
                    </Button>
                  </FieldGroup>
                </Field>
              )
            }}
          />
          <Button type="submit">Update profile</Button>
        </FieldGroup>
      </form>
    </div>
  )
}
