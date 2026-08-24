import Navbar from './components/Navbar'
import Cover from './components/Cover'
import Hello from './components/Hello'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Cover />
        <Hello />
        <Resume />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
