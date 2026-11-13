// Navy "screening room". One large player; the list beside it switches the project.
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { projects } from './data'
import VideoSlot from './VideoSlot'
import Header, { TechList } from './Header'

export default function SpotlightLayout() {
  const [active, setActive] = useState(0)
  const p = projects[active]
  return (
    <section id="work" data-navtheme="dark" className="relative bg-navy overflow-hidden px-6 lg:px-12 py-24 lg:py-32">
      <p aria-hidden="true"
        className="ghost-text absolute -top-4 right-6 font-display font-bold text-amber/30 select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>WORK</p>
      <div className="max-w-6xl mx-auto relative">
        <Header dark title="Watch it run." />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <VideoSlot src={p.video} poster={p.poster} label={p.name} dark playing />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-6">
                  <div className="max-w-md">
                    <h3 className="font-display font-bold text-paper text-2xl mb-2">{p.name} {p.highlight && '🏆'}</h3>
                    <p className="text-paper/65 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:items-end">
                    <TechList tech={p.tech} dark />
                    <div className="flex gap-2">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                          className="rounded-full px-4 py-1.5 text-sm font-medium text-paper border border-paper/30 hover:border-paper transition-colors">Live site ↗</a>
                      )}
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="btn-primary rounded-full px-4 py-1.5 text-sm font-medium">GitHub →</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <ol className="lg:col-span-4 flex flex-col border-t border-paper/10">
            {projects.map((q, i) => (
              <li key={q.name}>
                <button onClick={() => setActive(i)}
                  className={`w-full text-left flex gap-4 py-5 border-b border-paper/10 transition-colors ${i === active ? 'text-paper' : 'text-paper/45 hover:text-paper/80'}`}>
                  <span className={`font-mono text-xs mt-1 ${i === active ? 'text-amber' : ''}`}>0{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-display font-semibold text-lg">{q.name}</span>
                    <span className="block text-sm opacity-70">{q.tagline}</span>
                  </span>
                  {i === active && <span className="w-1.5 h-1.5 rounded-full bg-amber mt-2.5" />}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
