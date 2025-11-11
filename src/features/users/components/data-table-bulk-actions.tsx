import { Button } from '@/components/ui/button'
// imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { BulkActionsToolbar } from '@/components/data-table/bulk-actions'
import { DataMultiDeleteDialog } from '@/features/tasks/components/data-multi-delete-dialog'
import { sleep } from '@/lib/utils'
import { Table } from '@tanstack/react-table'
import { Mail, Trash2, UserCheck, UserX } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { User } from '../data/schema'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} users...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} users`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: 'Inviting users...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting users',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName="user">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant={'outline'}
                size={'icon'}
                className="size-8"
                aria-label="Invite selected users"
                title="Invite selected users"
                onClick={handleBulkInvite}
              >
                <Mail />
                <span className="sr-only">Invite selected users</span>
              </Button>
            }
          />
          // 移除 TooltipPositioner 包裹
          <TooltipContent>
            <p>Invite selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleBulkStatusChange('active')}
                className="size-8"
                aria-label="Activate selected users"
                title="Activate selected users"
              >
                <UserCheck />
                <span className="sr-only">Activate selected users</span>
              </Button>
            }
          />
          <TooltipContent>
            <p>Activate selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleBulkStatusChange('inactive')}
                className="size-8"
                aria-label="Deactivate selected users"
                title="Deactivate selected users"
              >
                <UserX />
                <span className="sr-only">Deactivate selected users</span>
              </Button>
            }
          />
          <TooltipContent>
            <p>Deactivate selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setShowDeleteConfirm(true)}
                className="size-8"
                aria-label="Delete selected users"
                title="Delete selected users"
              >
                <Trash2 />
                <span className="sr-only">Delete selected users</span>
              </Button>
            }
          />
          <TooltipContent>
            <p>Delete selected users</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <DataMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
