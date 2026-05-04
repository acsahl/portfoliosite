import { useEffect, useRef } from 'react'

const GREEN = '#1DB954'

const projects = [
  {
    name: 'DialedIn',
    desc: 'React Native fitness app with AI-generated workout plans and progress tracking. Powered by Gemini and MongoDB.',
    tech: ['React Native', 'Expo', 'TypeScript', 'MongoDB', 'Gemini AI'],
    github: 'https://github.com/acsahl/DialedIn',
    live: null,
    tag: 'Mobile App',
  },
  {
    name: "Knight's Pantry",
    desc: "Cross-platform campus food pantry app built in 12 hours. Gemini OCR cut donation logging by 60%, serving 60K+ students.",
    tech: ['Expo', 'React Native', 'Gemini API', 'MongoDB', 'Node.js'],
    github: 'https://github.com/acsahl/KnightsPantry',
    live: 'https://devpost.com/software/knight-s-pantry',
    tag: '🏆 Hackathon Winner',
    highlight: true,
  },
  {
    name: 'StockApp',
    desc: 'Responsive stock price dashboard with real-time search, auto-refresh, and dark mode.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/acsahl/StockApp',
    live: null,
    tag: 'Web App',
  },
  {
    name: 'BibleTracker',
    desc: 'Bible study companion to track reading progress, take notes, and maintain daily habits.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/acsahl/BibleTracker',
    live: 'https://ipcbiblereading.netlify.app',
    tag: 'Web App',
  },
  {
    name: '2048',
    desc: 'Pixel-perfect clone of the classic 2048 sliding puzzle game in vanilla JS.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/acsahl/2048',
    live: null,
    tag: 'Game',
  },
]

function ProjectCard({ project }) {
  return (
    <div className="card-glass rounded-2xl p-5 flex flex-col gap-4 card-hover h-full"
      style={project.highlight ? { borderColor: 'rgba(29,185,84,0.25)' } : {}}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-mono px-2.5 py-1 rounded-lg border"
          style={project.highlight
            ? { borderColor: 'rgba(29,185,84,0.3)', background: 'rgba(29,185,84,0.06)', color: GREEN }
            : { borderColor: '#e4e4eb', background: '#f2f2f7', color: '#6b6b7b' }}>
          {project.tag}
        </span>
        <div className="flex gap-1.5">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-muted hover:text-ink hover:border-border-light transition-all text-xs">↗</a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-border text-muted hover:text-ink hover:border-border-light transition-all">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h3 className="text-ink font-semibold mb-1.5">{project.name}</h3>
        <p className="text-sm text-muted leading-relaxed">{project.desc}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map(t => (
          <span key={t} className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded-md bg-surface">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative py-24 px-6 lg:px-12 bg-surface border-t border-border overflow-hidden">
      {/* Blue accent right */}
      <div className="absolute pointer-events-none"
        style={{ top: '10%', right: '-8%', width: '520px', height: '520px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(40px)' }} />
      {/* Pink splash */}
      <div className="absolute pointer-events-none"
        style={{ bottom: '10%', left: '-5%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(244,114,182,0.11) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(45px)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div ref={ref} className="section-fade">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs tracking-widest mb-2 text-muted">03 / PROJECTS</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink">Things I've shipped.</h2>
            </div>
            <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
              className="text-sm text-muted hover:text-ink transition-colors">All repos on GitHub →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => <ProjectCard key={p.name} project={p} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
