import { useEffect, useState } from 'react'

const links = [['About', 'about'], ['Resume', 'resume'], ['Work', 'work']]

export default function Navbar() {
  const [theme, setTheme] = useState('light') // theme of the chapter behind the navbar
  const [pastCover, setPastCover] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const ownNav = true // the cover has its own nav, so this bar appears only after scrolling past it

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-navtheme]'))
    const onScroll = () => {
      const probe = 32
      let active = sections[0]
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= probe) active = el
      }
      if (active) setTheme(active.dataset.navtheme)
      setPastCover(window.scrollY > window.innerHeight * 0.85)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = theme === 'dark'
  const visible = !ownNav || pastCover || menuOpen
  const solid = pastCover

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        ${solid ? (dark ? 'bg-navy/90 border-b border-paper/10' : 'bg-paper/90 border-b border-navy/10') : ''}
        ${solid ? 'backdrop-blur-sm' : ''}
        ${dark ? 'text-paper' : 'text-navy'}`}
    >
      <nav className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto h-14 flex items-center justify-between text-xs tracking-[0.18em] uppercase">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-medium">
          Acsah Lukose
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(([label, id]) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} className="link-underline uppercase opacity-75 hover:opacity-100">
                {label}
              </button>
            </li>
          ))}
          <li>
            <a href="mailto:lukoseacsah@gmail.com" className="link-underline">Email ↗</a>
          </li>
        </ul>

        <button className="md:hidden uppercase" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={`md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 ${dark ? 'bg-navy' : 'bg-paper'}`}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-left font-display text-2xl">{label}</button>
          ))}
          <a href="mailto:lukoseacsah@gmail.com" className="font-display text-2xl italic">Email ↗</a>
        </div>
      )}
    </header>
  )
}
