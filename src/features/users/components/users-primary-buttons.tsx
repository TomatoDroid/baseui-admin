import { Button } from "@/components/ui/button"
import { MailPlus, UserPlus } from "lucide-react"
import { useUsers } from "./users-provider"

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        className="space-x-1"
        onClick={() => setOpen("invite")}
      >
        <span>Invite User</span>
        <MailPlus />
      </Button>
      <Button
        className="space-x-1"
        onClick={() => setOpen("add")}
      >
        <span>Add User</span>
        <UserPlus />
      </Button>
    </div>
  )
}