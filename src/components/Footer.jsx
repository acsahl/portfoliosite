import { useEffect, useState } from 'react'
import { site } from '../data/content'
import { useUI } from '../lib/ui'
import { isMac } from './Nav'

export default function Footer() {
  const { setPaletteOpen } = useUI()
  const [mac, setMac] = useState(true)
  useEffect(() => setMac(isMac()), [])
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })

  return (
    <footer className="bg-ink-950 text-mist">
      <div className="page">
        <div className="grid grid-cols-1 gap-6 border-t border-paper/10 py-10 text-[13.5px] leading-relaxed md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <p className="font-display text-[22px] text-paper">
              {site.first} <span className="italic text-amber">{site.last}</span>
            </p>
            <p className="mt-1">Software engineer · {site.location}</p>
          </div>
          <p className="text-pretty md:col-span-8 lg:col-span-5">
            Set in Playfair Display, Geist and Geist Mono. Built with React, Vite, Tailwind CSS and Motion, and hosted on
            Netlify. Demos are screen recordings of the real apps.
          </p>
          <div className="flex items-center gap-5 whitespace-nowrap md:col-span-12 lg:col-span-3 lg:justify-end">
            <button type="button" onClick={() => setPaletteOpen(true)} className="hidden items-center gap-1.5 hover:text-paper sm:flex">
              <span className="kbd border-paper/20">{mac ? '⌘' : 'Ctrl'}</span>
              <span className="kbd border-paper/20">K</span>
              <span className="ml-1">Command menu</span>
            </button>
            <button type="button" onClick={toTop} className="link-draw hover:text-paper">
              Back to top
            </button>
          </div>
        </div>
        <div className="flex justify-between border-t border-paper/5 py-5 font-mono text-[11px] uppercase tracking-[0.12em] text-mist/80">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Orlando · Florida</span>
        </div>
      </div>
    </footer>
  )
}
