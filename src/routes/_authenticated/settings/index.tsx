import { SettingsProfile } from '@/features/settings/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsProfile,
})
