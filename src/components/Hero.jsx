import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { coverLines, ledger, site } from '../data/content'
import { scrollToId, useFinePointer, useFontsReady, useZonedTime } from '../lib/hooks'
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin } from './ui/Icons'
import { Counter, EASE, Reveal } from './ui/motion'

export default function Hero() {
  const fontsReady = useFontsReady()
  const { time, zone } = useZonedTime(site.timeZone)
  const stageRef = useRef(null)

  return (
    <>
      <section
        id="top"
        data-section="top"
        data-theme="dark"
        aria-label="Introduction"
        ref={stageRef}
        className="grain relative overflow-hidden bg-ink-900 text-paper"
      >
        <Lamp stageRef={stageRef} />
        <div className="page relative flex min-h-[min(100svh,90vw)] flex-col pb-10 pt-[calc(var(--nav-h)+1.5rem)] max-sm:min-h-[100svh] lg:pb-12">
          <motion.div
            className="eyebrow flex items-center justify-between gap-4 text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="flex items-center gap-2.5 whitespace-nowrap text-paper/85">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-signal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {site.status}
            </span>
            <span className="hidden whitespace-nowrap lg:block">Portfolio — 2026 edition</span>
            <span className="hidden whitespace-nowrap sm:block">
              {site.location} · <span className="nums">{time}</span> {zone}
            </span>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="mt-4 h-px origin-left bg-paper/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          />

          <div className="relative mt-auto pt-[var(--gap)] [--gap:clamp(1.25rem,4svh,2.5rem)]">
            <h1
              className="relative mb-2 font-display font-normal leading-[0.84] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(4.4rem, min(17.2vw, 27.5svh), 16.5rem)' }}
            >
              <span className="sr-only">{site.name}</span>
              <VariableLine text={site.first} show={fontsReady} delay={0.15} />
              <VariableLine
                text={`${site.last}.`}
                show={fontsReady}
                delay={0.32}
                className="pl-[0.62em] italic text-amber sm:pl-[1.05em]"
              />
            </h1>
            <CoverLines show={fontsReady} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 border-t border-paper/15 pt-7 lg:mt-[clamp(1.25rem,3svh,2.5rem)] lg:grid-cols-12 lg:gap-10 lg:pt-[clamp(1.25rem,2.8svh,2rem)]">
            <motion.p
              className="text-pretty font-display text-[clamp(1.3rem,min(2.15vw,3.4svh),2.05rem)] leading-[1.28] text-paper/90 lg:col-span-7"
              initial={{ opacity: 0, y: 18 }}
              animate={fontsReady ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            >
              I’m a software engineer finishing a CS Honors degree at UCF. At BNY, I built a generative-AI agent that{' '}
              <Marker delay={1.15} show={fontsReady}>cut redemption-request processing time in half</Marker>. Now I’m leading a
              five-person team building <Marker delay={1.5} show={fontsReady}>a fall-risk platform for older adults</Marker>.
            </motion.p>

            <motion.div
              className="flex flex-col justify-end gap-5 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9"
              initial={{ opacity: 0, y: 18 }}
              animate={fontsReady ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            >
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-amber px-6 font-medium text-ink transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Email me
                  <ArrowUpRight width={17} height={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId('work')
                  }}
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-paper/25 px-6 text-paper transition-colors duration-300 hover:border-paper/60"
                >
                  See the work
                  <ArrowDown width={17} height={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>
              <div className="flex items-center gap-5 text-[15px] text-mist">
                <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-paper">
                  <Github width={17} height={17} /> GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-paper">
                  <Linkedin width={17} height={17} /> LinkedIn
                </a>
                <span className="sm:hidden">
                  {site.location}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Ledger />
    </>
  )
}

// "In this issue": the chapters, set like the cover lines of a magazine in the
// space beside the first name. Wide screens only; the nav covers the rest.
function CoverLines({ show }) {
  return (
    <motion.nav
      aria-label="In this issue"
      className="absolute right-0 top-[calc(var(--gap)+0.75rem)] hidden w-[19rem] xl:block"
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : undefined}
      transition={{ duration: 0.8, delay: 0.75 }}
    >
      <p className="eyebrow flex items-center gap-3 text-mist">
        In this issue
        <span aria-hidden="true" className="h-px flex-1 bg-paper/15" />
      </p>
      <ol className="mt-2">
        {coverLines.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.85 + i * 0.07, ease: EASE }}
          >
            <a
              href={`#${c.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(c.id)
              }}
              className="group flex items-baseline gap-4 border-b border-paper/10 py-2.5"
            >
              <span className="nums w-5 shrink-0 font-mono text-[11px] text-amber">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 font-display text-[18px] leading-snug text-paper/80 transition-colors duration-300 group-hover:text-paper">
                {c.line}
              </span>
              <ArrowRight
                width={15}
                height={15}
                aria-hidden="true"
                className="shrink-0 self-center text-amber opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </a>
          </motion.li>
        ))}
      </ol>
    </motion.nav>
  )
}

// One line of the nameplate. Letters rise in on load; on a desktop pointer,
// letters near the cursor gain weight, like ink pooling under a lamp.
function VariableLine({ text, show, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <span aria-hidden="true" className={`block whitespace-nowrap ${className}`}>
      <span className="mask-line" style={{ overflowClipMargin: '0.2em' }}>
        {Array.from(text).map((ch, i) => (
          <motion.span
            key={i}
            data-vf=""
            className="inline-block"
            initial={reduce ? false : { y: '105%' }}
            animate={show ? { y: '0%' } : undefined}
            transition={{ duration: 1.15, delay: delay + i * 0.045, ease: EASE }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  )
}

// Drives the cursor "lamp": a soft amber glow that follows the pointer, and the
// weight of each nameplate letter by its distance from it. Pure DOM writes in
// one rAF loop, so React never re-renders while the pointer moves.
function Lamp({ stageRef }) {
  const glowRef = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()

  useEffect(() => {
    const stage = stageRef.current
    const glow = glowRef.current
    if (!stage || !glow || !fine || reduce) return

    const letters = Array.from(stage.querySelectorAll('[data-vf]'))
    const weights = letters.map(() => 400)
    const target = { x: -9999, y: -9999, active: false }
    const pos = { x: stage.clientWidth * 0.7, y: stage.clientHeight * 0.45 }
    let frame = 0
    let running = false

    const step = () => {
      frame = 0
      let moving = false
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      if (Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5) moving = true
      glow.style.transform = `translate3d(${pos.x - 450}px, ${pos.y - 450}px, 0)`

      const radius = Math.max(220, stage.clientWidth * 0.2)
      // Measure everything first, then write, so the browser lays out once.
      const s = stage.getBoundingClientRect()
      const centers = letters.map((el) => {
        const r = el.getBoundingClientRect()
        return [r.left - s.left + r.width / 2, r.top - s.top + r.height / 2]
      })
      letters.forEach((el, i) => {
        const d = Math.hypot(centers[i][0] - pos.x, centers[i][1] - pos.y)
        const pull = target.active ? Math.max(0, 1 - d / radius) : 0
        const goal = 400 + 380 * pull * pull * (3 - 2 * pull)
        const next = weights[i] + (goal - weights[i]) * 0.14
        if (Math.abs(next - weights[i]) > 0.4) moving = true
        weights[i] = next
        el.style.fontVariationSettings = `'wght' ${next.toFixed(1)}`
      })

      if (moving) frame = requestAnimationFrame(step)
      else running = false
    }
    const kick = () => {
      if (!running) {
        running = true
        frame = requestAnimationFrame(step)
      }
    }
    const onMove = (e) => {
      const s = stage.getBoundingClientRect()
      target.x = e.clientX - s.left
      target.y = e.clientY - s.top
      target.active = true
      glow.style.opacity = '1'
      kick()
    }
    const onLeave = () => {
      target.active = false
      glow.style.opacity = '0'
      kick()
    }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      letters.forEach((el) => (el.style.fontVariationSettings = "'wght' 400"))
    }
  }, [stageRef, fine, reduce])

  return (
    <>
      {/* Resting light, so the page has depth before anyone moves a mouse. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] top-[12%] h-[70vmax] w-[70vmax] rounded-full opacity-60"
        style={{ background: 'radial-gradient(closest-side, rgba(240,166,58,0.10), rgba(240,166,58,0.03) 55%, transparent)' }}
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[900px] w-[900px] rounded-full opacity-0 transition-opacity duration-700"
        style={{ background: 'radial-gradient(closest-side, rgba(240,166,58,0.13), rgba(240,166,58,0.04) 50%, transparent)' }}
      />
    </>
  )
}

// An amber highlighter stroke that draws itself under a phrase.
function Marker({ children, delay = 0, show }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className="text-paper [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: 'linear-gradient(rgba(240,166,58,0.30), rgba(240,166,58,0.30))',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 88%',
      }}
      initial={{ backgroundSize: reduce ? '100% 0.32em' : '0% 0.32em' }}
      animate={show ? { backgroundSize: '100% 0.32em' } : undefined}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  )
}

// Column rules for the 1 → 2 → 4 column ledger grid.
const LEDGER_CELL = [
  'sm:pr-6',
  'sm:border-l sm:pl-6',
  'sm:pr-6 lg:border-l lg:pl-6',
  'sm:border-l sm:pl-6',
]

function Ledger() {
  return (
    <section data-section="top" data-theme="dark" aria-labelledby="ledger-title" className="grain relative bg-ink-900 text-paper">
      <div className="page pb-20 pt-6 lg:pb-28">
        <h2 id="ledger-title" className="sr-only">
          By the numbers
        </h2>
        <ol className="grid grid-cols-1 border-t border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {ledger.map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delay={i * 0.08}
              className={`flex flex-col gap-4 border-b border-paper/15 py-8 lg:border-b-0 lg:py-10 ${LEDGER_CELL[i]}`}
            >
              <span className="eyebrow text-mist">{item.source}</span>
              <Counter
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                className="nums font-display text-[clamp(3.6rem,6.2vw,5.6rem)] leading-[0.9] tracking-[-0.03em] text-paper"
              />
              <p className="max-w-[30ch] text-pretty text-[15px] leading-relaxed text-mist">{item.label}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
