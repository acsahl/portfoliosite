import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from '../components/ui/Icons'
import { copyText } from './hooks'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [toast, setToast] = useState(null)
  const timer = useRef(0)

  const notify = useCallback((message) => {
    clearTimeout(timer.current)
    setToast({ message, key: Date.now() })
    timer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  const copy = useCallback(
    async (text, message = 'Copied to clipboard') => {
      const ok = await copyText(text)
      notify(ok ? message : 'Couldn’t copy. Select the text instead.')
      return ok
    },
    [notify],
  )

  const value = useMemo(
    () => ({ paletteOpen, setPaletteOpen, activeProject, setActiveProject, notify, copy }),
    [paletteOpen, activeProject, notify, copy],
  )

  return (
    <UIContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.key}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 rounded-full border border-paper/15 bg-ink-800/95 py-2.5 pl-3 pr-4 text-sm text-paper shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-amber text-ink">
                <Check width={13} height={13} strokeWidth={2.4} />
              </span>
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)
