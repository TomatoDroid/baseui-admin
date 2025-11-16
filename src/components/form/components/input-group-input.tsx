import { useStore } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '../../ui/field'
import {
  InputGroup as InputGroupComponent,
  InputGroupInput as InputGroupInputComponent,
} from '../../ui/input-group'
import { useFieldContext } from '../form-context'
import { cloneElement, isValidElement, Children, Fragment } from 'react'

type InputGroupInputProps = React.ComponentProps<typeof InputGroupComponent> & {
  label: string
  children?: React.ReactNode
}

// Helper function to check if a component is InputGroupInput
function isInputGroupInput(element: React.ReactElement): boolean {
  return (
    isValidElement(element) &&
    (element.type === InputGroupInputComponent ||
      (typeof element.type === 'function' &&
        element.type.name === 'InputGroupInput'))
  )
}

// Recursively process children to find and enhance InputGroupInput
function enhanceChildren(
  children: React.ReactNode,
  field: ReturnType<typeof useFieldContext<string>>,
  isInvalid: boolean
): React.ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child
    }

    // Handle Fragment
    if (child.type === Fragment) {
      const fragmentProps = child.props as { children?: React.ReactNode }
      return (
        <Fragment key={child.key}>
          {enhanceChildren(fragmentProps.children, field, isInvalid)}
        </Fragment>
      )
    }

    // Handle InputGroupInput
    if (isInputGroupInput(child)) {
      const existingProps = child.props as React.ComponentProps<typeof InputGroupInputComponent>
      return cloneElement(child, {
        ...existingProps,
        autoComplete: 'off',
        'aria-invalid': isInvalid,
        id: field.name,
        name: field.name,
        value: field.state.value,
        onBlur: field.handleBlur,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          field.handleChange(e.target.value),
      } as React.ComponentProps<typeof InputGroupInputComponent>)
    }

    // Recursively process children if they exist
    const childProps = child.props as { children?: React.ReactNode } & Record<string, unknown>
    if (childProps.children) {
      return cloneElement(child, {
        ...(childProps as Record<string, unknown>),
        children: enhanceChildren(childProps.children, field, isInvalid),
      } as typeof childProps)
    }

    return child
  })
}

export default function InputGroup({ label, children, ...props }: InputGroupInputProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Process children to find and enhance InputGroupInput
  const enhancedChildren = children
    ? enhanceChildren(children, field, isInvalid)
    : [
        <InputGroupInputComponent
          key="default-input"
          autoComplete="off"
          aria-invalid={isInvalid}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />,
      ]

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputGroupComponent aria-invalid={isInvalid} {...props}>
        {enhancedChildren}
      </InputGroupComponent>
      <FieldError errors={errors} />
    </Field>
  )
}

