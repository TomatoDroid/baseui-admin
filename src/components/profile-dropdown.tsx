import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function ProfileDropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant={'ghost'} className="size-8 relative">
              <Avatar className="size-8">
                <AvatarImage src="/avatar.jpg" alt="User avatar" />
                <AvatarFallback>LZ</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
        <DropdownMenuPositioner align="end">
          <DropdownMenuContent className={'w-56'}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm leading-none font-medium">Tomato</p>
                  <p className="text-muted-foreground text-xs leading-none">
                    770226915@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link to="/settings">
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link to="/settings">
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link to="/settings">
                    Setting
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                }
              />
              <DropdownMenuItem>new Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive' onClick={() => {}}>
              Sign out
              <DropdownMenuShortcut className='text-current'>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPositioner>
      </DropdownMenu>
    </>
  )
}
