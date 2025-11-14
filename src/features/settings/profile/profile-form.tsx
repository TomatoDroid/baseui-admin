import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { useForm } from '@tanstack/react-form'
import { XIcon } from 'lucide-react'
import z from 'zod'

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
    .optional(),
})

export function ProfileForm() {
  const form = useForm({
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
      onSubmit: formSchema,
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
          <form.Field
            name="username"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="off"
                    placeholder="shadcn"
                    aria-invalid={isInvalid}
                  />
                  <FieldDescription>
                    This is your public display name. It can be your real name
                    or a pseudonym. You can only change this once every 30 days.
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          />

          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger aria-invalid={isInvalid}>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    You can manage verified email addresses in your email
                    settings
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          />

          <form.Field
            name="bio"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                  />
                  <FieldDescription>
                    You can <span>@mention</span> other users and organizations
                    to link to them.
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          />

          <form.Field
            mode="array"
            name="urls"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>URLs</FieldLabel>
                  <FieldDescription>
                    Add links to your website, blog, or social media profiles.
                  </FieldDescription>
                  <FieldGroup>
                    {field.state.value.map((_, index) => (
                      <form.Field
                        key={index}
                        name={`urls[${index}].value`}
                        children={(subField) => {
                          const isSubFieldInvalid =
                            subField.state.meta.isTouched &&
                            !subField.state.meta.isValid
                          return (
                            <Field data-invalid={isSubFieldInvalid}>
                              <InputGroup>
                                <InputGroupInput
                                  name={subField.name}
                                  value={subField.state.value}
                                  onBlur={subField.handleBlur}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                  autoComplete="off"
                                  aria-invalid={isSubFieldInvalid}
                                />
                                {field.state.value.length > 1 && (
                                  <InputGroupAddon align={'inline-end'}>
                                    <InputGroupButton
                                      type="button"
                                      variant={'ghost'}
                                      size={'icon-xs'}
                                      onClick={() => field.removeValue(index)}
                                      aria-label={`Remove email ${index + 1}`}
                                    >
                                      <XIcon />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                )}
                              </InputGroup>
                              <FieldError errors={subField.state.meta.errors} />
                            </Field>
                          )
                        }}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size={'sm'}
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
