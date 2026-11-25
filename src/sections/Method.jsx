import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { profile, process, editorial } from '../config/site'
import { SectionLabel } from '../components/ui'
import Icon from '../components/Icon'

const icons = ['search', 'target', 'layout', 'check', 'arrowUpRight']

/** 08 — THE METHOD: bordered step boxes joined by a line that draws on scroll */
export default function Method() {
  const root = useRef(null)
  const e = editorial.method

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.method__line-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.method__steps', start: 'top 70%', end: 'bottom 60%', scrub: true },
      })
      gsap.utils.toArray('.mstep').forEach((el) => {
        gsap.fromTo(el, { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
      gsap.fromTo('.method__figure img', { scale: 1.15, filter: 'grayscale(1) brightness(0.4)' }, {
        scale: 1, filter: 'grayscale(0.35) brightness(1)', ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: true },
      })
    }, root.current)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section method" id="method" ref={root}>
      <div className="container method__grid">
        <div className="method__left">
          <SectionLabel n="08">{e.label}</SectionLabel>
          <ol className="method__steps">
            <span className="method__line" aria-hidden="true"><span className="method__line-fill" /></span>
            {process.map((p, i) => (
              <li className="mstep" key={p.title}>
                <span className="mstep__icon"><Icon name={icons[i] || 'spark'} size={20} /></span>
                <div className="mstep__box">
                  <h3><span>{String(i + 1).padStart(2, '0')}</span> {p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="method__right">
          <blockquote className="method__quote" data-reveal="right">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p>{e.quote[0]}</p>
            <p className="red">{e.quote[1]}</p>
          </blockquote>
          {profile.portraitCutout && (
            <div className="method__figure">
              <img src={profile.portraitCutout} alt="" loading="lazy" decoding="async" width="984" height="1024" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
