import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context'
import { lazy } from 'react'

const Input = lazy(() => import('./input.tsx'))
const Password = lazy(() => import('./password.tsx'))

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
    Password,
  },
  formComponents: {},
  fieldContext,
  formContext,
})
