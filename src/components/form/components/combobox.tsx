import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../../ui/field'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '../../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command'
import { cn } from '@/lib/utils'
import { useFieldContext } from '../form-context'
import { useState } from 'react'

type ComboboxProps = {
  label: string
  placeholder?: string
  options: {
    label: string
    value: string
  }[]
}

export default function Combobox({ label, placeholder, options }: ComboboxProps) {
  const field = useFieldContext<string>()
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
            role="combobox"
            aria-expanded={open}
            aria-invalid={isInvalid}
            className="w-56 justify-between font-normal"
          >
            {field.state.value
              ? options.find((option) => option.value === field.state.value)?.label
              : placeholder || 'Select an option'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      field.handleChange(currentValue === field.state.value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        field.state.value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FieldError errors={errors} />
    </Field>
  )
}

