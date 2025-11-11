import { Settings } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function ConfigDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          aria-label="Open theme settings"
          aria-describedby="config-drawer-description"
          className="rounded-full"
        >
          <Settings aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className={'flex flex-col'}>
        <SheetHeader>
          <SheetTitle>Theme Settings</SheetTitle>
          <SheetDescription id="config-drawer-description">
            Adjust the appearance and layout to suit your preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">sheet</div>
        <SheetFooter>
          <Button
            variant={'destructive'}
            aria-label="Reset all settings to default values"
            onClick={() => {}}
          >
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
