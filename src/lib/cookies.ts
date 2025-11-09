/**
 * Cookie utility functions using manual document.cookie approach
 * Replaces js-cookie dependency for better consistency
 */

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function getCookie(name: string) {
  if (typeof document === 'undefined') return undefined

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

export function setCookie(
  name: string,
  value: string,
  maxAge: number = DEFAULT_MAX_AGE,
) {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`
}

export function removeCookie(name: string) {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=; max-age=0; path=/`
}
