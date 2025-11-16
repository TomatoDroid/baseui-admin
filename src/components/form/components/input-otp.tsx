import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  InputOTP as InputOTPComponent,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { useFieldContext } from '../form-context'

type InputOTPProps = {
  label: string
  length?: number
  groups?: number[]
}

export default function InputOTP({ label, length = 6, groups }: InputOTPProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // 根据分组配置渲染 slots
  const renderSlots = () => {
    // 优先使用 groups 配置
    if (groups && groups.length > 0) {
      let currentIndex = 0
      const result: React.ReactNode[] = []

      groups.forEach((groupLength, groupIndex) => {
        // 添加分组
        result.push(
          <InputOTPGroup key={`group-${groupIndex}`}>
            {Array.from({ length: groupLength }).map((_, slotIndex) => (
              <InputOTPSlot
                key={currentIndex + slotIndex}
                index={currentIndex + slotIndex}
              />
            ))}
          </InputOTPGroup>,
        )

        currentIndex += groupLength

        // 如果不是最后一组，添加分隔符
        if (groupIndex < groups.length - 1) {
          result.push(<InputOTPSeparator key={`separator-${groupIndex}`} />)
        }
      })

      return <>{result}</>
    }

    // 无分隔符的情况：所有 slots 在一组
    return (
      <InputOTPGroup>
        {Array.from({ length }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    )
  }

  // 计算实际的 maxLength：如果使用 groups，使用 groups 的总和；否则使用 length
  const actualMaxLength =
    groups && groups.length > 0
      ? groups.reduce((sum, group) => sum + group, 0)
      : length

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputOTPComponent
        id={field.name}
        name={field.name}
        maxLength={actualMaxLength}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      >
        {renderSlots()}
      </InputOTPComponent>
      <FieldError errors={errors} />
    </Field>
  )
}
