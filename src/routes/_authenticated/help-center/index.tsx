import { ComingSoon } from '@/components/comming-soon'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/help-center/')({
  component: ComingSoon,
})

