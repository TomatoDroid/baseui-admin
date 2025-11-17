import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context'
import { lazy } from 'react'

const Input = lazy(() => import('./components/input.tsx'))
const Password = lazy(() => import('./components/password.tsx'))
const Textarea = lazy(() => import('./components/textarea.tsx'))
const InputOTP = lazy(() => import('./components/input-otp.tsx'))
const Select = lazy(() => import('./components/select.tsx'))
const RadioGroup = lazy(() => import('./components/radio-group.tsx'))
const Combobox = lazy(() => import('./components/combobox.tsx'))
const DataPicker = lazy(() => import('./components/data-picker.tsx'))
const Checkbox = lazy(() => import('./components/checkbox.tsx'))
const Switch = lazy(() => import('./components/switch.tsx'))
const InputGroup = lazy(() => import('./components/input-group-input.tsx'))

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
    Password,
    Textarea,
    InputOTP,
    Select,
    RadioGroup,
    Combobox,
    DataPicker,
    Checkbox,
    Switch,
    InputGroup,
  },
  formComponents: {},
  fieldContext,
  formContext,
})
