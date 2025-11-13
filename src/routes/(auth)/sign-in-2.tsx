import { SignIn2 } from '@/features/auth/sign-in/sign-in-2'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-in-2')({
  component: SignIn2,
})
