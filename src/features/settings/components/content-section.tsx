import { PropsWithChildren } from 'react'
import { Separator } from '@/components/ui/separator'

type ContentSectionProps = {
  title: string
  desc: string
}

export function ContentSection({
  title,
  desc,
  children,
}: PropsWithChildren<ContentSectionProps>) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-none">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>
      <Separator className="my-4 flex-none" />
      <div className="faded-bottom h-full w-full overflow-y-auto scroll-smooth pb-20 pe-4">
        <div className='-mx-1 px-1.5 lg:max-w-xl'>{children}</div>
      </div>
    </div>
  )
}
