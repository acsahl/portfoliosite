import { useEffect, useState } from 'react'

const links = ['About', 'Resume', 'Work']

export default function Navbar() {
  const [theme, setTheme] = useState('dark') // theme of the chapter currently behind the navbar
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-navtheme]'))
    const onScroll = () => {
      const probe = 72
      let active = sections[0]
      for (const el of sections) {
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) { active = el; break }
        if (r.top <= probe) active = el
      }
      if (active) setTheme(active.dataset.navtheme)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = theme === 'dark'

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${dark ? 'text-paper' : 'text-navy'}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight">
          <span className={dark ? 'text-amber' : 'text-amber-dark'}>{'{ }'}</span> Acsah Lukose
        </button>

        <ul className="hidden md:flex items-center gap-9">
          {links.map(link => (
            <li key={link}>
              <button onClick={() => scrollTo(link)}
                className={`text-sm transition-colors duration-200 tracking-wide ${dark ? 'text-paper/75 hover:text-paper' : 'text-navy/70 hover:text-navy'}`}>
                {link}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a href="mailto:lukoseacsah@gmail.com"
            className="pill inline-flex items-center px-5 py-2 text-sm font-medium bg-amber text-navy hover:bg-amber-dark transition-colors">
            Get in touch!
          </a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-0.5 transition-all duration-300 ${dark ? 'bg-paper' : 'bg-navy'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${dark ? 'bg-paper' : 'bg-navy'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${dark ? 'bg-paper' : 'bg-navy'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-navy text-paper px-6 py-5 flex flex-col gap-5">
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className="text-left text-paper/80 hover:text-paper text-sm">{link}</button>
          ))}
          <a href="mailto:lukoseacsah@gmail.com" className="text-sm font-medium text-amber">Get in touch ↗</a>
        </div>
      )}
    </header>
  )
}
