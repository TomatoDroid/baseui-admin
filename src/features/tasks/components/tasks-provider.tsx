import { useDialogState } from "@/hooks/use-dialog-state"
import React, { useContext } from "react"
import { Task } from "../data/schema"

type TaskDialogType = "create" | "update" | "delete" | "import"

type TasksContextType = {
  open: TaskDialogType | null
  setOpen: (str: TaskDialogType) => void
  currentRow: Task | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>
}

const TasksContext = React.createContext<TasksContextType | null>(null)

export function TasksProvider({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useDialogState<TaskDialogType>(null)
  const [currentRow, setCurrentRow] = React.useState<Task | null>(null)
  return (
    <TasksContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TasksContext>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error("useTasks must be used within a TasksContext")
  }
  return context
}