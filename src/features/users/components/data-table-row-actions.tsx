import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPositioner, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from "@tanstack/react-table"
import { Trash2, UserPen } from "lucide-react"
import { User } from "../data/schema"
import { useUsers } from "./users-provider"


type DataTableRowActionsProps = {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={"ghost"} className="size-8 data-popup-open:bg-muted">
            <DotsHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />
      <DropdownMenuPositioner side="left" align="start">
        <DropdownMenuContent className={"w-40"}>
          <DropdownMenuItem onClick={() => {
            setCurrentRow(row.original)
            setOpen("edit")
          }}>
            Edit
            <DropdownMenuShortcut>
              <UserPen />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen("delete")
            }}
            className={"text-red-500"}
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 className={"text-red-500"} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPositioner>
    </DropdownMenu>
  )
}
