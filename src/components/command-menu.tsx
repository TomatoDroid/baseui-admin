import { useSearch } from "@/context/search-provider";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from "lucide-react";
import { useCallback } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { sidebarData } from "./layout/data/sidebar-data";
export function CommandMenu() {
  const navigate = useNavigate()
  const { open, setOpen } = useSearch()

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [setOpen])

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <ScrollArea className={"h-72 pe-1"}>
          <CommandEmpty>No results found</CommandEmpty>
          {
            sidebarData.navGroups.map((group) => (
              <CommandGroup key={group.title} heading={group.title}>
                {
                  group.items.map((navItem, i) => {
                    if (navItem.url) {
                      return (
                        <CommandItem
                          key={`${navItem.url}-${i}`}
                          value={navItem.title}
                          onSelect={() => runCommand(() => navigate({ to: navItem.url }))}
                        >
                          <div className="">
                            <ArrowRight className="text-muted-foreground/80"/>
                          </div>
                          {navItem.title}
                        </CommandItem>
                      )
                    }

                    return navItem.items?.map((subItem, i) => (
                      <CommandItem
                        key={`${navItem.title}-${subItem.title}-${i}}`}
                      >
                        <div>
                          <ArrowRight />
                        </div>
                        {navItem.title}
                        <ChevronRight />
                        {subItem.title}
                      </CommandItem>
                    ))
                  })
                }
              </CommandGroup>
            ))
          }
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem>
              <Sun />
              <span>Light</span>
            </CommandItem>
            <CommandItem>
              <Moon />
              <span>Dark</span>
            </CommandItem>
            <CommandItem>
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}