import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { useAppForm } from '@/components/form'
import { useStore } from '@tanstack/react-form'
import z from 'zod'
import { roles } from '../data/data'
import { User } from '../data/schema'

type UsersActionDialogProps = {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z
  .object({
    firstName: z.string().min(1, 'First Name is required.'),
    lastName: z.string().min(1, 'Last Name is required.'),
    username: z.string().min(1, 'Username is required.'),
    phoneNumber: z.string().min(1, 'Phone number is required.'),
    email: z.string().email({
      message: 'Please enter a valid email.',
    }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().min(1, 'Role is required.'),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isEdit && !data.password) return true
      return data.password.length > 0
    },
    {
      message: 'Password is required.',
      path: ['password'],
    },
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return password.length >= 8
    },
    {
      message: 'Password must be at least 8 characters long.',
      path: ['password'],
    },
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return /[a-z]/.test(password)
    },
    {
      message: 'Password must contain at least one lowercase letter.',
      path: ['password'],
    },
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return /\d/.test(password)
    },
    {
      message: 'Password must contain at least one number.',
      path: ['password'],
    },
  )
  .refine(
    ({ isEdit, password, confirmPassword }) => {
      if (isEdit && !password) return true
      return password === confirmPassword
    },
    {
      message: "Passwords don't match.",
      path: ['confirmPassword'],
    },
  )

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
}: UsersActionDialogProps) {
  const isEdit = !!currentRow

  const form = useAppForm({
    defaultValues: isEdit
      ? {
          ...currentRow,
          password: '',
          confirmPassword: '',
          isEdit: true,
        }
      : {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          role: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          isEdit: false,
        },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      showSubmittedData(data.value)
      form.reset()
      onOpenChange(false)
    },
  })

  const isPasswordTouched = useStore(
    form.store,
    (state) => state.values.password === '',
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here. ' : 'Create new user here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-130 overflow-y-auto py-1 pe-3">
          <form
            id="user-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.AppField
                name="firstName"
                children={(field) => (
                  <field.Input label="First Name" placeholder="John" />
                )}
              />
              <form.AppField
                name="lastName"
                children={(field) => (
                  <field.Input label="Last Name" placeholder="Doe" />
                )}
              />
              <form.AppField
                name="username"
                children={(field) => (
                  <field.Input label="User Name" placeholder="User Name" />
                )}
              />
              <form.AppField
                name="email"
                children={(field) => (
                  <field.Input label="Email" placeholder="Email" />
                )}
              />
              <form.AppField
                name="phoneNumber"
                children={(field) => (
                  <field.Input
                    label="Phone Number"
                    placeholder="Enter phone number"
                  />
                )}
              />
              <form.AppField
                name="role"
                children={(field) => (
                  <field.Select
                    label="Role"
                    placeholder="Select a role"
                    options={roles.map((role) => ({
                      label: role.label,
                      value: role.value,
                    }))}
                  />
                )}
              />
              <form.AppField
                name="password"
                children={(field) => (
                  <field.Password
                    label="Password"
                    placeholder="e.g., S3cur3P@ssw0rd"
                  />
                )}
              />
              <form.AppField
                name="confirmPassword"
                children={(field) => (
                  <field.Password
                    label="Confirm Password"
                    placeholder="e.g., S3cur3P@ssw0rd"
                    disabled={isPasswordTouched}
                  />
                )}
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit" form="user-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
