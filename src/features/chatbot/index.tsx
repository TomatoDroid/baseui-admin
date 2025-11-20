'use client'

import { BookOpenIcon, LightbulbIcon, SparklesIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { PromptInputProvider } from '@/components/ai-elements/prompt-input'
import { ConfigDrawer } from '@/components/config-drawer'
import Header from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

import { DemoPromptInput } from './components/DemoPromptInput'
import { DemoSuggestionRow } from './components/DemoSuggestionRow'
import { TeachingNotes } from './components/TeachingNotes'
import { DemoMessageBubble } from './components/DemoMessageBubble'
import type { ChatStatus, FileUIPart } from 'ai'
import type { FormEvent } from 'react'
import type { PromptInputMessage } from '@/components/ai-elements/prompt-input'
import type { BundledLanguage } from 'shiki'
import type { DemoMessage, DemoTask, TeachingHighlight } from './types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const SAMPLE_SCREENSHOT: FileUIPart = {
  type: 'file',
  url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60',
  mediaType: 'image/jpeg',
  filename: 'sales-dashboard.png',
}

const CODE_LANGUAGE: BundledLanguage = 'ts'

const CODE_SNIPPET = `type Insight = {
  channel: string
  change: number
  summary: string
}

export function explain(insights: Insight[]) {
  return insights
    .sort((a, b) => b.change - a.change)
    .map((item, index) => {
      const emoji = item.change > 0 ? '📈' : '📉'
      return \`\${index + 1}. \${emoji} [\${item.channel}] \${item.summary}\`
    })
    .join('\\n')
}`.trim()

const INITIAL_MESSAGES: Array<DemoMessage> = [
  {
    id: 'user-kickoff',
    role: 'user',
    content:
      '这是本月的销售仪表盘截图，帮我用更具教学性的方式总结重点，并输出一个可以带着同学练习的计划。',
    attachments: [SAMPLE_SCREENSHOT],
  },
  {
    id: 'assistant-plan',
    role: 'assistant',
    content: `### 汇总结论

- 多渠道销售额环比 +18%，其中线下门店贡献 60%
- 广告投放 ROI 回升至 4.2，适合建立“投放调参”练习
- 供应链延迟依旧存在，需引导同学模拟应急流程

> 我已经根据截图做了初步拆解，下面是更详细的教学脚本。`,
    reasoning: `1. 先识别截图内的 KPI 与趋势；
2. 将结论映射到教学可用的练习；
3. 设计“讲解 + 实操”两个分轨内容。`,
    reasoningDuration: 4,
    branches: [
      `**版本 A：偏正式讲稿**

1. 现状复盘
2. 机会点拆分
3. 练习任务`,
      `**版本 B：对话式笔记**

- 先聊数据里最异常的地方
- 让同学自己推演改进方案
- 最后再补充标准答案`,
    ],
    codeSample: {
      snippet: CODE_SNIPPET,
      language: CODE_LANGUAGE,
    },
    tasks: [
      {
        title: '理解仪表盘',
        files: ['sales-dashboard.png'],
        steps: [
          '定位关键 KPI（销售额、ROI、库存周转）',
          '标记上升 VS 下降的维度',
          '思考这些数字可以衍生出哪些课堂练习',
        ],
      },
      {
        title: '设计教学脚本',
        steps: [
          '列出“讲解-示范-练习-回顾”四个阶段',
          '为每个阶段挑选一个最能利用图表的信息点',
        ],
      },
    ],
  },
]

const DEMO_SUGGESTIONS: Array<string> = [
  '按照 OKR 结构写一个引导语',
  '把刚才的计划转换成 30 分钟工作坊',
  '为初学者拆出 3 层提示词模板',
]

const TEACHING_HIGHLIGHTS: Array<TeachingHighlight> = [
  {
    title: '结构化对话',
    description:
      'Conversation + Message + Reasoning 组合展示“上下文 + 思考过程 + 多版本回应”。',
    icon: SparklesIcon,
  },
  {
    title: '输入输出一体化',
    description:
      'PromptInput 支持附件、快捷建议；Message 区域实时展示分支与代码。',
    icon: BookOpenIcon,
  },
  {
    title: '任务化拆解',
    description: 'Task 组件把回答拆成练习步骤，便于教学复用与跟进。',
    icon: LightbulbIcon,
  },
]

