import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sections, site } from '../data/content'
import { scrollToId, useFocusTrap, useScrollLock, useSectionUnderNav } from '../lib/hooks'
import { useUI } from '../lib/ui'
import { ArrowUpRight, Close, Search } from './ui/Icons'
import { EASE } from './ui/motion'

export const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

export default function Nav() {
  const { id: activeId, theme, progress } = useSectionUnderNav(36)
  const { setPaletteOpen } = useUI()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mac, setMac] = useState(true)

  useEffect(() => {
    setMac(isMac())
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = theme !== 'light'
  const go = (id) => {
    setMenuOpen(false)
    // Let the menu close before scrolling so focus lands in the right place.
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header
        className={`no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ease-out
          ${dark ? 'text-paper' : 'text-ink'}
          ${scrolled ? (dark ? 'border-b border-paper/10 bg-ink-900/80 backdrop-blur-md' : 'border-b border-ink/10 bg-paper/85 backdrop-blur-md') : 'border-b border-transparent'}`}
      >
        <nav aria-label="Primary" className="page flex h-[var(--nav-h)] items-center justify-between gap-6">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
            }}
            className="font-display text-[21px] leading-none tracking-[-0.01em]"
          >
            {site.first} <span className={`italic ${dark ? 'text-amber' : 'text-amber-700'}`}>{site.last}</span>
            <span className="sr-only">, back to top</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((s, i) => {
              const active = activeId === s.id
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(s.id)
                    }}
                    aria-current={active ? 'location' : undefined}
                    className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[14px] transition-colors duration-300
                      ${active ? '' : dark ? 'text-paper/70 hover:text-paper' : 'text-ink/65 hover:text-ink'}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full ${dark ? 'bg-paper/10' : 'bg-ink/[0.07]'}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className={`relative font-mono text-[10px] ${active ? (dark ? 'text-amber' : 'text-amber-700') : dark ? 'text-paper/60' : 'text-ink/65'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="relative">{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className={`hidden h-9 items-center gap-2 rounded-full border px-3 text-[13px] transition-colors sm:flex
                ${dark ? 'border-paper/15 text-paper/75 hover:border-paper/40 hover:text-paper' : 'border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink'}`}
              aria-keyshortcuts={mac ? 'Meta+K' : 'Control+K'}
            >
              <Search width={15} height={15} aria-hidden="true" />
              <span className="sr-only">Open command menu</span>
              <span className="font-mono text-[11px] tracking-wide">{mac ? '⌘K' : 'Ctrl K'}</span>
            </button>
            <a
              href={`mailto:${site.email}`}
              className="hidden h-9 items-center gap-1.5 rounded-full bg-amber px-4 text-[14px] font-medium text-ink transition-[transform,background-color] duration-300 hover:-translate-y-px hover:bg-amber-300 md:flex"
            >
              Email me
              <ArrowUpRight width={15} height={15} />
            </a>
            <button
              type="button"
              className={`flex h-9 items-center rounded-full border px-4 text-[14px] lg:hidden ${dark ? 'border-paper/20' : 'border-ink/20'}`}
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </nav>
        <div
          aria-hidden="true"
          className="absolute bottom-[-1px] left-0 h-px origin-left bg-amber"
          style={{ width: '100%', transform: `scaleX(${progress})` }}
        />
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu activeId={activeId} onClose={() => setMenuOpen(false)} onGo={go} onPalette={() => { setMenuOpen(false); setPaletteOpen(true) }} />}
      </AnimatePresence>
    </>
  )
}

function MobileMenu({ activeId, onClose, onGo, onPalette }) {
  const ref = useRef(null)
  useScrollLock(true)
  useFocusTrap(ref, true)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    ref.current?.querySelector('button')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="grain fixed inset-0 z-[60] flex flex-col bg-ink-900 text-paper lg:hidden"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="page flex h-[var(--nav-h)] items-center justify-between">
        <span className="font-display text-[21px]">
          {site.first} <span className="italic text-amber">{site.last}</span>
        </span>
        <button type="button" onClick={onClose} className="flex h-9 items-center gap-2 rounded-full border border-paper/20 px-4 text-[14px]">
          <Close width={14} height={14} /> Close
        </button>
      </div>
      <nav aria-label="Mobile" className="page flex flex-1 flex-col justify-center">
        <ol className="border-t border-paper/15">
          {sections.map((s, i) => (
            <motion.li
              key={s.id}
              className="border-b border-paper/15"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE }}
            >
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onGo(s.id)
                }}
                className="flex items-baseline gap-5 py-4 font-display text-[clamp(2.4rem,11vw,3.5rem)] leading-none"
                aria-current={activeId === s.id ? 'location' : undefined}
              >
                <span className="font-mono text-[12px] text-amber">{String(i + 1).padStart(2, '0')}</span>
                <span className={activeId === s.id ? 'italic text-amber' : ''}>{s.label}</span>
              </a>
            </motion.li>
          ))}
        </ol>
      </nav>
      <div className="page flex flex-wrap items-center gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
        <a href={`mailto:${site.email}`} className="flex h-11 items-center gap-2 rounded-full bg-amber px-5 font-medium text-ink">
          Email me <ArrowUpRight width={16} height={16} />
        </a>
        <button type="button" onClick={onPalette} className="flex h-11 items-center gap-2 rounded-full border border-paper/20 px-5">
          <Search width={16} height={16} /> Command menu
        </button>
      </div>
    </motion.div>
  )
}
