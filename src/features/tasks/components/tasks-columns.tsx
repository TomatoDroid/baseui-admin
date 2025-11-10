import { Badge } from "@/components/base/badge";
import { Checkbox } from "@/components/base/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const tasksColumns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(value)
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value)
        }}
        aria-label="Select row"
        className={""}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex gap-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-124">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      className: '',
      tdClassName: '',
    },
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"))
      if (!status) {
        return null
      }
      return (
        <div className="flex w-24 items-center gap-2">
          {status.icon && <status.icon className="size-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
    meta: { className: "", tdClassName: "" },
    cell: ({ row }) => {
      const priority = priorities.find((priority) => priority.value === row.getValue("priority"))
      if (!priority) {
        return null
      }
      return (
        <div className="flex items-center gap-2">
          {priority.icon && <priority.icon className="size-4 text-muted-foreground"/>}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }
]
