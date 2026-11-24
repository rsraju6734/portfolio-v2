import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, isTouch } from '../lib/motion'
import { profile } from '../config/site'
import HeroScene from '../components/HeroScene'
import Portrait from '../components/Portrait'
import FloatingPortrait from '../components/FloatingPortrait'
import { Button, SplitText } from '../components/ui'
import Icon from '../components/Icon'
import { useSectionTransition } from '../components/Nav'

const chips = [
  { label: 'AI Chatbots', icon: 'bot', cls: 'chip--a', depth: 1.4 },
  { label: 'Web Development', icon: 'code', cls: 'chip--b', depth: 0.9 },
  { label: 'Data Research', icon: 'search', cls: 'chip--c', depth: 1.2 },
  { label: 'Khoka Tech', icon: 'spark', cls: 'chip--d', depth: 0.7 },
]

export default function Hero({ ready }) {
  const root = useRef(null)
  const go = useSectionTransition()
  const [cutout, setCutout] = useState(Boolean(profile.portraitCutout))
  const [first, last] = [profile.name.split(' ').slice(0, 2).join(' '), profile.name.split(' ').slice(2).join(' ')]

  // intro timeline once the loader is done
  useEffect(() => {
    if (!ready) return
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      if (el.querySelector('.fp')) {
        tl.fromTo('.fp__orb', { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 2 }, 0)
          .fromTo('.fp__ring', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8, stagger: 0.1 }, 0.3)
          .fromTo('.fp__body', { clipPath: 'inset(100% 0% 0% 0%)', y: 80 }, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.8, ease: 'expo.inOut' }, 0.2)
          .fromTo('.fp__img', { filter: 'blur(14px) brightness(2.2) saturate(0)' }, { filter: 'blur(0px) brightness(1) saturate(1)', duration: 2.2, clearProps: 'filter' }, 0.5)
          .fromTo('.fp__floor', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.6 }, 0.8)
      } else {
        tl.fromTo('.hero__portrait-mask', { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(50% at 50% 50%)', duration: 1.6, ease: 'expo.inOut' }, 0.1)
          .fromTo('.hero__portrait-img', { scale: 1.4, filter: 'blur(12px) saturate(0)' }, { scale: 1.04, filter: 'blur(0px) saturate(1)', duration: 2 }, 0.3)
          .fromTo('.hero__halo', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8 }, 0.5)
      }
      tl
        .fromTo('.hero__name .ch', { yPercent: 120 }, { yPercent: 0, duration: 1.2, stagger: 0.035 }, 0.4)
        .fromTo('.hero__headline .ch', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.014 }, 0.9)
        .fromTo('.hero__eyebrow, .hero__sub, .hero__ctas > *, .hero__foot > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.07 }, 1.3)
        .fromTo('.chip', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.8)' }, 1.5)
    }, el)
    return () => ctx.revert()
  }, [ready])

  // mouse-responsive depth for portrait + chips
  useEffect(() => {
    if (isTouch() || reducedMotion()) return
    const el = root.current
    const layers = [...el.querySelectorAll('[data-depth]')].map((n) => ({
      x: gsap.quickTo(n, 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(n, 'y', { duration: 1.2, ease: 'power3.out' }),
      d: parseFloat(n.dataset.depth),
    }))
    const move = (e) => {
      const mx = e.clientX / window.innerWidth - 0.5
      const my = e.clientY / window.innerHeight - 0.5
      layers.forEach((l) => { l.x(mx * 30 * l.d); l.y(my * 30 * l.d) })
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // scroll-out parallax
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to('.hero__content', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero__visual', { yPercent: 12, scale: 0.94, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root.current)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="home" ref={root} data-hero>
      <HeroScene />
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__light" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__content">
          <p className="hero__eyebrow mono-label">
            <span className="dot-live" /> Founder of Khoka Tech — {profile.location}
          </p>

          <h1 className="hero__name" aria-label={profile.name}>
            <span className="hero__name-line" aria-hidden="true">
              {[...first.toUpperCase()].map((c, i) => <span className="ch-wrap" key={i}><span className="ch">{c === ' ' ? ' ' : c}</span></span>)}
            </span>
            <span className="hero__name-line hero__name-line--grad" aria-hidden="true">
              {[...last.toUpperCase()].map((c, i) => <span className="ch-wrap" key={i}><span className="ch">{c}</span></span>)}
            </span>
          </h1>

          <div className="hero__headline">
            <SplitText as="p" text={profile.headline[0]} />
            <SplitText as="p" text={profile.headline[1]} className="serif-grad" />
          </div>

          <p className="hero__sub">{profile.subtitle}</p>

          <div className="hero__ctas">
            <Button href="#work" icon="arrow" onClick={(e) => { e.preventDefault(); go('work') }}>
              Explore My Work
            </Button>
            <Button href="#contact" variant="ghost" icon="arrowUpRight" onClick={(e) => { e.preventDefault(); go('contact') }}>
              Let's Work Together
            </Button>
          </div>
        </div>

        <div className={`hero__visual ${cutout ? 'hero__visual--cutout' : ''}`}>
          {cutout ? (
            <>
              <FloatingPortrait onMissing={() => setCutout(false)} />
              <div className="hero__portrait-tag hero__portrait-tag--fp" data-depth="0.8">
                <span className="mono-label">Founder &amp; Owner</span>
                <strong>Khoka Tech</strong>
              </div>
            </>
          ) : (
            <>
              <div className="hero__halo" data-depth="0.4" aria-hidden="true">
                <span className="halo-ring halo-ring--1" />
                <span className="halo-ring halo-ring--2" />
                <span className="halo-ring halo-ring--3" />
              </div>
              <div className="hero__portrait" data-depth="0.6">
                <div className="hero__portrait-glow" aria-hidden="true" />
                <div className="hero__portrait-mask">
                  <Portrait className="hero__portrait-img" eager />
                  <div className="hero__portrait-shade" aria-hidden="true" />
                </div>
                <div className="hero__portrait-tag">
                  <span className="mono-label">Founder &amp; Owner</span>
                  <strong>Khoka Tech</strong>
                </div>
              </div>
            </>
          )}
          {chips.map((c) => (
            <span key={c.label} className={`chip glass ${c.cls}`} data-depth={c.depth} aria-hidden="true">
              <Icon name={c.icon} size={16} /> {c.label}
            </span>
          ))}
        </div>
      </div>

      <div className="hero__foot container">
        <p className="hero__tagline">{profile.tagline}</p>
        <a href="#about" className="scroll-cue" data-cursor="hover" onClick={(e) => { e.preventDefault(); go('about') }} aria-label="Scroll to About section">
          <span className="scroll-cue__mouse"><i /></span>
          <span className="mono-label">Scroll to explore</span>
        </a>
        <p className="hero__roles mono-label">AI · Web · Research · Data</p>
      </div>
    </section>
  )
}
