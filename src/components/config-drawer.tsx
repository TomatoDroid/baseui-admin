import type { SVGProps } from 'react'
import { CircleCheck, RotateCcw, Settings } from 'lucide-react'
import { Root as Radio, Item } from '@radix-ui/react-radio-group'

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
import { useSidebar } from './ui/sidebar'

import { useTheme } from '@/context/theme-provider'
import { Collapsible, useLayout } from '@/context/layout-provider'
import { useDirection } from '@/context/direction-provider'
import { cn } from '@/lib/utils'

import { IconThemeSystem } from '@/assets/custom/icon-theme-system'
import { IconThemeLight } from '@/assets/custom/icon-theme-light'
import { IconThemeDark } from '@/assets/custom/icon-theme-dark'
import { IconSidebarSidebar } from '@/assets/custom/icon-sidebar-sidebar'
import { IconSidebarFloating } from '@/assets/custom/icon-sidebar-floating'
import { IconSidebarInset } from '@/assets/custom/icon-sidebar-inset'
import { IconLayoutDefault } from '@/assets/custom/icon-layout-default'
import { IconLayoutFull } from '@/assets/custom/icon-layout-full'
import { IconLayoutCompact } from '@/assets/custom/icon-layout-compact'
import { IconDir } from '@/assets/custom/icon-dir'

// 配置常量
const THEME_OPTIONS = [
  {
    value: 'system',
    label: 'System',
    icon: IconThemeSystem,
  },
  {
    value: 'light',
    label: 'Light',
    icon: IconThemeLight,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: IconThemeDark,
  },
] as const

const SIDEBAR_OPTIONS = [
  {
    value: 'inset',
    label: 'Inset',
    icon: IconSidebarInset,
  },
  {
    value: 'floating',
    label: 'Floating',
    icon: IconSidebarFloating,
  },
  {
    value: 'sidebar',
    label: 'Sidebar',
    icon: IconSidebarSidebar,
  },
] as const

const LAYOUT_OPTIONS = [
  {
    value: 'none',
    label: 'None',
    icon: IconLayoutDefault,
  },
  {
    value: 'icon',
    label: 'Icon',
    icon: IconLayoutCompact,
  },
  {
    value: 'offcanvas',
    label: 'Offcanvas',
    icon: IconLayoutFull,
  },
] as const

export function ConfigDrawer() {
  const { resetTheme } = useTheme()
  const { resetLayout } = useLayout()
  const { resetDir, dir } = useDirection()
  const { setOpen } = useSidebar()
  
  const side = dir === 'rtl' ? 'left' : 'right'

  const handleReset = () => {
    resetTheme()
    resetLayout()
    resetDir()
    setOpen(true)
  }
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
      <SheetContent className={'flex flex-col'} side={side}>
        <SheetHeader>
          <SheetTitle>Theme Settings</SheetTitle>
          <SheetDescription id="config-drawer-description">
            Adjust the appearance and layout to suit your preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 space-y-4">
          <ThemeConfig />
          <SidebarConfig />
          <LayoutConfig />
          <DirConfig />
        </div>
        <SheetFooter>
          <Button
            variant={'destructive'}
            aria-label="Reset all settings to default values"
            onClick={handleReset}
          >
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function ThemeConfig() {
  const { defaultTheme, theme, setTheme } = useTheme()

  return (
    <div>
      <SectionTitle
        title="Theme"
        showReset={theme !== defaultTheme}
        onReset={() => {
          setTheme(defaultTheme)
        }}
      />
      <Radio
        value={theme}
        onValueChange={setTheme}
        aria-label="Select theme preference"
        aria-describedby="theme-description"
        className="grid w-full max-w-md grid-cols-3 gap-4"
      >
        {THEME_OPTIONS.map((themeOption) => (
          <RadioGroupItem
            key={themeOption.value}
            item={themeOption}
            isTheme={true}
          />
        ))}
      </Radio>
    </div>
  )
}

interface SectionTitleProps {
  title: string
  showReset?: boolean
  onReset?: () => void
  className?: string
}

function SectionTitle({
  title,
  showReset,
  onReset,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'text-muted-foreground mb-2 flex items-center gap-2 text-sm font-semibold',
        className,
      )}
    >
      <h3>{title}</h3>
      {showReset && (
        <Button
          variant={'secondary'}
          size={'icon'}
          className="size-4 rounded-full"
          onClick={onReset}
        >
          <RotateCcw className="size-3" />
        </Button>
      )}
    </div>
  )
}

