import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Separator } from "./base/separator";
import { SidebarTrigger } from "./ui/sidebar";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}
export default function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [offset, setOffset] = useState(0)

  return (
    <header className={cn(
      "z-10 h-16",
      fixed && "sticky top-0 w-[inherit]",
      offset > 0 && fixed ? "shadow" : "shadow-none",
      className,
    )}>
      <div className={cn(
        "flex h-full items-center gap-3 p-4 sm:gap-4"
      )}>
        <SidebarTrigger variant={"outline"} className="max-md:scale-125"/>
        <Separator className={"h-6"} orientation="vertical" />
        {children}
      </div>
    </header>
  )
}
