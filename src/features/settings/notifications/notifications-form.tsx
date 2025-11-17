import { useAppForm } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Link } from '@tanstack/react-router'
import z from 'zod'

const formSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    error: (iss) =>
      iss.input === '' ? 'Please select a notification type' : undefined,
  }),
  mobile: z.boolean(),
  communication_emails: z.boolean(),
  social_emails: z.boolean(),
  marketing_emails: z.boolean(),
  security_emails: z.boolean(),
})

export function NotificationsForm() {
  const form = useAppForm({
    defaultValues: {
      type: 'all',
      mobile: false,
      communication_emails: false,
      social_emails: false,
      marketing_emails: false,
      security_emails: false,
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
        <form.AppField name="type">
          {(field) => (
            <field.RadioGroup
              label="Notify me about..."
              options={[
                { label: 'All new messages', value: 'all' },
                { label: 'Direct messages and mentions', value: 'mentions' },
                { label: 'Nothing', value: 'none' },
              ]}
            />
          )}
        </form.AppField>
        <FieldSet>
          <FieldLabel>Email Notifications</FieldLabel>
          <form.AppField name="communication_emails">
            {(field) => (
              <field.Switch
                label="Communication emails"
                description="Receive emails about your account activity.
"
              />
            )}
          </form.AppField>
          <form.AppField name="marketing_emails">
            {(field) => (
              <field.Switch
                label="Marketing Emails"
                description="Receive emails about new products, features, and more."
              />
            )}
          </form.AppField>
          <form.AppField name="social_emails">
            {(field) => (
              <field.Switch
                label="Social Emails"
                description="Receive emails for friend requests, follows, and more."
              />
            )}
          </form.AppField>
          <form.AppField name="security_emails">
            {(field) => (
              <field.Switch
                label="Security Emails"
                description="Receive emails about your account activity and security."
              />
            )}
          </form.AppField>
        </FieldSet>
        <form.AppField
          name="mobile"
          children={(field) => (
            <field.Checkbox
              label="Use different settings for my mobile devices"
              description={
                <>
                  You can manage your mobile notifications in the{' '}
                  <Link
                    to="/settings"
                    className="underline decoration-dashed underline-offset-4 hover:decoration-solid"
                  >
                    mobile settings
                  </Link>{' '}
                  page.
                </>
              }
            />
          )}
        />
        <Button type="submit">Save</Button>
      </FieldGroup>
    </form>
  )
}
