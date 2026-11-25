import { useCallback, useEffect, useState } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/motion'
import { initReveals } from './lib/reveals'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Approach from './sections/Approach'
import Founder from './sections/Founder'
import Services from './sections/Services'
import Difference from './sections/Difference'
import Toolkit from './sections/Toolkit'
import Projects from './sections/Projects'
import Research from './sections/Research'
import Method from './sections/Method'
import Proof from './sections/Proof'
import Contact, { Footer } from './sections/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    initSmoothScroll()
  }, [])

  useEffect(() => {
    if (!ready) return
    const cleanup = initReveals(document.querySelector('main'))
    // recalculate trigger positions once fonts/images settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 800)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => { clearTimeout(t); cleanup() }
  }, [ready])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Loader onDone={onLoaded} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main" className={ready ? 'is-ready' : ''}>
        <Hero ready={ready} />
        <Approach />
        <Founder />
        <Services />
        <Difference />
        <Toolkit />
        <Projects />
        <Research />
        <Method />
        <Proof />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
