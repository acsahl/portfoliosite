// Option B: full-width case-study rows, video and text alternating sides.
import { motion } from 'motion/react'
import { projects } from './data'
import VideoSlot from './VideoSlot'
import Header, { TechList } from './Header'

export default function CaseStudyLayout() {
  return (
    <section id="work" data-navtheme="light" className="bg-paper px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <motion.article key={p.name}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-14 border-t border-navy/10">
              <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                <VideoSlot src={p.video} label={p.name} />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
                <p className="font-mono text-xs text-amber-dark mb-3">0{i + 1} — {p.year}</p>
                <h3 className="font-display font-bold text-navy mb-2" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.1 }}>
                  {p.name} {p.highlight && <span className="text-xl align-middle">🏆</span>}
                </h3>
                <p className="font-display italic text-navy/70 text-lg mb-4">{p.tagline}</p>
                <p className="text-navy/60 leading-relaxed mb-6">{p.desc}</p>
                <div className="mb-6"><TechList tech={p.tech} /></div>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="link-underline text-sm font-medium text-navy">View on GitHub →</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
