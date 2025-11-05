import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import React from "react"
import { Button } from "../base/button"
import { Input } from "../base/input"
import { DataTableFacetedFilter } from "./faceted-filter"
import { DataTableViewOptions } from "./view-options"

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  searchPlaceholder?: string
  searchKey?: string
  filters?: {
    columnId: string
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Filter ...",
  searchKey,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFilter = table.getState().columnFilters.length > 0 || table.getState().globalFilter
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {
          searchKey ? (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
              className={"h-8 w-36 lg:w-52"}
            />
          ) : (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className={"h-8 w-36 lg:w-52"}
            />
          )
        }
        <div className="flex gap-2 items-center">
          {filters?.map((filter) => {
            const column = table.getColumn(filter.columnId)
            if (!column) {
              return null
            }
            return <DataTableFacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options} />
          })}
        </div>
        {
          isFilter && <Button variant="ghost" onClick={() => {
            table.resetColumnFilters()
            table.setGlobalFilter("")
          }}>
            Reset
            <Cross2Icon />
          </Button>
        }
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}