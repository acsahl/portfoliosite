import { useEffect, useRef } from 'react'

const GREEN = '#1DB954'

export default function Contact() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-fade">
          <div className="card-glass rounded-2xl p-10 sm:p-16 text-center">
            <p className="font-mono text-xs tracking-widest mb-4 text-muted">04 / CONTACT</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-ink mb-4 leading-tight">Let's build something.</h2>
            <p className="text-muted mb-10 max-w-md mx-auto">Whether you have a role, a project, or just want to connect — reach out.</p>

            <a href="mailto:lukoseacsah@gmail.com"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm">
              lukoseacsah@gmail.com →
            </a>

            <div className="mt-10 flex items-center justify-center gap-6">
              <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted hover:text-ink transition-colors">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/acsah-lukose" target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted hover:text-ink transition-colors">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
