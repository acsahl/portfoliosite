import { useEffect, useRef } from 'react'

const GREEN = '#1DB954'

const highlights = [
  { label: 'Incoming Role', value: 'SWE Intern @ BNY', sub: 'June – Aug 2026' },
  { label: 'Education', value: 'UCF CS Honors', sub: 'GPA 3.671 · May 2027' },
  { label: 'Hackathons', value: '2× Winner', sub: 'KnightHacks · Gemiknights' },
]

export default function Hero() {
  const ref = useRef(null)
  const rightRef = useRef(null)
  useEffect(() => {
    requestAnimationFrame(() => {
      ref.current?.classList.add('visible')
      setTimeout(() => rightRef.current?.classList.add('visible'), 150)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 lg:px-12 bg-surface">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: `radial-gradient(circle, #d0d0da 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

      {/* Blue + pink color splashes */}
      <div className="absolute pointer-events-none"
        style={{ top: '-10%', right: '-5%', width: '650px', height: '650px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(99,179,237,0.07) 50%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(30px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '0%', left: '-8%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(96,165,250,0.14) 0%, rgba(147,197,253,0.05) 55%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)' }} />
      {/* Pink splashes */}
      <div className="absolute pointer-events-none"
        style={{ top: '30%', right: '15%', width: '380px', height: '380px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, rgba(251,113,133,0.04) 55%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(45px)' }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: '15%', left: '25%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(244,114,182,0.09) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto w-full pt-24 pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Left — main card */}
          <div ref={ref} className="section-fade lg:col-span-3">
            <div className="card-glass rounded-2xl p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-8 tracking-wider border"
                style={{ borderColor: 'rgba(29,185,84,0.3)', background: 'rgba(29,185,84,0.06)', color: GREEN }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GREEN }} />
                Available · Open to opportunities
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-5 text-ink">
                Hi, I'm<br />Acsah.
              </h1>

              <p className="text-base text-muted leading-relaxed mb-8 max-w-md">
                Software engineering student at UCF building full-stack web and mobile apps.
                Interning at <span className="text-ink font-medium">Bank of New York</span>, teaching DSA, and shipping side projects.
              </p>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary px-6 py-2.5 rounded-xl text-sm font-medium">
                  View projects
                </button>
                <a href="mailto:lukoseacsah@gmail.com"
                  className="px-6 py-2.5 rounded-xl border border-border hover:border-border-light text-muted hover:text-ink text-sm font-medium transition-all duration-200">
                  Get in touch
                </a>
              </div>
            </div>

            {/* Tech strip */}
            <div className="mt-4 card-glass rounded-xl px-6 py-4 flex flex-wrap gap-x-6 gap-y-1">
              {['React', 'Python', 'TypeScript', 'React Native', 'Docker', 'Gemini AI'].map(t => (
                <span key={t} className="text-xs font-mono text-muted tracking-wider">{t}</span>
              ))}
            </div>
          </div>

          {/* Right — info widgets */}
          <div ref={rightRef} className="section-fade lg:col-span-2 flex flex-col gap-4">
            {highlights.map(({ label, value, sub }) => (
              <div key={label} className="card-glass rounded-2xl p-5 card-hover">
                <p className="text-xs font-mono text-muted mb-2 tracking-widest uppercase">{label}</p>
                <p className="text-base font-semibold text-ink">{value}</p>
                <p className="text-sm text-muted mt-0.5">{sub}</p>
              </div>
            ))}

            <div className="card-glass rounded-2xl p-5">
              <p className="text-xs font-mono text-muted mb-3 tracking-widest uppercase">Currently</p>
              <div className="space-y-2">
                {['Training for a 10k', 'Working on Short Films', 'Open to Fall 2026 roles'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GREEN }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
