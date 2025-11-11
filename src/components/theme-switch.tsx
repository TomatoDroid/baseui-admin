import { CheckIcon, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPositioner,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/theme-provider'
import { useEffect } from 'react'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {

  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={'ghost'}
            size={'icon'}
            className="scale-95 rounded-full"
          >
            <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        }
      />
      <DropdownMenuPositioner align="end">
        <DropdownMenuContent className={"z-100"}>
          <DropdownMenuItem
            onClick={() => {
              setTheme('light')
            }}
          >
            Light
            <CheckIcon
              className={cn('ms-auto', theme !== 'light' && 'hidden')}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme('dark')
            }}
          >
            Dark
            <CheckIcon
              className={cn('ms-auto', theme !== 'dark' && 'hidden')}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme('system')
            }}
          >
            System
            <CheckIcon
              className={cn('ms-auto', theme !== 'system' && 'hidden')}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPositioner>
    </DropdownMenu>
  )
}
