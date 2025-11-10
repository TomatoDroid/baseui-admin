import { ConfigDrawer } from "@/components/config-drawer";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { getRouteApi } from "@tanstack/react-router";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersProvider } from "./components/users-provider";
import { UsersTable } from "./components/users-table";
import { users } from "./data/users";

const route = getRouteApi("/_authenticated/users/")
export function Users() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className="flex items-center gap-4 ms-auto">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="">
            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
            <p className="text-muted-foreground">
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <UsersTable data={users}  search={search} navigate={navigate} />
      </Main>
      <UsersDialogs />
    </UsersProvider>
  )
}