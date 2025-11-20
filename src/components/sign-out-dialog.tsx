import { useLocation, useNavigate } from '@tanstack/react-router'
import { ConfirmDialog } from './confirm-dialog'
import { useAuthStore } from '@/stores/auth-store'

type SignOutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const location = useLocation()

  const handleSignOut = () => {
    auth.reset()
    const currentPath = location.href
    navigate({
      to: '/sign-in',
      search: { redirect: currentPath },
      replace: true,
    })
  }
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign Out"
      desc="Are you sure you want to sign out? You will need to sign in again to access your account."
      confirmText="Sign out"
      destructive
      handleConfirm={handleSignOut}
      className="sm:max-w-sm"
    />
  )
}
