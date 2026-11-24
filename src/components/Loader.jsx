import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { profile } from '../config/site'

/** Cinematic intro: counter + name reveal, then the curtain lifts. */
export default function Loader({ onDone }) {
  const root = useRef(null)
  const num = useRef(null)

  useEffect(() => {
    const el = root.current
    if (reducedMotion()) {
      el.style.display = 'none'
      onDone()
      return
    }
    const counter = { v: 0 }
    let pageReady = document.readyState === 'complete'
    const onLoad = () => (pageReady = true)
    window.addEventListener('load', onLoad)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from('.loader__name .ch', { yPercent: 120, duration: 0.9, ease: 'expo.out', stagger: 0.03 })
        .from('.loader__meta', { opacity: 0, y: 10, duration: 0.6 }, '-=0.5')
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0') },
        }, 0.2)
        .to('.loader__bar i', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.2)
        .add(() => {
          // wait for fonts/images (max ~2.5s extra) so the hero never pops in half-loaded
          if (!pageReady) {
            tl.pause()
            const resume = () => tl.resume()
            window.addEventListener('load', resume, { once: true })
            setTimeout(resume, 2500)
          }
        })
        .to('.loader__inner', { yPercent: -30, opacity: 0, duration: 0.7, ease: 'power3.in' })
        .add(() => onDone(), '-=0.1')
        .to('.loader__panel', { yPercent: -100, duration: 1.05, ease: 'expo.inOut', stagger: 0.07 }, '-=0.15')
        .set(el, { display: 'none' })
    }, el)

    return () => {
      window.removeEventListener('load', onLoad)
      ctx.revert()
    }
  }, [onDone])

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__panels">
        <span className="loader__panel" /><span className="loader__panel" /><span className="loader__panel" /><span className="loader__panel" />
      </div>
      <div className="loader__inner">
        <p className="loader__name">
          {[...profile.name.toUpperCase()].map((c, i) => (
            <span className="ch-wrap" key={i}><span className="ch">{c === ' ' ? ' ' : c}</span></span>
          ))}
        </p>
        <div className="loader__meta">
          <span>Founder · Khoka Tech</span>
          <span className="loader__num"><b ref={num}>000</b>%</span>
        </div>
        <div className="loader__bar"><i /></div>
      </div>
    </div>
  )
}
