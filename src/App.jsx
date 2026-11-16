import { MotionConfig } from 'motion/react'
import { UIProvider } from './lib/ui'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Work from './components/work/Work'
import Lab from './components/lab/Lab'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[90] -translate-y-24 rounded-full bg-amber px-4 py-2 text-[14px] font-medium text-ink opacity-0 transition-[transform,opacity] focus:translate-y-0 focus:opacity-100"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Experience />
          <Work />
          <Lab />
          <About />
          <Contact />
        </main>
        <Footer />
        <CommandPalette />
      </UIProvider>
    </MotionConfig>
  )
}
