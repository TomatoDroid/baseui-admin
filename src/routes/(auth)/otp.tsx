import { Otp } from '@/features/auth/otp'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/otp')({
  component: Otp,
})
