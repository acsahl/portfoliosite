// Option A: two-column grid of cards. Each card's video plays on hover.
import { motion } from 'motion/react'
import { projects } from './data'
import VideoSlot from './VideoSlot'
import Header, { TechList } from './Header'

export default function GridLayout() {
  return (
    <section id="work" data-navtheme="light" className="bg-paper px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.a key={p.name} href={p.github} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className={`group card-hover block rounded-2xl bg-card p-3 shadow-card hover:shadow-card-hover ${i === 0 ? 'md:col-span-2' : ''}`}>
              <VideoSlot src={p.video} label={p.name} />
              <div className="px-3 pt-5 pb-3">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display font-semibold text-navy text-xl">
                    {p.name} {p.highlight && <span className="text-sm">🏆</span>}
                  </h3>
                  <span className="font-mono text-xs text-navy/40">{p.year}</span>
                </div>
                <p className="text-sm text-navy/60 leading-relaxed mb-4">{p.desc}</p>
                <TechList tech={p.tech} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
