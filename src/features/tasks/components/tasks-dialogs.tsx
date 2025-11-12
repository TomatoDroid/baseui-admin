import { ConfirmDialog } from '@/components/confirm-dialog'
import { TasksImportDialog } from './tasks-import-dialog'
import { TasksMultiDrawer } from './tasks-multi-drawer'
import { useTasks } from './tasks-provider'
import { showSubmittedData } from '@/lib/show-submitted-data'

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks()
  return (
    <>
      <TasksMultiDrawer
        key={'task-create'}
        open={open === 'create'}
        onOpenChange={() => {
          setOpen('create')
        }}
      />
      <TasksImportDialog
        key={'task-import'}
        open={open === 'import'}
        onOpenChange={() => {
          setOpen('import')
        }}
      />
      {currentRow && (
        <>
          <TasksMultiDrawer
            key={'task-edit'}
            open={open === 'update'}
            currentRow={currentRow}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
          />

          <ConfirmDialog
            destructive
            key={'task-delete'}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            desc={
              <>
                You are about to delete a task with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            handleConfirm={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
              showSubmittedData(
                currentRow,
                'The following task has been deleted:',
              )
            }}
            confirmText="Delete"
            title={`Delete this tasks:${currentRow.id} ?`}
          />
        </>
      )}
    </>
  )
}
