import { motion } from 'motion/react'
import { TextEffect } from './motion-primitives/text-effect'

export default function Cover() {
  return (
    <section data-navtheme="dark" className="relative min-h-screen bg-navy overflow-hidden px-6 lg:px-12 pt-20 flex flex-col">
      {/* "Portfolio" demoted to a small rotated spine label instead of the headline */}
      <span
        aria-hidden="true"
        className="hidden sm:block absolute left-3 top-1/2 font-mono text-xs tracking-[0.3em] text-amber/50 select-none"
        style={{ transform: 'translateY(-50%) rotate(-90deg) translateX(-50%)', transformOrigin: 'left center' }}
      >
        PORTFOLIO — 2026
      </span>

      <div className="max-w-7xl mx-auto w-full relative flex-1 flex flex-col justify-center">
        <TextEffect
          as="h1"
          per="word"
          preset="fade-in-blur"
          speedReveal={1.1}
          speedSegment={1.2}
          className="font-display font-bold text-paper"
          style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', lineHeight: 0.95 }}
        >
          Acsah Lukose
        </TextEffect>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        >
          <p className="text-paper/70 text-sm sm:text-base max-w-xs leading-relaxed">
            I like solving problems with code and shipping things people actually use.
          </p>
          <div className="font-mono text-sm text-paper/85 space-y-1.5">
            <p><span className="text-amber">GH:</span> /acsahl</p>
            <p><span className="text-amber">LI:</span> /acsah-lukose</p>
            <p><span className="text-amber">EM:</span> lukoseacsah@gmail.com</p>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mx-auto mb-10 flex flex-col items-center gap-2 text-paper/60 hover:text-paper transition-colors"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-paper/30 flex items-center justify-center text-amber"
        >
          ↓
        </motion.span>
      </motion.button>
    </section>
  )
}
