'use client'

import { Share2Icon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'

import type { DemoMessage } from '../types'
import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ai-elements/code-block'
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAttachment,
  MessageAttachments,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from '@/components/ai-elements/message'
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning'
import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from '@/components/ai-elements/task'

type DemoMessageBubbleProps = {
  message: DemoMessage
}

export function DemoMessageBubble({ message }: DemoMessageBubbleProps) {
  const hasBranches = Boolean(message.branches?.length)
  const hasAttachments = Boolean(message.attachments?.length)

  const actions = (
    <>
      <MessageAction tooltip="标记喜欢">
        <ThumbsUpIcon className="size-3.5" />
      </MessageAction>
      <MessageAction tooltip="标记需改进">
        <ThumbsDownIcon className="size-3.5" />
      </MessageAction>
      <MessageAction tooltip="分享给同学">
        <Share2Icon className="size-3.5" />
      </MessageAction>
    </>
  )

  return (
    <Message from={message.role}>
      <MessageContent className="max-w-full">
        {message.reasoning ? (
          <Reasoning
            defaultOpen={message.role === 'assistant'}
            duration={message.reasoningDuration}
            isStreaming={false}
          >
            <ReasoningTrigger />
            <ReasoningContent>{message.reasoning}</ReasoningContent>
          </Reasoning>
        ) : null}

        {hasBranches && message.branches ? (
          <MessageBranch className="space-y-4">
            <MessageBranchContent>
              {message.branches.map((branch, index) => (
                <div
                  key={`${message.id}-branch-${index}`}
                  className="space-y-3"
                >
                  <MessageResponse>{branch}</MessageResponse>
                </div>
              ))}
            </MessageBranchContent>
            <MessageToolbar>
              <MessageBranchSelector className="gap-0" from={message.role}>
                <MessageBranchPrevious />
                <MessageBranchPage />
                <MessageBranchNext />
              </MessageBranchSelector>
              <MessageActions>{actions}</MessageActions>
            </MessageToolbar>
          </MessageBranch>
        ) : (
          <>
            <MessageResponse>{message.content}</MessageResponse>
            <MessageActions>{actions}</MessageActions>
          </>
        )}

        {message.codeSample ? (
          <CodeBlock
            className="mt-4 text-sm"
            code={message.codeSample.snippet}
            language={message.codeSample.language}
            showLineNumbers
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        ) : null}

        {message.tasks?.map((task) => (
          <Task
            key={`${message.id}-${task.title}`}
            className="mt-4 border-l pl-3"
          >
            <TaskTrigger title={task.title} />
            <TaskContent>
              {task.files?.length ? (
                <div className="flex flex-wrap gap-2">
                  {task.files.map((file) => (
                    <TaskItemFile key={file}>{file}</TaskItemFile>
                  ))}
                </div>
              ) : null}
              {task.steps.map((step) => (
                <TaskItem key={`${task.title}-${step}`}>{step}</TaskItem>
              ))}
            </TaskContent>
          </Task>
        ))}
      </MessageContent>

      {hasAttachments && message.attachments ? (
        <MessageAttachments>
          {message.attachments.map((file, index) => (
            <MessageAttachment
              data={file}
              key={`${message.id}-attachment-${index}`}
            />
          ))}
        </MessageAttachments>
      ) : null}
    </Message>
  )
}
