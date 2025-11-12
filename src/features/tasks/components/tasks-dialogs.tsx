import { TasksMultiDrawer } from "./tasks-multi-drawer"
import { useTasks } from "./tasks-provider"

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks()
  return (
    <>
      <TasksMultiDrawer
        key={"task-create"}
        open={open === "create"}
        onOpenChange={() => {
          setOpen("create")
        }}
      />
      {
        currentRow && (
          <TasksMultiDrawer
            key={"task-edit"}
            open={open === "update"}
            currentRow={currentRow}
            onOpenChange={() => {
              setOpen("update")
              setTimeout(() => {
                setCurrentRow(null)
              }, 500);
            }}
          />
        )
      }
    </>
  )
}