import { Button } from "@/components/base/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/base/dialog"
import { createFormHook } from "@/components/base/form-tanstack"
import { Input } from "@/components/base/input"
import { Select, SelectContent, SelectItem, SelectPositioner, SelectTrigger, SelectValue } from "@/components/base/select"
import z from "zod"
import { roles } from "../data/data"
import { User } from "../data/schema"

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
    email: z.email({
      error: (iss) => (iss.input === '' ? 'Email is required.' : undefined),
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
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return password.length >= 8
    },
    {
      message: 'Password must be at least 8 characters long.',
      path: ['password'],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return /[a-z]/.test(password)
    },
    {
      message: 'Password must contain at least one lowercase letter.',
      path: ['password'],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true
      return /\d/.test(password)
    },
    {
      message: 'Password must contain at least one number.',
      path: ['password'],
    }
  )
  .refine(
    ({ isEdit, password, confirmPassword }) => {
      if (isEdit && !password) return true
      return password === confirmPassword
    },
    {
      message: "Passwords don't match.",
      path: ['confirmPassword'],
    }
  )

const { useAppForm } = createFormHook()
export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange
}: UsersActionDialogProps) {
  const isEdit = !!currentRow

  const form = useAppForm({
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
    } as z.infer<typeof formSchema>,
    validators: {
      onChange: formSchema
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit User' : 'Add User'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here. ' : 'Create new user here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form.AppForm>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              id="user-form"
            >
              <form.AppField name="firstName">
                {
                  (field) => (
                    <form.Item>
                      <field.Label>First Name</field.Label>
                      <field.Control>
                        <Input
                          placeholder="John"
                          autoComplete="off"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </field.Control>
                      <field.Message />
                    </form.Item>
                  )
                }
              </form.AppField>
              <form.AppField name="lastName">
                {(field) => (
                  <form.Item>
                    <field.Label>Last Name</field.Label>
                    <field.Control>
                      <Input
                        placeholder="Doe"
                        autoComplete="off"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.Control>
                    <field.Message />
                  </form.Item>
                )}
              </form.AppField>
              <form.AppField name="username">
                {(field) => (
                  <form.Item>
                    <field.Label>User Name</field.Label>
                    <field.Control>
                      <Input
                        type="text"
                        placeholder="User Name"
                        autoComplete="off"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.Control>
                    <field.Message />
                  </form.Item>
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <form.Item>
                    <field.Label>Email</field.Label>
                    <field.Control>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.Control>
                    <field.Message />
                  </form.Item>
                )}
              </form.AppField>
              <form.AppField name="phoneNumber">
                {(field) => (
                  <form.Item>
                    <field.Label>Phone Number</field.Label>
                    <field.Control>
                      <Input
                        type="text"
                        placeholder="Enter phone number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.Control>
                    <field.Message />
                  </form.Item>
                )}
              </form.AppField>
              <form.AppField name="role">
                {(field) => (
                  <form.Item>
                    <field.Label htmlFor="form-tanstack-select-language">Role</field.Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e as z.infer<typeof formSchema>["role"])}
                    >
                      <field.Control>
                        <SelectTrigger id="form-tanstack-select-language">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </field.Control>
                      <SelectPositioner>
                        <SelectContent>
                          {
                            roles.map((role) => (
                              <SelectItem value={role.value} key={role.value}>
                                {role.label}
                              </SelectItem>
                          ))
                          }
                        </SelectContent>
                      </SelectPositioner>
                    </Select>
                    <field.Message />
                  </form.Item>
                )}
              </form.AppField>
              <form.AppField name="password">
                {(field) => (
                  <form.Item>
                    <field.Label>Password</field.Label>
                    <field.Control>
                      <Input
                        placeholder='e.g., S3cur3P@ssw0rd'
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.Control>
                    <field.Message />
                  </form.Item>
                )}
              </form.AppField>
              <form.AppField name="confirmPassword">
                {(field) => (
                  <form.Item>
                    <field.Label>ConfirmPassword</field.Label>
                    <field.Control>
                      <Input
                        placeholder='e.g., S3cur3P@ssw0rd'
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.Control>
                    <field.Message />
                  </form.Item>
                )}
              </form.AppField>
            </form>
          </form.AppForm>
        </div>
        <DialogFooter>
          <Button type="submit" form={"user-form"}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}