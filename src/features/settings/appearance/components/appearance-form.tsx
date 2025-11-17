import { useAppForm } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import z from 'zod'
import { fonts } from '@/config/fonts'
import { useTheme } from '@/context/theme-provider'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { useFont } from '@/context/font-provider'

const formSchema = z.object({
  font: z.enum(fonts),
  theme: z.enum(['light', 'dark']),
})

export function AppearanceForm() {
  const { font, setFont } = useFont()
  const { theme, setTheme } = useTheme()
  const form = useAppForm({
    defaultValues: {
      font: font,
      theme: theme === 'dark' ? 'dark' : 'light',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (data) => {
      if (data.value.font !== font) {
        setFont(data.value.font as any)
      }
      if (data.value.theme !== theme) {
        setTheme(data.value.theme as any)
      }
      showSubmittedData(data.value)
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
      <FieldGroup>
        <form.AppField
          name="font"
          children={(field) => (
            <field.Select
              label="Font"
              options={fonts.map((font) => ({ label: font, value: font }))}
            />
          )}
        />
        <form.AppField
          name="theme"
          children={(field) => (
            <FieldSet>
              <FieldLabel>Theme</FieldLabel>
              <FieldDescription>
                Select the theme for your application
              </FieldDescription>
              <RadioGroup
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
                className="grid grid-cols-2 gap-8"
              >
                <FieldLabel>
                  <Field
                    orientation={'horizontal'}
                    className="flex items-center"
                  >
                    <FieldContent>
                      <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-xs">
                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                    </FieldContent>
                    <RadioGroupItem value="light">Light</RadioGroupItem>
                  </Field>
                </FieldLabel>
                <FieldLabel>
                  <Field
                    orientation={'horizontal'}
                    className="flex items-center"
                  >
                    <FieldContent>
                      <div className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1">
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
                            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                    </FieldContent>
                    <RadioGroupItem value="dark">Dark</RadioGroupItem>
                  </Field>
                </FieldLabel>
              </RadioGroup>
            </FieldSet>
          )}
        />
        <Button type="submit">Update preferances</Button>
      </FieldGroup>
    </form>
  )
}
