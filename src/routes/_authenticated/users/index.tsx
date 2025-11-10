import { Users } from '@/features/users'
import { roles } from '@/features/users/data/data'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const userSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z.array(z.union([z.literal("active"), z.literal("inactive"), z.literal("pending"), z.literal("banned")])).optional().catch([]),
  role: z.array(z.enum(roles.map(r => r.value as (typeof roles)[number]['value']))).optional().catch([]),
  username: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: userSearchSchema,
  component: Users,
})
