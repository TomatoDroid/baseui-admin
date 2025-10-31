import { ConfirmDialog } from "./confirm-dialog";

type SignOutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  return (
    <ConfirmDialog />
  )
}