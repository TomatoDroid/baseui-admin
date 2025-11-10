import { useDialogState } from "@/hooks/use-dialog-state";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { User } from "../data/schema";

type UsersDialogType = "invite" | "add" | "edit" | "delete"

type UsersContextType = {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: Dispatch<SetStateAction<User | null>>
}

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}