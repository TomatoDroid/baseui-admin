import { ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPositioner, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../base/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Team } from "./types";

type TeamSwitcherProps = {
  teams: Team[]
}
export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const [activeTeam, setActiveTeam] = useState(teams[0])
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton>
              <div>
                <activeTeam.logo />
              </div>
              <div>
                <span>
                  {activeTeam.name}
                </span>
                <span>
                  {activeTeam.plan}
                </span>
              </div>
              <ChevronsUpDown className="" />
            </SidebarMenuButton>
          }>
          </DropdownMenuTrigger>
          <DropdownMenuPositioner align="end" side="right" className={"z-10"}>
            <DropdownMenuContent className="min-w-56 rounded-lg">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Teams</DropdownMenuLabel>
                {
                  teams.map((team, index) => (
                    <DropdownMenuItem key={team.name}>
                      <div>
                        <team.logo className="h-5 w-5" />
                      </div>
                      {team.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div>
                  <Plus className="size-4" />
                </div>
                <div>Add Item</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}