import { Button } from "@/components/base/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPositioner, DropdownMenuTrigger } from "@/components/base/dropdown-menu"
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from "@/components/base/tooltip"
import { BulkActionsToolbar } from "@/components/data-table/bulk-actions"
import { sleep } from "@/lib/utils"
import { Table } from "@tanstack/react-table"
import { ArrowUpDown, CircleArrowUp, Download, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataMultiDeleteDialog } from "./data-multi-delete-dialog"

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(true)
  const selectedRows = table.getSelectedRowModel().rows
  function handleBulkExport() {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    toast.promise(sleep(2000), {
      loading: 'Exporting tasks...',
      success: () => {
        table.resetRowSelection()
        return `Exported ${selectedTasks.length} task${selectedTasks.length > 1 ? 's' : ''} to CSV.`
      },
      error: 'Error',
    })
    table.resetRowSelection()
  }

  function handleBulkPriorityChange(priority: string) {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    toast.promise(sleep(2000), {
      loading: 'Updating priority...',
      success: () => {
        table.resetRowSelection()
        return `Priority updated to "${priority}" for ${selectedTasks.length} task${selectedTasks.length > 1 ? 's' : ''}.`
      },
      error: 'Error',
    })
    table.resetRowSelection()
  }

  const handleBulkStatusChange = (status: string) => {
    const selectedTasks = selectedRows.map((row) => row.original as Task)
    toast.promise(sleep(2000), {
      loading: 'Updating status...',
      success: () => {
        table.resetRowSelection()
        return `Status updated to "${status}" for ${selectedTasks.length} task${selectedTasks.length > 1 ? 's' : ''}.`
      },
      error: 'Error',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName="task">
        <DropdownMenu modal={false}>
          <Tooltip>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="size-8"
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
                    onClick={() => handleBulkStatusChange(status.value)}
                  >
                    {status.icon && <status.icon className="text-muted-foreground" />}
                    {status.label}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="size-8"
                      aria-label='Update priority'
                      title='Update priority'
                    >
                      <ArrowUpDown />
                      <span className="sr-only">Update priority</span>
                    </Button>
                  }
                />
              }
            />
            <TooltipPositioner>
              <TooltipContent>Update priority</TooltipContent>
            </TooltipPositioner>
          </Tooltip>
          <DropdownMenuPositioner sideOffset={14}>
            <DropdownMenuContent>
              {
                priorities.map((priority) => (
                  <DropdownMenuItem key={priority.value} onClick={() => handleBulkPriorityChange(priority.value)}>
                    {priority.icon && <priority.icon className="text-muted-foreground" />}
                    {priority.label}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant={"outline"}
                size={"icon"}
                className="size-8"
                aria-label="Export tasks"
                title="Export tasks"
                onClick={handleBulkExport}
              >
                <Download />
                <span className="sr-only">Export tasks</span>
              </Button>
            }
          />
          <TooltipPositioner>
            <TooltipContent>
              <p>Export tasks</p>
            </TooltipContent>
          </TooltipPositioner>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant={"destructive"}
                size={"icon"}
                className="size-8"
                aria-label='Delete selected tasks'
                title='Delete selected tasks'
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 />
                <span className="sr-only">Delete selected tasks</span>
              </Button>
            }
          />
          <TooltipPositioner>
            <TooltipContent>
              <p>Delete selected tasks</p>
            </TooltipContent>
          </TooltipPositioner>
        </Tooltip>
      </BulkActionsToolbar>

      <DataMultiDeleteDialog table={table} open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm} />
    </>
  )
}
