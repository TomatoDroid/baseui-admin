import { createContext, useContext, useEffect, useState } from 'react'
import { fonts } from '@/config/fonts'
import { getCookie, removeCookie, setCookie } from '@/lib/cookies'

type Font = (typeof fonts)[number]

type FontProviderState = {
  font: Font
  setFont: (font: Font) => void
  resetFont: () => void
}

const FONT_COOKIE_NAME = 'font'
const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

const FontContext = createContext<FontProviderState | null>(null)

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, _setFont] = useState(() => {
    const savedFont = getCookie(FONT_COOKIE_NAME)
    return fonts.includes(savedFont as Font) ? (savedFont as Font) : fonts[0]
  })

  useEffect(() => {
    const applyFont = (currentFont: Font) => {
      const root = window.document.documentElement
      root.classList.remove(...fonts.map((font) => `font-${font}`))
      root.classList.add(`font-${currentFont}`)
    }
    applyFont(font)
  }, [font])

  const setFont = (font: Font) => {
    setCookie(FONT_COOKIE_NAME, font, FONT_COOKIE_MAX_AGE)
    _setFont(font)
  }

  const resetFont = () => {
    removeCookie(FONT_COOKIE_NAME)
    _setFont(fonts[0])
  }

  const contextValue = {
    font,
    setFont,
    resetFont,
  }

  return <FontContext value={contextValue}>{children}</FontContext>
}

export function useFont() {
  const ctx = useContext(FontContext)
  if (!ctx) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return ctx
}
