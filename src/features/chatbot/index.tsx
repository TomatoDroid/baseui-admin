'use client'

import { SparklesIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'

import { DemoMessageBubble } from './components/DemoMessageBubble'
import { DemoPromptInput } from './components/DemoPromptInput'
import { DemoSuggestionRow } from './components/DemoSuggestionRow'
import {
  DEMO_SUGGESTIONS,
  INITIAL_MESSAGES,
  createAssistantMessage,
} from './data'
import type { DemoMessage } from './types'
import type { ChatStatus } from 'ai'
import type { FormEvent } from 'react'
import type { PromptInputMessage } from '@/components/ai-elements/prompt-input'
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
import { sleep } from '@/lib/utils'

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

    await sleep(900)
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
      <Main className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI Elements</h2>
            <p className="text-muted-foreground">
              观察 AI 如何在一个对话框内完成「阅读上下文 → 展示推理 → 输出脚本 →
              给出练习」的闭环。
            </p>
          </div>
        </div>
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
      </Main>
    </>
  )
}
