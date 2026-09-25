import { useState } from 'react'
import { motion } from 'motion/react'

/*
  Masthead cover: magazine front-page layout (folio line, huge nameplate,
  hairline rules, three-column deck) on navy with amber accents, set in
  light-weight Fraunces with italic emphasis.
*/

const ease = [0.22, 1, 0.36, 1]
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const nav = [['About', 'about'], ['Resume', 'resume'], ['Work', 'work'], ['Contact', 'contact']]

export default function Cover() {
  const [open, setOpen] = useState(false)

  return (
    <section data-navtheme="dark" className="relative min-h-screen bg-navy text-paper px-6 lg:px-12 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Folio line */}
        <motion.div {...rise(0)} className="flex items-center justify-between gap-6 pt-7 pb-4 border-b border-paper/25 text-[11px] sm:text-xs tracking-[0.18em] uppercase">
          <span className="text-paper/60">Portfolio <span className="text-amber">·</span> Issue 2026</span>
          <nav className="hidden md:flex gap-8">
            {nav.map(([label, id]) => (
              <button key={id} onClick={() => go(id)} className="link-underline uppercase text-paper/75 hover:text-paper">{label}</button>
            ))}
          </nav>
          <span className="hidden md:block text-paper/60">Orlando, FL</span>
          <button className="md:hidden uppercase" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? 'Close' : 'Menu'}
          </button>
        </motion.div>
        {open && (
          <nav className="md:hidden flex flex-col gap-3 py-5 border-b border-paper/20">
            {nav.map(([label, id], i) => (
              <button key={id} onClick={() => go(id)} className="text-left font-display font-light text-2xl flex items-baseline gap-4">
                <span className="font-mono text-xs text-amber">0{i + 1}</span>{label}
              </button>
            ))}
          </nav>
        )}

        {/* Nameplate */}
        <div className="flex-1 flex items-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease }}
            className="font-name tracking-[-0.03em] leading-[0.85] w-full"
            style={{ fontSize: 'clamp(4.25rem, 16.5vw, 15.5rem)' }}
          >
            <span className="font-normal">Acsah</span><br />
            <span className="italic font-normal text-amber pl-[0.6em]">Lukose.</span>
          </motion.h1>
        </div>

        {/* Deck */}
        <motion.div {...rise(0.6)} className="grid grid-cols-1 md:grid-cols-3 border-t border-paper/25 mb-8">
          <div className="py-5 md:pr-8 md:border-r border-paper/15">
            <p className="eyebrow text-paper/50"><span className="font-mono text-amber mr-2">01</span>In brief</p>
            <p className="font-display font-light text-xl leading-snug">
              Software engineer and CS Honors student at UCF, building <span className="italic">full-stack and mobile</span> products.
            </p>
          </div>
          <div className="py-5 md:px-8 md:border-r border-paper/15 border-t md:border-t-0">
            <p className="eyebrow text-paper/50"><span className="font-mono text-amber mr-2">02</span>Currently</p>
            <p className="text-sm leading-relaxed text-paper/70">
              TA for Computer Science I · Senior design on Vitality, a health platform for older adults.
            </p>
          </div>
          <div className="py-5 md:pl-8 border-t md:border-t-0 border-paper/15">
            <p className="eyebrow text-paper/50"><span className="font-mono text-amber mr-2">03</span>Previously</p>
            <p className="text-sm leading-relaxed text-paper/70">
              Software Engineering Intern, BNY.{' '}
              <a href="mailto:lukoseacsah@gmail.com" className="link-underline text-amber">Say hello&nbsp;→</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
