import { motion } from 'motion/react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Hello() {
  return (
    <section id="about" data-navtheme="light" className="relative bg-paper px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-display font-bold text-navy" style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', lineHeight: 1 }}>
            Hello,<br />I'm Acsah!
          </h2>
          <p className="mt-8 text-navy/70 leading-relaxed max-w-md">
            I'm a self-taught-leaning, formally-trained Software Engineering student at UCF.
            I like taking a problem apart, building the smallest working version, and then
            making it good. Placeholder bio — gets rewritten from the resume.
          </p>
          <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
            className="pill inline-flex items-center gap-2 mt-8 px-5 py-2.5 text-sm font-medium bg-navy text-paper hover:bg-navy-light transition-colors">
            github.com/acsahl
          </a>
        </motion.div>

        {/* Right — code-window panel + contact stamp, standing in for a photo */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto w-full">
          <span className="absolute -top-5 left-6 pill px-4 py-1.5 text-xs font-mono font-medium bg-amber text-navy z-10">
            Open to opportunities
          </span>

          <div className="rounded-2xl bg-navy overflow-hidden shadow-xl">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="ml-2 text-xs font-mono text-paper/40">acsah.js</span>
            </div>
            <pre className="p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
<span className="text-paper/40">{'// currently'}</span>{'\n'}
<span className="text-cobalt">const</span> <span className="text-amber">acsah</span> = {'{'}
{'\n  '}<span className="text-paper/70">role</span>: <span className="text-paper">'CS student, UCF'</span>,
{'\n  '}<span className="text-paper/70">building</span>: <span className="text-paper">true</span>,
{'\n  '}<span className="text-paper/70">focus</span>: [<span className="text-paper">'full-stack'</span>, <span className="text-paper">'mobile'</span>],
{'\n'}{'}'}
            </pre>
          </div>

          <div className="rounded-2xl bg-navy-light mt-4 p-6">
            <p className="font-display font-semibold text-paper text-lg mb-3">Contact</p>
            <div className="space-y-2 text-sm text-paper/80">
              <p>📍 Orlando, FL</p>
              <p>✉️ lukoseacsah@gmail.com</p>
              <p>🔗 linkedin.com/in/acsah-lukose</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
