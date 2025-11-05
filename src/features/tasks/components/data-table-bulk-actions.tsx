import { Button } from "@/components/base/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPositioner, DropdownMenuTrigger } from "@/components/base/dropdown-menu"
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from "@/components/base/tooltip"
import { BulkActionsToolbar } from "@/components/data-table/bulk-actions"
import { Table } from "@tanstack/react-table"
import { CircleArrowUp } from "lucide-react"
import { statuses } from "../data/dara"

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {

  return (
    <>
      <BulkActionsToolbar table={table} entityName="tasks">
        <DropdownMenu modal={false}>
          <Tooltip>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      aria-label='Update status'
                      title='Update status'
                    >
                      <CircleArrowUp />
                      <span className='sr-only'>Update status</span>
                    </Button>
                  }
                />
              }
            />
            <TooltipPositioner>
              <TooltipContent>
                <p>Update status</p>
              </TooltipContent>
            </TooltipPositioner>
          </Tooltip>
          <DropdownMenuPositioner sideOffset={14}>
            <DropdownMenuContent>
              {
                statuses.map((status) => (
                  <DropdownMenuItem
                    key={status.value}
                    onClick={() => { }}
                  >
                    {status.icon && <status.icon className="text-muted-foreground" />}
                    {status.label}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>
      </BulkActionsToolbar>
    </>
  )
}