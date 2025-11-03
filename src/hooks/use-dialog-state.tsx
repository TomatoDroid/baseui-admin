import React from "react"

export function useDialogState<T extends string | boolean>(initialState: T | null = null) {
  const [open, _setOpen] = React.useState(initialState)

  const setOpen = (str: T | null) => _setOpen((prev) => prev === str ? null : str)

  return [open, setOpen] as const
}