import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})
