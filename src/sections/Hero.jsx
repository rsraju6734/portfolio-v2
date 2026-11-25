import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, isTouch } from '../lib/motion'
import { profile, editorial } from '../config/site'
import { Button } from '../components/ui'
import Portrait from '../components/Portrait'
import { useSectionTransition } from '../components/Nav'

/**
 * Editorial hero: giant crimson serif name, portrait cut-out standing in
 * front of the letters, stacked condensed keywords and a "Let's talk" CTA.
 */
export default function Hero({ ready }) {
  const root = useRef(null)
  const go = useSectionTransition()
  const [cutoutOk, setCutoutOk] = useState(Boolean(profile.portraitCutout))
  const word = editorial.heroWord
  const stack = editorial.heroStack

  // intro once the loader lifts
  useEffect(() => {
    if (!ready || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.hero__letter', { yPercent: 105 }, { yPercent: 0, duration: 1.5, stagger: 0.09 }, 0)
        .fromTo('.hero__figure', { yPercent: 18, scale: 0.84, opacity: 0, filter: 'brightness(0.2)' },
          { yPercent: 0, scale: 1, opacity: 1, filter: 'brightness(1)', duration: 2, ease: 'expo.inOut', clearProps: 'filter' }, 0.15)
        .fromTo('.hero__stack .wi', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07 }, 1)
        .fromTo('.hero__sign, .hero__cta > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, 1.25)
        .fromTo('.hero__rule', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 1.2)
    }, root.current)
    return () => ctx.revert()
  }, [ready])

  // scroll: portrait pushes forward, name drifts up behind it
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero__name', { yPercent: -35, ease: 'none', scrollTrigger: st })
      gsap.to('.hero__figure-inner', { scale: 1.12, yPercent: 6, ease: 'none', scrollTrigger: st })
      gsap.to('.hero__side', { yPercent: -60, opacity: 0, ease: 'none', scrollTrigger: st })
    }, root.current)
    return () => ctx.revert()
  }, [])

  // subtle mouse depth
  useEffect(() => {
    if (isTouch() || reducedMotion()) return
    const el = root.current
    const nameX = gsap.quickTo(el.querySelector('.hero__name'), 'x', { duration: 1.4, ease: 'power3.out' })
    const inner = el.querySelector('.hero__figure-inner')
    const figX = gsap.quickTo(inner, 'x', { duration: 1.4, ease: 'power3.out' })
    const figR = gsap.quickTo(inner, 'rotationY', { duration: 1.4, ease: 'power3.out' })
    const move = (e) => {
      const mx = e.clientX / window.innerWidth - 0.5
      nameX(mx * -24); figX(mx * 18); figR(mx * 6)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section className="hero" id="home" ref={root} data-hero>
      <h1 className="sr-only">{profile.name} — {profile.title}</h1>

      <div className="hero__name" aria-hidden="true">
        {[...word].map((c, i) => (
          <span className="hero__letter-wrap" key={i}><span className="hero__letter">{c}</span></span>
        ))}
      </div>

      <div className="hero__figure">
        <div className="hero__figure-inner">
          {cutoutOk ? (
            <img
              className="hero__cutout"
              src={profile.portraitCutout}
              alt={profile.photoAlt}
              width="984"
              height="1024"
              fetchpriority="high"
              decoding="async"
              onError={() => setCutoutOk(false)}
            />
          ) : (
            <div className="hero__round"><Portrait eager /></div>
          )}
        </div>
      </div>

      <div className="hero__side hero__side--left">
        <p className="hero__stack">
          {stack.map((w, i) => (
            <span key={w} className={`w ${i === stack.length - 1 ? 'is-red' : ''}`}><span className="wi">{w}</span></span>
          ))}
        </p>
        <p className="hero__sign">{profile.shortName}</p>
      </div>

      <div className="hero__side hero__side--right hero__cta">
        <Button href="#contact" onClick={(e) => { e.preventDefault(); go('contact') }}>Let's talk</Button>
        <p className="hero__note">{editorial.heroNote}<span>{profile.location}</span></p>
        <p className="hero__proof">{editorial.heroProof}</p>
      </div>

      <span className="hero__rule" aria-hidden="true" />
    </section>
  )
}
