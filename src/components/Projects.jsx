import { motion } from 'motion/react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const projects = [
  {
    name: 'DialedIn',
    desc: 'React Native fitness app with AI-generated workout plans, powered by Gemini.',
    tech: 'React Native · Expo · MongoDB · Gemini',
    github: 'https://github.com/acsahl/DialedIn',
  },
  {
    name: "Knight's Pantry",
    desc: 'Built in 12 hours at a hackathon — a campus food pantry app. Won.',
    tech: 'Expo · React Native · Gemini API · MongoDB',
    github: 'https://github.com/acsahl/KnightsPantry',
    highlight: true,
  },
  {
    name: 'StockApp',
    desc: 'Responsive stock dashboard with live search, auto-refresh, and dark mode.',
    tech: 'React · TypeScript · Tailwind',
    github: 'https://github.com/acsahl/StockApp',
  },
]

function ProjectRow({ project, index }) {
  return (
    <a href={project.github} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row sm:items-baseline gap-2 py-7 border-b border-navy/10 transition-colors hover:border-navy/30">
      <span className="font-mono text-xs text-amber-dark shrink-0 w-8">0{index + 1}</span>
      <div className="sm:max-w-md flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="font-display font-semibold text-navy text-lg group-hover:opacity-70 transition-opacity">{project.name}</h3>
          {project.highlight && <span className="text-xs">🏆</span>}
        </div>
        <p className="text-sm text-navy/60 leading-relaxed">{project.desc}</p>
      </div>
      <p className="text-xs font-mono text-navy/50 shrink-0 sm:text-right sm:ml-auto">{project.tech}</p>
    </a>
  )
}

export default function Projects() {
  return (
    <section id="work" data-navtheme="light" className="bg-paper px-6 lg:px-12 py-24 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <p className="font-mono text-xs tracking-widest mb-2 text-amber-dark">WORK</p>
            <h2 className="font-display font-bold text-navy" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)' }}>Things I've shipped.</h2>
          </div>
          <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
            className="text-sm text-navy/60 hover:text-navy transition-colors shrink-0">More on GitHub →</a>
        </div>
        <div>
          {projects.map((p, i) => <ProjectRow key={p.name} project={p} index={i} />)}
        </div>
      </motion.div>
    </section>
  )
}
