import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projects, sections, site } from '../data/content'
import { scrollToId, useFocusTrap, useScrollLock } from '../lib/hooks'
import { useUI } from '../lib/ui'
import { ArrowRight, ArrowUpRight, Copy, Corner, Github, Linkedin, Mail, Search } from './ui/Icons'
import { EASE } from './ui/motion'

// ⌘K / Ctrl+K (or "/") opens a quick menu for jumping around the page,
// opening a project, or grabbing contact details without scrolling.
export default function CommandPalette() {
  const { paletteOpen: open, setPaletteOpen: setOpen } = useUI()

  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return <AnimatePresence>{open && <Palette onClose={() => setOpen(false)} />}</AnimatePresence>
}

function Palette({ onClose }) {
  const { copy, setActiveProject } = useUI()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const panelRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const listId = useId()
  useScrollLock(true)
  useFocusTrap(panelRef, true)

  const commands = useMemo(() => {
    const goTo = sections.map((s, i) => ({
      id: `go-${s.id}`,
      group: 'Go to',
      label: s.label,
      hint: String(i + 1).padStart(2, '0'),
      icon: <ArrowRight />,
      run: () => scrollToId(s.id),
    }))
    const open = projects.map((p, i) => ({
      id: `project-${p.id}`,
      group: 'Projects',
      label: p.name,
      hint: p.tagline,
      icon: <Corner />,
      keywords: p.stack.join(' '),
      run: () => {
        setActiveProject(i)
        const desktop = window.matchMedia('(min-width: 1024px)').matches
        scrollToId(desktop ? 'screening' : `project-${p.id}`)
      },
    }))
    const contact = [
      { id: 'copy-email', group: 'Contact', label: 'Copy email address', hint: site.email, icon: <Copy />, run: () => copy(site.email, 'Email address copied') },
      { id: 'email', group: 'Contact', label: 'Write an email', hint: site.email, icon: <Mail />, run: () => (window.location.href = `mailto:${site.email}`) },
      { id: 'linkedin', group: 'Contact', label: 'Open LinkedIn', hint: `in/${site.linkedinHandle}`, icon: <Linkedin />, run: () => window.open(site.linkedin, '_blank', 'noopener') },
      { id: 'github', group: 'Contact', label: 'Open GitHub', hint: `@${site.githubHandle}`, icon: <Github />, run: () => window.open(site.github, '_blank', 'noopener') },
    ]
    return [...goTo, ...open, ...contact]
  }, [copy, setActiveProject])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.hint} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => setIndex(0), [query])
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const run = (cmd) => {
    if (!cmd) return
    onClose()
    // Wait a frame so the page is scrollable again before jumping.
    requestAnimationFrame(() => requestAnimationFrame(cmd.run))
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[index])
    }
  }

  let lastGroup = null
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
        className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-paper/12 bg-ink-800 text-paper shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="flex items-center gap-3 border-b border-paper/10 px-4">
          <Search width={18} height={18} className="shrink-0 text-mist" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, open a project, copy my email…"
            className="h-14 w-full bg-transparent text-[16px] text-paper outline-none placeholder:text-mist/90"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            aria-autocomplete="list"
          />
          <button type="button" onClick={onClose} className="kbd shrink-0 border-paper/20 px-1.5 text-mist hover:text-paper">
            esc
          </button>
        </div>

        <ul ref={listRef} id={listId} role="listbox" aria-label="Commands" className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-10 text-center text-[15px] text-mist">Nothing matches “{query}”.</li>}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null
            lastGroup = cmd.group
            const on = i === index
            return (
              <li key={cmd.id} role="presentation">
                {header && <p className="eyebrow px-3 pb-1.5 pt-3 text-mist/90">{header}</p>}
                <div
                  id={`cmd-${cmd.id}`}
                  role="option"
                  aria-selected={on}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(cmd)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${on ? 'bg-paper/[0.08]' : ''}`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-[15px] ${on ? 'border-amber/50 text-amber' : 'border-paper/10 text-mist'}`}>
                    {cmd.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px]">{cmd.label}</span>
                  </span>
                  <span className="hidden max-w-[45%] truncate font-mono text-[11.5px] text-mist sm:block">{cmd.hint}</span>
                  {cmd.id === 'linkedin' || cmd.id === 'github' ? (
                    <ArrowUpRight width={15} height={15} className="shrink-0 text-mist" />
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between gap-4 border-t border-paper/10 px-4 py-2.5 font-mono text-[11px] text-mist/80">
          <span className="flex items-center gap-1.5">
            <span className="kbd border-paper/15">↑</span>
            <span className="kbd border-paper/15">↓</span> move
            <span className="kbd ml-2 border-paper/15">↵</span> open
          </span>
          <span>{results.length} results</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
