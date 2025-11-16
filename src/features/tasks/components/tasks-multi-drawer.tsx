import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { showSubmittedData } from '@/lib/show-submitted-data'
import z from 'zod'
import { Task } from '../data/schema'
import { useAppForm } from '@/components/form'

type TasksMultiDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  status: z.string().min(1, 'Please select a status.'),
  label: z.string().min(1, 'Please select a label.'),
  priority: z.string().min(1, 'Please choose a priority.'),
})
export function TasksMultiDrawer({
  open,
  onOpenChange,
  currentRow,
}: TasksMultiDrawerProps) {
  const isUpdate = !!currentRow

  const form = useAppForm({
    defaultValues: currentRow ?? {
      title: '',
      status: '',
      label: '',
      priority: '',
    },
    validators: {
      onSubmit: taskSchema,
    },
    onSubmit: (data) => {
      onOpenChange(false)
      showSubmittedData(data.value)
      form.reset()
    },
  })

  return (
    <Sheet
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Task</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the task by providing necessary info.'
              : 'Add a new task by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          id="task-form"
          className="flex-1 space-y-6 px-4 overflow-y-auto"
        >
          <FieldGroup>
            <form.AppField
              name="title"
              children={(field) => {
                return <field.Input label="Title" placeholder="Enter a title" />
              }}
            />
            <form.AppField
              name="status"
              children={(field) => (
                <field.Select
                  label="Status"
                  placeholder="Select a status"
                  options={[
                    { label: 'In Progress', value: 'in progress' },
                    { label: 'Backlog', value: 'backlog' },
                    { label: 'Todo', value: 'todo' },
                    { label: 'Canceled', value: 'canceled' },
                    { label: 'Done', value: 'done' },
                  ]}
                />
              )}
            />

            <form.AppField
              name="label"
              children={(field) => (
                <field.RadioGroup
                  label="Label"
                  options={[
                    { label: 'Documentation', value: 'documentation' },
                    { label: 'Feature', value: 'feature' },
                    { label: 'Bug', value: 'bug' },
                  ]}
                />
              )}
            />

            <form.AppField
              name="priority"
              children={(field) => (
                <field.RadioGroup
                  label="Priority"
                  options={[
                    { label: 'High', value: 'high' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Low', value: 'low' },
                  ]}
                />
              )}
            />
          </FieldGroup>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={'outline'}>Close</Button>
          </SheetClose>
          <Button type="submit" form="task-form">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
