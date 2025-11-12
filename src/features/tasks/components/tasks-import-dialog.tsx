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
import { useForm } from '@tanstack/react-form'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
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
  const form = useForm({
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
          <form.Field
            name={'file'}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>File</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="file"
                    onChange={(e) => field.handleChange(e.target.files)}
                    aria-invalid={isInvalid}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
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
