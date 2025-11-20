import { createFileRoute } from '@tanstack/react-router'
import { ChatBot } from '@/features/chatbot'

export const Route = createFileRoute('/_authenticated/chatbot/')({
  component: ChatBot,
})

