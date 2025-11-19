import { getCookie, removeCookie, setCookie } from '@/lib/cookies'
import { createContext, useContext, useState } from 'react'

export type Variant = 'inset' | 'sidebar' | 'floating'
export type Collapsible = 'offcanvas' | 'icon' | 'none'

// Cookie constants following the pattern from sidebar.tsx
const LAYOUT_COLLAPSIBLE_COOKIE_NAME = 'layout_collapsible'
const LAYOUT_VARIANT_COOKIE_NAME = 'layout_variant'
const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Default values
const DEFAULT_VARIANT = 'inset'
const DEFAULT_COLLAPSIBLE = 'icon'

type LayoutContextType = {
  resetLayout: () => void

  defaultCollapsible: Collapsible
  collapsible: Collapsible
  setCollapsible: (collapsible: Collapsible) => void

  defaultVariant: Variant
  variant: Variant
  setVariant: (variant: Variant) => void
}

const LayoutContext = createContext<LayoutContextType | null>(null)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [collapsible, _setCollapsible] = useState(() => {
    const saved = getCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME)
    return (saved as Collapsible) || DEFAULT_COLLAPSIBLE
  })

  const [variant, _setVariant] = useState(() => {
    const saved = getCookie(LAYOUT_VARIANT_COOKIE_NAME)
    return (saved as Variant) || DEFAULT_VARIANT
  })

  const setCollapsible = (collapsible: Collapsible) => {
    setCollapsible(collapsible)
    setCookie(
      LAYOUT_COLLAPSIBLE_COOKIE_NAME,
      collapsible,
      LAYOUT_COOKIE_MAX_AGE,
    )
  }

  const setVariant = (variant: Variant) => {
    _setVariant(variant)
    setCookie(LAYOUT_VARIANT_COOKIE_NAME, variant, LAYOUT_COOKIE_MAX_AGE)
  }

  const resetLayout = () => {
    _setCollapsible(DEFAULT_COLLAPSIBLE)
    _setVariant(DEFAULT_VARIANT)
    removeCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME)
    removeCookie(LAYOUT_VARIANT_COOKIE_NAME)
  }

  const contextValue: LayoutContextType = {
    resetLayout,
    defaultCollapsible: DEFAULT_COLLAPSIBLE,
    collapsible,
    setCollapsible,
    defaultVariant: DEFAULT_VARIANT,
    variant,
    setVariant,
  }

  return <LayoutContext value={contextValue}>{children}</LayoutContext>
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
