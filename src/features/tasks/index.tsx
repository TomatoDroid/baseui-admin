import { ConfigDrawer } from "@/components/config-drawer";
import Header from "@/components/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import TasksPrimaryButtons from "./components/tasks-primary-buttons";
import { TasksProvider } from "./components/tasks-provider";

export function Tasks() {
  return (
    <TasksProvider>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center gap-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
            <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
          </div>
          <TasksPrimaryButtons />
        </div>
      </Main>
    </TasksProvider>
  )
}