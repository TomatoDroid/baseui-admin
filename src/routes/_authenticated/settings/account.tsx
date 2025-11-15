import { SettingsAccount } from '@/features/settings/account'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/account')({
  component: SettingsAccount,
})