interface RadioGroupItemProps {
  item: {
    value: string
    label: string
    icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement
  }
  isTheme?: boolean
}

function RadioGroupItem({ item, isTheme = false }: RadioGroupItemProps) {
  return (
    <Item
      value={item.value}
      className={cn('group outline-none')}
      aria-label={`Select ${item.label.toLowerCase()}`}
      aria-describedby={`${item.value}-description`}
    >
      <div
        className={cn(
          'ring-border relative rounded-[6px] ring-[1px]',
          'group-data-[state=checked]:ring-primary group-data-[state=checked]:shadow-2xl',
          'group-focus-visible:ring-2',
        )}
      >
        <CircleCheck
          className={cn(
            'fill-primary size-6 stroke-white',
            'group-data-[state=unchecked]:hidden',
            'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2',
          )}
          aria-hidden="true"
        />
        <item.icon
          className={cn(
            !isTheme &&
              'stroke-primary fill-primary group-data-[state=unchecked]:stroke-muted-foreground group-data-[state=unchecked]:fill-muted-foreground',
          )}
          aria-hidden="true"
        />
      </div>
      <div
        className="mt-1 text-xs"
        id={`${item.value}-description`}
        aria-live="polite"
      >
        {item.label}
      </div>
    </Item>
  )
}

function SidebarConfig() {
  const { defaultVariant, variant, setVariant } = useLayout()
  return (
    <div>
      <SectionTitle
        title="Sidebar"
        showReset={variant !== defaultVariant}
        onReset={() => {
          setVariant(defaultVariant)
        }}
      />
      <Radio
        value={variant}
        onValueChange={setVariant}
        aria-label="Select sidebar variant"
        aria-describedby="sidebar-description"
        className="grid w-full max-w-md grid-cols-3 gap-4"
      >
        {SIDEBAR_OPTIONS.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id="sidebar-description" className="sr-only">
        Choose between inset, floating, or standard sidebar layout
      </div>
    </div>
  )
}

function LayoutConfig() {
  const { setOpen, open } = useSidebar()
  const { defaultCollapsible, collapsible, setCollapsible } = useLayout()
  const radioState = open ? 'none' : collapsible

  return (
    <div>
      <SectionTitle
        title="Layout"
        showReset={radioState !== 'none'}
        onReset={() => {
          setCollapsible(defaultCollapsible)
          setOpen(true)
        }}
      />
      <Radio
        value={radioState}
        onValueChange={(value) => {
          if (value === 'none') {
            setOpen(true)
            return
          }
          setCollapsible(value as Collapsible)
          setOpen(false)
        }}
        aria-label="Select layout preference"
        aria-describedby="layout-description"
        className="grid w-full max-w-md grid-cols-3 gap-4"
      >
        {LAYOUT_OPTIONS.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id="layout-description" className="sr-only">
        Choose between default expanded, compact icon-only, or full layout mode
      </div>
    </div>
  )
}
function DirConfig() {
  const { defaultDir, dir, setDir } = useDirection()
  return (
    <div>
      <SectionTitle
        title="Direction"
        showReset={defaultDir !== dir}
        onReset={() => setDir(defaultDir)}
      />
      <Radio
        value={dir}
        onValueChange={setDir}
        className="grid w-full max-w-md grid-cols-3 gap-4"
        aria-label="Select site direction"
        aria-describedby="direction-description"
      >
        {[
          {
            value: 'ltr',
            label: 'Left to Right',
            icon: (props: SVGProps<SVGSVGElement>) => (
              <IconDir dir="ltr" {...props} />
            ),
          },
          {
            value: 'rtl',
            label: 'Right to Left',
            icon: (props: SVGProps<SVGSVGElement>) => (
              <IconDir dir="rtl" {...props} />
            ),
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id="direction-description" className="sr-only">
        Choose between left-to-right or right-to-left site direction
      </div>
    </div>
  )
}
