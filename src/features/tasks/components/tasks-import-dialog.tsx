import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Task } from '../data/schema'
import z from 'zod'
import { useAppForm } from '@/components/form'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'

type TasksImportDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Please select a file to import.',
    })
    .refine(
      (files) =>
        ['text/csv', 'text/plain', 'application/pdf'].includes(files[0].type),
      {
        message: 'Please select a CSV file to import.',
      },
    ),
})

export function TasksImportDialog({
  open,
  onOpenChange,
}: TasksImportDialogProps) {
  const form = useAppForm({
    defaultValues: {
      file: null as FileList | null,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      const file = data.value.file?.item(0)
      if (file) {
        const fileDetails = {
          name: file.name,
          type: file.type,
          size: file.size,
        }
        showSubmittedData(fileDetails, 'You have imported the following file:')
      }
      onOpenChange(false)
      form.reset()
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Tasks</DialogTitle>
          <DialogDescription>
            Import tasks quickly from a CSV file.
          </DialogDescription>
        </DialogHeader>
        <form
          id="tasks-import-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <form.AppField
            name="file"
            children={(field) => {
              return (
                <field.Input
                  label="File"
                  placeholder="Select a file"
                  type="file"
                />
              )
            }}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="tasks-import-form">
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
