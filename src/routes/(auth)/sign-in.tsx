import { SignIn } from '@/features/auth/sign-in'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const searchSchema = z.object({
  redirect: z.string().optional().catch(''),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  validateSearch: searchSchema,
  component: SignIn,
})
