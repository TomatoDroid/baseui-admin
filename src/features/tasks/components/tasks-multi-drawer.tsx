import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { showSubmittedData } from "@/lib/show-submitted-data"
import { useForm } from "@tanstack/react-form"
import z from "zod"
import { Task } from "../data/schema"

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
  currentRow
}: TasksMultiDrawerProps) {
  const isUpdate = !!currentRow

  const form = useForm({
    defaultValues: currentRow ?? {
      title: '',
      status: '',
      label: '',
      priority: '',
    },
    validators: {
      onSubmit: taskSchema
    },
    onSubmit: (data) => {
      onOpenChange(false)
      showSubmittedData(data.value)
      form.reset()
    },
  })

  return (
    <Sheet open={open} onOpenChange={(state) => {
      form.reset()
      onOpenChange(state)
    }}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {isUpdate ? 'Update' : 'Create'} Task
          </SheetTitle>
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
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder='Enter a title'
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />
            <form.Field
              name="status"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v)}
                    >
                      <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                        <SelectValue placeholder='Select dropdown'></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { label: 'In Progress', value: 'in progress' },
                          { label: 'Backlog', value: 'backlog' },
                          { label: 'Todo', value: 'todo' },
                          { label: 'Canceled', value: 'canceled' },
                          { label: 'Done', value: 'done' },
                        ].map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            />

            <form.Field
              name="label"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Label</FieldLabel>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      data-invalid={isInvalid}
                    >
                      {
                        [
                          { label: 'Documentation', value: 'documentation' },
                          { label: 'Feature', value: 'feature' },
                          { label: 'Bug', value: 'bug' }
                        ].map(item => (
                          <Field
                            className="flex items-center"
                            orientation={"horizontal"}
                            data-invalid={isInvalid}
                          >
                            <RadioGroupItem
                              id={item.value}
                              key={item.value}
                              value={item.value}
                              aria-invalid={isInvalid}
                            />
                            <FieldLabel htmlFor={item.value}>{item.label}</FieldLabel>
                          </Field>
                        ))
                      }
                      <FieldError errors={field.state.meta.errors} />
                    </RadioGroup>
                  </Field>
                )
              }}
            />

            <form.Field
              name="priority"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Label</FieldLabel>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      data-invalid={isInvalid}
                    >
                      {
                        [
                          { label: 'High', value: 'high' },
                          { label: 'Medium', value: 'medium' },
                          { label: 'Low', value: 'low' }
                        ].map(item => (
                          <Field
                            className="flex items-center"
                            orientation={"horizontal"}
                            data-invalid={isInvalid}
                          >
                            <RadioGroupItem
                              id={item.value}
                              key={item.value}
                              value={item.value}
                              aria-invalid={isInvalid}
                            />
                            <FieldLabel htmlFor={item.value}>{item.label}</FieldLabel>
                          </Field>
                        ))
                      }
                      <FieldError errors={field.state.meta.errors} />
                    </RadioGroup>
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"}>Close</Button>
          </SheetClose>
          <Button type="submit" form="task-form">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet >
  )
}