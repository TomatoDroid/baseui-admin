import { cn, getPageNumbers } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "../base/button"
import { Select, SelectContent, SelectItem, SelectPositioner, SelectTrigger, SelectValue } from "../base/select"

type DataTablePagination<TData> = {
  table: Table<TData>
  className?: string
}

export function DataTablePagination<TData>({
  table,
  className
}: DataTablePagination<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className={cn(
      "flex items-center justify-between px-2 overflow-clip",
      "@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4",
      className
    )}>
      <div className="flex items-center justify-between w-full">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium @2xl/content:hidden">
          Page{currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2 @max-2xl/content:flex-row-reverse">
          <Select>
            <SelectTrigger className={"h-8 w-20"}>
              <SelectValue placeholder={table.getState().pagination.pageSize + ''} />
            </SelectTrigger>
            <SelectPositioner>
              <SelectContent>
                {
                  [10, 20, 30, 40, 50].map(pageSize => (
                    <SelectItem key={pageSize} value={pageSize + ''}>{pageSize}</SelectItem>
                  ))
                }
              </SelectContent>
            </SelectPositioner>
          </Select>
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
        </div>
      </div>

      <div className="flex items-center sm:gap-6 lg:gap-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium @max-3xl/content:hidden">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            className="@max-md/content:hidden"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to the first page</span>
            <DoubleArrowLeftIcon />
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            className=""
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to the previous page</span>
            <ChevronLeftIcon />
          </Button>
          {
            pageNumbers.map((pageNumber, index) => (
              <div className="flex items-center" key={`${pageNumber}-${index}`}>
                {
                  pageNumber === "..." ? (
                    <span className="px-1 text-sm text-muted-foreground">...</span>
                  ) : (
                    <Button
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      size={"sm"}
                      onClick={() => table.setPageIndex((pageNumber as number) - 1)}
                    >
                      <span className="sr-only">Go to the page</span>
                      {pageNumber}
                    </Button>
                  )
                }
              </div>
            ))
          }
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to the next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to the last page</span>
            <DoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}