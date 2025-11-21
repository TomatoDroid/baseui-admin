'use client'

import type { FileUIPart, UIMessage } from 'ai'
import type { LucideIcon } from 'lucide-react'
import type { BundledLanguage } from 'shiki'

export type DemoTask = {
  title: string
  files?: Array<string>
  steps: Array<string>
}

export type DemoMessage = {
  id: string
  role: UIMessage['role']
  content: string
  attachments?: Array<FileUIPart>
  reasoning?: string
  reasoningDuration?: number
  codeSample?: {
    snippet: string
    language: BundledLanguage
  }
  branches?: Array<string>
  tasks?: Array<DemoTask>
}

export type DemoSuggestionRowProps = {
  suggestions: Array<string>
  onRun: (value: string) => void
}

