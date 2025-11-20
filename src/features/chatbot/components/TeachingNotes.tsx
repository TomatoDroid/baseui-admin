'use client'

import type { TeachingHighlight } from '../types'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type TeachingNotesProps = {
  teachingHighlights: Array<TeachingHighlight>
}

export function TeachingNotes({ teachingHighlights }: TeachingNotesProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>教学拆解</CardTitle>
        <CardDescription>
          右侧卡片总结了这个示例里使用到的核心组件与教学亮点，你可以按图索骥地拆分自己的项目。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teachingHighlights.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-lg border bg-muted/10 p-3"
          >
            <item.icon className="mt-1 size-5 text-primary" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        <div className="rounded-lg border bg-background p-3">
          <Badge variant="secondary" className="mb-2">
            使用到的 AI Elements
          </Badge>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Conversation · Message · Reasoning · CodeBlock · Task · Suggestion ·
            PromptInput —— 基本覆盖了一个教学型聊天产品最常见的交互。
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

