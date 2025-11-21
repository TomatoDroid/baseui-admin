'use client'

import type { ChatStatus, FileUIPart } from 'ai'
import type { FormEvent } from 'react'

import type { PromptInputMessage } from '@/components/ai-elements/prompt-input'
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input'

type DemoPromptInputProps = {
  status?: ChatStatus
  onSubmit: (
    payload: PromptInputMessage,
    event: FormEvent<HTMLFormElement>,
  ) => void | Promise<void>
}

export function DemoPromptInput({ status, onSubmit }: DemoPromptInputProps) {
  return (
    <PromptInput
      accept="image/*"
      maxFiles={3}
      maxFileSize={5 * 1024 * 1024}
      multiple
      onSubmit={onSubmit}
    >
      <PromptInputHeader>
        <PromptInputAttachments>
          {(file) => <PromptInputAttachment data={file} key={file.id} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea
          autoFocus={false}
          placeholder="描述你想讲的主题、贴上截图或直接贴提示词。按 Enter 发送，Shift + Enter 换行。"
          disabled={status === 'submitted'}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger aria-label="更多操作" />
            <PromptInputActionMenuContent align="start">
              <PromptInputActionAddAttachments label="添加截图或文件" />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          <PromptInputButton
            className="text-xs font-semibold text-muted-foreground"
            size="sm"
            variant="ghost"
          >
            模板库
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit
          aria-label="发送对话"
          status={status}
          variant="default"
        />
      </PromptInputFooter>
    </PromptInput>
  )
}
