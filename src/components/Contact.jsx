import { motion } from 'motion/react'

export default function Contact() {
  return (
    <section id="contact" data-navtheme="dark" className="relative bg-navy overflow-hidden px-6 lg:px-12 py-28 lg:py-40">
      <p aria-hidden="true"
        className="ghost-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-amber/20 select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: 'clamp(4rem, 16vw, 12rem)' }}>
        CONTACT
      </p>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-center relative">
        <p className="font-mono text-xs tracking-widest mb-4 text-amber">GET IN TOUCH</p>
        <h2 className="font-display font-bold text-paper mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.05 }}>
          Let's build something.
        </h2>
        <p className="text-paper/60 mb-10 max-w-md mx-auto">
          Whether you have a role, a project, or just want to connect — reach out.
        </p>

        <a href="mailto:lukoseacsah@gmail.com"
          className="pill btn-primary inline-flex items-center gap-2 px-8 py-3.5 font-medium text-sm">
          lukoseacsah@gmail.com →
        </a>

        <div className="mt-10 flex items-center justify-center gap-6">
          <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
            className="text-sm text-paper/60 hover:text-paper transition-colors">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/acsah-lukose" target="_blank" rel="noopener noreferrer"
            className="text-sm text-paper/60 hover:text-paper transition-colors">LinkedIn ↗</a>
        </div>
      </motion.div>
    </section>
  )
}
