import { SignUp } from '@/features/auth/sign-up'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
})
