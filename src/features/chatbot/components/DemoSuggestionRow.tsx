'use client'

import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { usePromptInputController } from '@/components/ai-elements/prompt-input'

type DemoSuggestionRowProps = {
  suggestions: Array<string>
  onRun: (value: string) => void
}

export function DemoSuggestionRow({
  suggestions,
  onRun,
}: DemoSuggestionRowProps) {
  const controller = usePromptInputController()

  return (
    <Suggestions className="gap-2">
      {suggestions.map((suggestion) => (
        <Suggestion
          key={suggestion}
          suggestion={suggestion}
          onClick={(value) => {
            controller.textInput.setInput(value)
            onRun(value)
          }}
        />
      ))}
    </Suggestions>
  )
}

