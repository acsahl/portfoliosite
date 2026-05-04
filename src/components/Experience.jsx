import { useEffect, useRef } from 'react'

const GREEN = '#1DB954'

const jobs = [
  {
    role: 'Software Engineering Intern',
    company: 'Bank of New York',
    short: 'BNY',
    period: 'Jun 2026 – Dec 2026',
    bullets: [
      "Built AI workflows using BNY's proprietary model Eliza, managing latencies and service shutdowns via CI/CD pipelines.",
      'Led maintenance of systems across 87K+ end-user devices and 18 global data centers.',
    ],
  },
  {
    role: 'Software Engineering & UX/UI Design Intern',
    company: 'Life Stages',
    short: 'LS',
    period: 'Jun 2026 – Aug 2026',
    bullets: [
      'Built guided-meditation and journaling modules in React Native and Flutter.',
      'Created Figma prototypes for stress resilience features, boosting retention in MVP testing.',
    ],
  },
  {
    role: 'Undergraduate Teaching Assistant',
    company: 'UCF — Data Structures & Algorithms',
    short: 'UCF',
    period: 'Jan 2026 – Present',
    bullets: [
      'Led weekly C-based lab sessions for 60+ students.',
      'Reduced student TA reliance by ~25% through targeted code feedback.',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-fade">
          <p className="font-mono text-xs tracking-widest mb-2 text-muted">02 / EXPERIENCE</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-10">Where I've worked.</h2>

          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div key={job.role} className="card-glass rounded-2xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                    <span className="text-xs font-mono font-bold text-ink">{job.short}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-ink font-semibold">{job.role}</h3>
                        <p className="text-sm font-medium mt-0.5" style={{ color: GREEN }}>{job.company}</p>
                      </div>
                      <span className="text-xs font-mono text-muted border border-border px-3 py-1 rounded-lg shrink-0 self-start">{job.period}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {job.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-border-light mt-2 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
