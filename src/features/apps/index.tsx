import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import Header from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { getRouteApi } from '@tanstack/react-router'
import { ArrowDownZA, ArrowUpAZ, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { apps } from './data/apps'
import { cn } from '@/lib/utils'

const route = getRouteApi('/_authenticated/apps/')

type AppType = 'all' | 'connected' | 'notConnected'
const appText = new Map<AppType, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])

export function Apps() {
  const {
    type = 'all',
    filter = '',
    sort: initSort = 'asc',
  } = route.useSearch()

  const navigate = route.useNavigate()

  const [searchTerm, setSearchTerm] = useState(filter)
  const [appType, setAppType] = useState(type)
  const [sort, setSort] = useState(initSort)

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    )
    .filter((app) =>
      appType === 'connected'
        ? app.connected
        : appType === 'notConnected'
          ? !app.connected
          : true,
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    navigate({
      search: (prev) => ({
        ...prev,
        filter: e.target.value || undefined,
      }),
    })
  }

  const handleTypeChange = (value: AppType) => {
    setAppType(value)
    navigate({
      search: (prev) => ({
        ...prev,
        type: value === 'all' ? undefined : value,
      }),
    })
  }

  const handleSortChange = (value: 'asc' | 'desc') => {
    setSort(value)
    navigate({
      search: (prev) => ({
        ...prev,
        sort: value,
      }),
    })
  }

  return (
    <>
      <Header>
        <Search />
        <div className="ms-auto flex items-center gap-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            App Integrations
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s a list of your apps for the integration!
          </p>
        </div>
        <div className="my-4 flex items-center justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Filter apps..."
              className={'h-9 w-40 lg:w-48'}
              value={searchTerm}
              onChange={handleSearch}
            />
            <Select
              value={appType}
              onValueChange={(v) => handleTypeChange(v as AppType)}
            >
              <SelectTrigger className={'w-36'}>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Apps</SelectItem>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="notConnected">Not Connected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select
            value={sort}
            onValueChange={(v) => handleSortChange(v as 'asc' | 'desc')}
          >
            <SelectTrigger className={'w-16'}>
              <SelectValue>
                <SlidersHorizontal />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="asc">
                <div className="flex items-center gap-4">
                  <ArrowUpAZ />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value="desc">
                <div className="flex items-center gap-4">
                  <ArrowDownZA />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className={'shadow-sm'} />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-auto no-scrollbar faded-bottom pt-4 pb-16">
          {filteredApps.map((app) => (
            <li
              key={app.name}
              className="rounded-lg border p-4 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-8">
                <div>{app.logo}</div>
                <Button
                  variant={'outline'}
                  size={'sm'}
                  className={cn(
                    app.connected &&
                      'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900',
                  )}
                >
                  {app.connected ? 'Connected' : 'Connect'}
                </Button>
              </div>
              <div>
                <h2 className="mb-1 font-semibold">{app.name}</h2>
                <p className="line-clamp-2 text-gray-500">{app.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </>
  )
}
