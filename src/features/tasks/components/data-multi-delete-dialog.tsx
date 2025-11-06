import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { sleep } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DataMultiDeleteDialogProps<TData> = {
  table: Table<TData>
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CONFIRM_WORD = 'DELETE'

export function DataMultiDeleteDialog<TData>({
  table, open, onOpenChange
}: DataMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')
  const selectedRows = table.getSelectedRowModel().rows
  const handleDelete = () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(`Please type "${CONFIRM_WORD}" to confirm deletion.`)
      return
    }
    onOpenChange(false)
    toast.promise(sleep(1500), {
      loading: 'Deleting... tasks',
      success: () => {
        table.resetRowSelection()
        return `Deleted ${selectedRows.length} ${selectedRows.length > 1 ? 'tasks' : 'task'
          }`
      },
      error: 'Error'
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== CONFIRM_WORD}
      title={
        <span className="flex items-center gap-2 text-destructive">
          <AlertTriangle size={18} />
          Delete {selectedRows.length} {' '}
          {selectedRows.length > 1 ? 'tasks' : 'task'}?
        </span>
      }
      desc={
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the selected tasks? <br />
            This action cannot be undone.
          </p>
          <Label className="flex flex-col items-start">
            <span className=''>Confirm by typing "{CONFIRM_WORD}":</span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Type "${CONFIRM_WORD}" to confirm.`}
            />
          </Label>
          <Alert variant={"destructive"}>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  )
}