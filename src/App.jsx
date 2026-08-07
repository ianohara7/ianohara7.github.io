import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const Museum = lazy(() => import('./components/Museum.jsx'))

export default function App() {
  return (
    <div className="app">
      <div className="scanlines" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Suspense fallback={<div className="museum-stage" />}>
          <Museum />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
