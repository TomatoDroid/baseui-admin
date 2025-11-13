import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  ref?: React.Ref<HTMLInputElement>
}
export function PasswordInput({
  className,
  disabled,
  ref,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("relative rounded-md", className)}>
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        disabled={disabled}
        className="absolute right-1 top-1/2 size-6 -translate-y-1/2"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  )
}