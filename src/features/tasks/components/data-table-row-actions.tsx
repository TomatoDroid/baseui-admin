import { Button } from "@/components/base/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPositioner, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/base/dropdown-menu"
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { labels } from "../data/dara"
import { taskSchema } from "../data/schema"
import { useTasks } from "./tasks-provider"


type DataTableRowActionsProps<TData> = {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  const { setOpen, setCurrentRow } = useTasks()
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem disabled>Make a Copy</DropdownMenuItem>
          <DropdownMenuItem disabled>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub defaultOpen={false}>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuPositioner>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={task.label}>
                  {
                    labels.map((label) => (
                      <DropdownMenuRadioItem key={label.value} value={label.value}>
                        {label.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPositioner>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>
              <Trash2 size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPositioner>
    </DropdownMenu>
  )
}