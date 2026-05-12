import { useState, useEffect } from 'react'

const links = ['About', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-sm font-bold text-ink tracking-wider">
          AL<span style={{color:'#111118'}}>.</span>
        </button>

        <ul className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <li key={link}>
              <button onClick={() => scrollTo(link)}
                className="text-sm text-muted hover:text-ink transition-colors duration-200 tracking-wide">
                {link}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a href="https://www.linkedin.com/in/acsah-lukose" target="_blank" rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink transition-colors">LinkedIn</a>
          <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
            style={{background:'#111118'}}>
            GitHub
          </a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-0.5 bg-ink/60 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink/60 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border px-6 py-5 flex flex-col gap-5">
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className="text-left text-muted hover:text-ink text-sm">{link}</button>
          ))}
          <a href="https://github.com/acsahl" target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium text-ink">GitHub ↗</a>
        </div>
      )}
    </header>
  )
}
