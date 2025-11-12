import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { showSubmittedData } from "@/lib/show-submitted-data"
import { useForm } from "@tanstack/react-form"
import { MailPlus, Send } from "lucide-react"
import z from "zod"
import { roles } from "../data/data"

type UsersInviteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter an email to invite.' : undefined),
  }),
  role: z.string().min(1, 'Role is required.'),
  desc: z.string()
})

export function UsersInviteDialog({
  open,
  onOpenChange
}: UsersInviteDialogProps) {
  const form = useForm({
    defaultValues: {
      email: '',
      role: '',
      desc: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      // onOpenChange(false)
      showSubmittedData(data.value)
      // form.reset()
    },
  })

  return (
    <Dialog open={open} onOpenChange={(state) => {
      onOpenChange(state)
      form.reset()
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-start">
          <DialogTitle className="flex items-center gap-2">
            <MailPlus />
            Invite User
          </DialogTitle>
          <DialogDescription>
            Invite new user to join your team by sending them an email invitation. Assign a role to define their access level.
          </DialogDescription>
        </DialogHeader>
        <form
          id="users-invite-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder='eg: john.doe@gmail.com'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <FieldError errors={field.state.meta.errors} />
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
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v)}
                    >
                      <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                        <SelectValue placeholder='Select a role'></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />
            <form.Field
              name="desc"
              children={(field) => {
                return (
                  <Field >
                    <FieldLabel>Description (optional)</FieldLabel>
                    <Textarea
                      placeholder='Add a personal note to your invitation (optional)'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="users-invite-form">
            InVite <Send />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}