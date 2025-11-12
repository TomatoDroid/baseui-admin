import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm, useStore } from '@tanstack/react-form'
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

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      role: 'superadmin',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      isEdit,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      console.log(data)
      form.reset()
    },
  })

  const isPasswordTouched  =useStore(form.store, (state) => state.values.password === '')

  return (
    <Dialog open={open} onOpenChange={(state) => {
      form.reset()
      onOpenChange(state)
    }}>
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
              <form.Field
                name="firstName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        First Name
                      </FieldLabel>
                      <Input
                        className="col-span-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="John"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                      />
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="lastName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        Last Name
                      </FieldLabel>
                      <Input
                        className="col-span-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Doe"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                      />
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="username"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        User Name
                      </FieldLabel>
                      <Input
                        className="col-span-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="User Name"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                      />
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
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
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        className="col-span-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Email"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                      />
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="phoneNumber"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        Phone Number
                      </FieldLabel>
                      <Input
                        className="col-span-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter phone number"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                      />
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="role"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        Role
                      </FieldLabel>
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger
                          aria-invalid={isInvalid}
                          className="col-span-4"
                        >
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        Password
                      </FieldLabel>
                      <PasswordInput
                        className="col-span-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., S3cur3P@ssw0rd"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                      />
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="confirmPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="grid grid-cols-6 gap-x-4 gap-y-1" data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="col-span-2 text-end"
                      >
                        Confirm Password
                      </FieldLabel>
                      <PasswordInput
                        className="col-span-4"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., S3cur3P@ssw0rd"
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        disabled={isPasswordTouched}
                      />
                      <FieldError
                        className="col-span-4 col-start-3"
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )
                }}
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
