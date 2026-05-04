import { useEffect, useRef } from 'react'

const GREEN = '#1DB954'

const skills = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'Java', 'C', 'SQL', 'PHP'] },
  { category: 'Frontend', items: ['React', 'React Native', 'Expo', 'Flutter', 'Tailwind CSS', 'Figma'] },
  { category: 'Backend & DevOps', items: ['Node.js', 'Express.js', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'] },
  { category: 'AI & Tools', items: ['Google ADK', 'Gemini API', 'Grafana', 'Jira', 'Postman', 'Git'] },
]

export default function About() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-24 px-6 lg:px-12 bg-surface border-t border-border overflow-hidden">
      {/* Blue accent top-left */}
      <div className="absolute pointer-events-none"
        style={{ top: '-5%', left: '-10%', width: '550px', height: '550px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(45px)' }} />
      {/* Pink splash */}
      <div className="absolute pointer-events-none"
        style={{ bottom: '5%', right: '-5%', width: '420px', height: '420px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(50px)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div ref={ref} className="section-fade">
          <p className="font-mono text-xs tracking-widest mb-2 text-muted">01 / ABOUT</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-10">A bit about me.</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Bio */}
            <div className="lg:col-span-1 flex flex-col gap-5">
              <div className="card-glass rounded-2xl p-6 card-hover flex-1">
                <p className="text-xs font-mono text-muted tracking-widest mb-4">BIO</p>
                <div className="space-y-3 text-sm text-muted leading-relaxed">
                  <p>CS student at UCF with a passion for building things — from AI-powered mobile apps to enterprise-scale infrastructure.</p>
                  <p>Interning at <span className="text-ink font-medium">Bank of New York</span>, TAing DSA for 60+ students, and winning hackathons on the side.</p>
                  <p>Two-time hackathon winner. Club President. CodePath Tech Fellow.</p>
                </div>
              </div>

              <div className="card-glass rounded-2xl p-6 card-hover">
                <p className="text-xs font-mono text-muted tracking-widest mb-4">EDUCATION</p>
                <p className="text-ink font-semibold">University of Central Florida</p>
                <p className="text-sm text-muted mt-1">BS CS Honors · Digital Media Minor</p>
                <div className="flex gap-2 mt-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg border text-ink"
                    style={{ borderColor: 'rgba(29,185,84,0.3)', background: 'rgba(29,185,84,0.06)', color: GREEN }}>
                    GPA 3.671
                  </span>
                  <span className="text-xs font-mono text-muted px-2.5 py-1 border border-border rounded-lg">May 2027</span>
                </div>
              </div>

              <div className="card-glass rounded-2xl p-6 card-hover">
                <p className="text-xs font-mono text-muted tracking-widest mb-4">CERTIFICATIONS</p>
                <div className="flex flex-wrap gap-2">
                  {['Azure AZ-900', 'PCEP Python', 'Google AI Essentials', 'CodePath Tech Fellow'].map(c => (
                    <span key={c} className="text-xs text-muted border border-border px-2.5 py-1 rounded-lg">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skills.map(({ category, items }) => (
                <div key={category} className="card-glass rounded-2xl p-6 card-hover">
                  <p className="text-xs font-mono tracking-widest mb-4 text-muted">{category.toUpperCase()}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className="text-xs text-muted border border-border px-2.5 py-1 rounded-lg bg-surface">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2 card-glass rounded-2xl p-6 flex items-center justify-between gap-4">
                <p className="text-sm text-muted">Want to see more?</p>
                <div className="flex gap-3">
                  <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-xl border border-border hover:border-border-light text-muted hover:text-ink transition-all">GitHub ↗</a>
                  <a href="https://www.linkedin.com/in/acsah-lukose" target="_blank" rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-xl border border-border hover:border-border-light text-muted hover:text-ink transition-all">LinkedIn ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
