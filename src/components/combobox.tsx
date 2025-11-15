import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { cn } from '@/lib/utils'
import { HTMLAttributes, useState } from 'react'

type ComboboxProps = HTMLAttributes<HTMLDivElement> & {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  options: {
    label: string
    value: string
  }[]
  id?: string
  name?: string
  onBlur?: () => void
  'aria-invalid'?: boolean
}

export function Combobox({
  value,
  onValueChange,
  placeholder,
  options,
  id,
  name,
  // 'aria-invalid': ariaInvalid,
}: ComboboxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          variant="outline"
          className="w-56 justify-between font-normal"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? '' : currentValue)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
