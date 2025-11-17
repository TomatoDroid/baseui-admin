import { useAppForm } from '@/components/form'
import { Button } from '@/components/ui/button'
import { FieldDescription, FieldLabel, FieldSet, FieldTitle } from '@/components/ui/field'
import z from 'zod'

const items = [
  {
    value: 'recents',
    label: 'Recents',
  },
  {
    value: 'home',
    label: 'Home',
  },
  {
    value: 'applications',
    label: 'Applications',
  },
  {
    value: 'desktop',
    label: 'Desktop',
  },
  {
    value: 'downloads',
    label: 'Downloads',
  },
  {
    value: 'documents',
    label: 'Documents',
  },
] as const

const formSchema = z
  .object({
    recents: z.boolean(),
    home: z.boolean(),
    applications: z.boolean(),
    desktop: z.boolean(),
    downloads: z.boolean(),
    documents: z.boolean(),
  })
  .refine((data) => Object.values(data).some((value) => value === true), {
    message: 'Please select at least one item',
  })

export function DisplayForm() {
  const form = useAppForm({
    defaultValues: {
      recents: true,
      home: true,
      applications: false,
      desktop: false,
      downloads: false,
      documents: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      // 将对象转换为数组
      const selectedItems = items
        .filter((item) => data.value[item.value])
        .map((item) => item.value)
      console.log({ items: selectedItems })
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldSet>
        <FieldLabel>Items</FieldLabel>
        <FieldDescription>
          Select the items you want to display
        </FieldDescription>
        {items.map((item) => (
          <form.AppField
            key={item.value}
            name={item.value}
            children={(field) => <field.Checkbox label={item.label} />}
          />
        ))}
        <Button type="submit">Update display</Button>
      </FieldSet>
    </form>
  )
}
