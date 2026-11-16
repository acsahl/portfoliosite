import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

// Wall-clock time in a given zone, refreshed on the minute.
export function useZonedTime(timeZone) {
  const format = useCallback(() => {
    const now = new Date()
    const time = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
    }).format(now)
    const zone =
      new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
        .formatToParts(now)
        .find((p) => p.type === 'timeZoneName')?.value ?? ''
    return { time, zone }
  }, [timeZone])

  const [value, setValue] = useState(format)
  useEffect(() => {
    let timer
    const tick = () => {
      setValue(format())
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50)
    }
    tick()
    return () => clearTimeout(timer)
  }, [format])
  return value
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older Safari, or a page without clipboard permission.
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand('copy')
    el.remove()
    return ok
  }
}

// Which [data-section] element sits under a horizontal probe line near the top
// of the viewport. Drives the nav's colour and its active link.
export function useSectionUnderNav(probe = 40) {
  const [state, setState] = useState({ id: null, theme: 'dark', progress: 0 })
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const nodes = document.querySelectorAll('[data-section]')
      let current = null
      for (const node of nodes) {
        const rect = node.getBoundingClientRect()
        if (rect.top <= probe && rect.bottom > probe) current = node
      }
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setState((prev) => {
        const id = current?.dataset.section ?? null
        const theme = current?.dataset.theme ?? 'dark'
        if (prev.id === id && prev.theme === theme && Math.abs(prev.progress - progress) < 0.001) return prev
        return { id, theme, progress }
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [probe])
  return state
}

// Locks page scroll while an overlay is open, without the layout jump.
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

// Keeps keyboard focus inside `ref` while active, and restores it afterwards.
export function useFocusTrap(ref, active) {
  const returnTo = useRef(null)
  useEffect(() => {
    if (!active) return
    returnTo.current = document.activeElement
    const node = ref.current
    const focusable = () =>
      Array.from(
        node?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null)
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      returnTo.current?.focus?.({ preventScroll: true })
    }
  }, [ref, active])
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  // Move focus for keyboard and screen-reader users without a second jump.
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

// Resolves once the display fonts are ready, or after `timeout` ms at most.
export function useFontsReady(timeout = 900) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        setReady(true)
      }
    }
    const timer = setTimeout(finish, timeout)
    document.fonts?.ready.then(finish, finish)
    if (!document.fonts) finish()
    return () => clearTimeout(timer)
  }, [timeout])
  return ready
}
