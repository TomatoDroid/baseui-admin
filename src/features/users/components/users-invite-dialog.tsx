import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { showSubmittedData } from "@/lib/show-submitted-data"
import { useAppForm } from "@/components/form"
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
  const form = useAppForm({
    defaultValues: {
      email: '',
      role: '',
      desc: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      showSubmittedData(data.value)
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
            <form.AppField
              name="email"
              children={(field) => (
                <field.Input
                  label="Email"
                  placeholder="eg: john.doe@gmail.com"
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
              name="desc"
              children={(field) => (
                <field.Textarea
                  label="Description (optional)"
                  placeholder="Add a personal note to your invitation (optional)"
                />
              )}
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
