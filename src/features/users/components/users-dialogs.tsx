import { UsersActionDialog } from "./users-action-dialog"
import { useUsers } from "./users-provider"

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
      <UsersActionDialog
        key={"user-add"}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {
        currentRow && (
          <>
            <UsersActionDialog
              key={"user-edit"}
              open={open === "edit"}
              onOpenChange={() => {
                setOpen("edit")
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500);
              }}
              currentRow={currentRow}
            />
          </>
        )
      }
    </>
  )
}