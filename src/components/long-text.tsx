import { cn } from "@/lib/utils";
import { PropsWithChildren, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverPositioner, PopoverTrigger } from "./base/popover";
import { Tooltip, TooltipContent, TooltipPositioner, TooltipProvider, TooltipTrigger } from "./base/tooltip";

type LongTextProps = PropsWithChildren<{
  className?: string
  contentClassName?: string
}>

export function LongText({ children, className, contentClassName }: LongTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isOverflown, setIsOverflown] = useState(false)

  const refCallback = (node: HTMLDivElement | null) => {
    ref.current = node
    if (node && checkOverflow(node)) {
      queueMicrotask(() => setIsOverflown(true))
    }
  }

  if (!isOverflown) {
    return (
      <div className={cn("truncate", className)} ref={refCallback}>
        {children}
      </div>
    )
  }

  return (
    <>
      <div className='hidden sm:block'>
        <TooltipProvider delay={0}>
          <Tooltip>
            <TooltipTrigger
              render={
                <div ref={refCallback} className={cn('truncate', className)}>
                  {children}
                </div>
              }
            />
            <TooltipPositioner>
              <TooltipContent>
                <p className={contentClassName}>{children}</p>
              </TooltipContent>
            </TooltipPositioner>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='sm:hidden'>
        <Popover>
          <PopoverTrigger
            render={
              <div ref={refCallback} className={cn('truncate', className)}>
                {children}
              </div>
            }
          />
          <PopoverPositioner>
            <PopoverContent className={cn('w-fit', contentClassName)}>
              <p>{children}</p>
            </PopoverContent>
          </PopoverPositioner>
        </Popover>
      </div>
    </>
  )
}

function checkOverflow(textContainer: HTMLDivElement | null) {
  debugger
  if (textContainer) {
    return (
      textContainer.offsetHeight < textContainer.scrollHeight ||
      textContainer.offsetWidth < textContainer.scrollWidth
    )
  }
  return false
}