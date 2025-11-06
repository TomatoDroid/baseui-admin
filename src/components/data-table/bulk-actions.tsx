import { Button } from "@/components/base/button"
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from "@/components/base/tooltip"
import { cn } from "@/lib/utils"
import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import React from "react"
import { Badge } from "../base/badge"
import { Separator } from "../base/separator"

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
  entityName: string
}

/**
 * A modular toolbar for displaying bulk actions when table rows are selected.
 *
 * @template TData The type of data in the table.
 * @param {object} props The component props.
 * @param {Table<TData>} props.table The react-table instance.
 * @param {string} props.entityName The name of the entity being acted upon (e.g., "task", "user").
 * @param {React.ReactNode} props.children The action buttons to be rendered inside the toolbar.
 * @returns {React.ReactNode | null} The rendered component or null if no rows are selected.
 */
export function BulkActionsToolbar<TData>({
  table,
  entityName,
  children,
}: React.PropsWithChildren<DataTableBulkActionsProps<TData>>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedCount = selectedRows.length

  const handleClearSelection = () => {
    table.resetRowSelection()
  }

  if (selectedCount === 0) {
    return null
  }

  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl",
      "transition-all delay-100 duration-300 ease-out hover:scale-105"
    )}>
      <div className={cn(
        "rounded-xl border p-2 shadow-xl",
        "bg-background/95 supports-backdrop-filter:bg-background/60 backdrop-blur-lg",
        "flex items-center gap-2"
      )}>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                size={"icon"}
                variant={"outline"}
                aria-label="Clear selection"
                title="Clear selection (Escape)"
                onClick={handleClearSelection}
                className="size-6 rounded-full"
              >
                <X />
                <span className="sr-only">Clear selection</span>
              </Button>
            }
          />
          <TooltipPositioner>
            <TooltipContent>
              <p>Clear selection (Escape)</p>
            </TooltipContent>
          </TooltipPositioner>
        </Tooltip>

        <Separator orientation="vertical" className={"h-5"} aria-hidden="true" />

        <div className="flex items-center gap-1 text-sm">
          <Badge variant={"default"} className="rounded-lg min-w-8" aria-label={`${selectedCount} selected`}>
            {selectedCount}
          </Badge>{" "}
          <span className="hidden sm:inline">
            {entityName}
            {selectedCount > 1 ? "s" : ""}
          </span>{" "}
          selected
        </div>
        <Separator orientation="vertical" className={"h-5"} aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}