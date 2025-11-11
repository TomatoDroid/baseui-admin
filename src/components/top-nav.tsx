import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPositioner, DropdownMenuTrigger } from "./ui/dropdown-menu";

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links: {
    title: string
    href: string
    isActive: boolean
    disabled?: boolean
  }[]
}
export function TopNav({ className, links, ...props }: TopNavProps) {
  return (
    <>
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button className="md:size-7" variant={"outline"} size={"icon"}>
                <Menu />
              </Button>
            }
          />
          <DropdownMenuPositioner side="bottom" align="start">
            <DropdownMenuContent>
              {
                links.map((link) => (
                  <DropdownMenuItem
                    key={`${link.title}-${link.href}`}
                    render={
                      <Link to={link.href} disabled={link.disabled} className={!link.isActive ? "text-muted-foreground" : ""}>
                        {link.title}
                      </Link>
                    }
                  />
                ))
              }
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>
      </div>
      <nav className={cn(
        "hidden lg:flex items-center gap-4 xl:gap-6",
        className,
        { ...props }
      )}>
        {
          links.map((link) => (
            <Link
              to={link.href}
              key={`${link.title}-${link.href}`}
              disabled={link.disabled}
              className={cn(
                "hover:text-primary text-sm font-medium transition-colors cursor-pointer",
                !link.isActive && "text-muted-foreground"
              )}
            >
              {link.title}
            </Link>
          ))
        }
      </nav>
    </>
  )
}