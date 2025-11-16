import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { ChevronDownIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { Button } from '../ui/button'
import { format } from 'date-fns'
import { useFieldContext } from './form-context'
import { useState } from 'react'

type DataPickerProps = {
  label: string
  placeholder?: string
}

export default function DataPicker({ label, placeholder }: DataPickerProps) {
  const field = useFieldContext<Date | undefined>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const [open, setOpen] = useState(false)

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          field.handleBlur()
        }
      }}>
        <PopoverTrigger asChild>
          <Button
            id={field.name}
            name={field.name}
            variant="outline"
            aria-invalid={isInvalid}
            className="w-48 justify-between font-normal"
          >
            {field.state.value ? (
              format(field.state.value, 'yyyy-MM-dd')
            ) : (
              <span>{placeholder || 'Select a date'}</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            captionLayout="dropdown"
            onSelect={(date) => {
              field.handleChange(date)
              setOpen(false)
            }}
            disabled={(date: Date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
          />
        </PopoverContent>
      </Popover>
      <FieldError errors={errors} />
    </Field>
  )
}