const createAssistantMessage = (prompt: string): DemoMessage => {
  const safePrompt = prompt.trim() || '这道题'

  return {
    id: `assistant-${nanoid(6)}`,
    role: 'assistant',
    content: `### 针对「${safePrompt}」的教学草稿

1. **引导问题**：让同学先描述他们看到的数据走势。
2. **示范推理**：现场展示如何把趋势映射为决策。
3. **实作练习**：提供一个空白模板，让同学填入自己的洞察。`,
    reasoning: `- 读取提问里的关键词，确认教学目标；
- 匹配现有的范例结构（引导 → 示范 → 实作）；
- 预留可以扩写的卡槽，方便再次编辑。`,
    reasoningDuration: 3,
    branches: [
      `**严谨版回应**

- 采用逐条编号，明确输入输出。
- 更适合录制课程或写操作手册。`,
      `**轻松版回应**

- 用 emoji 和口语化提示，提升参与感。
- 适合工作坊或内部分享场景。`,
    ],
    codeSample: {
      snippet: CODE_SNIPPET,
      language: CODE_LANGUAGE,
    },
    tasks: [
      {
        title: '课堂互动提示',
        steps: [
          '提出一个“观察 → 假设 → 验证”的问题链。',
          '准备 1-2 组反例，辅助说明。',
          '列出同学常犯的错误，方便即时反馈。',
        ],
      },
    ],
  }
}

export function ChatBot() {
  const [messages, setMessages] = useState<Array<DemoMessage>>(INITIAL_MESSAGES)
  const [status, setStatus] = useState<ChatStatus>()

  const runPrompt = useCallback(async ({ text, files }: PromptInputMessage) => {
    const trimmed = text.trim()
    if (!trimmed && files.length === 0) {
      return
    }

    setStatus('submitted')

    if (trimmed || files.length > 0) {
      const userMessage: DemoMessage = {
        id: `user-${nanoid(6)}`,
        role: 'user',
        content: trimmed || '（仅附件）',
        attachments: files,
      }
      setMessages((prev) => [...prev, userMessage])
    }

    await wait(900)
    setMessages((prev) => [...prev, createAssistantMessage(trimmed)])
    setStatus(undefined)
  }, [])

  const handlePromptSubmit = useCallback(
    async (payload: PromptInputMessage, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      await runPrompt(payload)
    },
    [runPrompt],
  )

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      void runPrompt({ text: suggestion, files: [] })
    },
    [runPrompt],
  )

  const hasMessages = messages.length > 0

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center gap-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className="flex flex-col gap-4 sm:gap-6" fixed>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI Elements</h2>
            <p className="text-muted-foreground">
              观察 AI 如何在一个对话框内完成「阅读上下文 → 展示推理 → 输出脚本 →
              给出练习」的闭环。
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <PromptInputProvider>
            <div className="space-y-4">
              <div className="relative flex h-[460px] flex-1 flex-col overflow-hidden rounded-xl border bg-muted/20 p-2">
                <Conversation className="h-full">
                  {hasMessages ? (
                    <ConversationContent>
                      {messages.map((message) => (
                        <DemoMessageBubble key={message.id} message={message} />
                      ))}
                    </ConversationContent>
                  ) : (
                    <ConversationEmptyState
                      icon={<SparklesIcon className="size-5" />}
                      title="还没有对话"
                      description="先写一句提示词或者丢一张图片试试。"
                    />
                  )}
                  <ConversationScrollButton />
                </Conversation>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  一键示范
                </p>
                <DemoSuggestionRow
                  suggestions={DEMO_SUGGESTIONS}
                  onRun={handleSuggestion}
                />
              </div>

              <DemoPromptInput status={status} onSubmit={handlePromptSubmit} />
            </div>
          </PromptInputProvider>
          <TeachingNotes teachingHighlights={TEACHING_HIGHLIGHTS} />
        </div>
      </Main>
    </>
  )
}

type DemoPromptInputProps = {
  status?: ChatStatus
  onSubmit: (
    payload: PromptInputMessage,
    event: FormEvent<HTMLFormElement>,
  ) => void | Promise<void>
}

