import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { profile, khokaTech } from '../config/site'
import { Eyebrow, SplitText, Button, useSpotlight } from '../components/ui'
import Portrait from '../components/Portrait'
import Icon from '../components/Icon'

/** Placeholder monogram until a real logo is added in config/site.js */
export function KhokaLogo({ size = 120 }) {
  if (khokaTech.logo) return <img src={khokaTech.logo} alt={`${khokaTech.name} logo`} width={size} height={size} className="kt-logo-img" />
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`${khokaTech.name} logo placeholder`} className="kt-logo">
      <defs>
        <linearGradient id="ktg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00e0ff" /><stop offset=".55" stopColor="#2f6bff" /><stop offset="1" stopColor="#7a3cff" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="112" height="112" rx="30" fill="#060a1c" stroke="url(#ktg)" strokeWidth="3" />
      <path d="M38 30v60M38 62l30-32M50 50l30 40" stroke="url(#ktg)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="86" cy="34" r="6" fill="#00e0ff" />
    </svg>
  )
}

export default function KhokaTech() {
  const root = useRef(null)
  const grid = useSpotlight()

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      // the connection line drawing between founder and brand
      gsap.fromTo('.kt-link__path', { strokeDashoffset: 400 }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '.kt-link', start: 'top 80%', end: 'bottom 50%', scrub: true },
      })
      gsap.to('.kt__giant', {
        xPercent: -25, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root.current)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section kt" id="khoka-tech" ref={root}>
      <div className="kt__aurora" aria-hidden="true" />
      <div className="kt__giant" aria-hidden="true">KHOKA TECH · KHOKA TECH · KHOKA TECH</div>

      <div className="container">
        <Eyebrow index="02">Founder of Khoka Tech</Eyebrow>

        <div className="kt__hero">
          <div className="kt__title">
            <SplitText as="h2" className="h-display" text="I founded Khoka Tech" />
            <p className="kt__title-serif serif" data-reveal>to make modern technology accessible for every business.</p>
          </div>

          {/* visual connection: founder ⟶ brand */}
          <div className="kt-link" data-reveal="scale">
            <div className="kt-link__node kt-link__node--me">
              <div className="kt-link__avatar"><Portrait /></div>
              <span className="mono-label">{profile.shortName}</span>
              <small>Founder &amp; Owner</small>
            </div>
            <svg className="kt-link__svg" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="ktl" x1="0" x2="1">
                  <stop offset="0" stopColor="#00e0ff" /><stop offset="1" stopColor="#7a3cff" />
                </linearGradient>
              </defs>
              <path className="kt-link__path" d="M0 30 C 80 -10, 220 70, 300 30" stroke="url(#ktl)" strokeWidth="2" fill="none" strokeDasharray="400" />
              <circle r="4" fill="#00e0ff" className="kt-link__pulse">
                <animateMotion dur="3s" repeatCount="indefinite" path="M0 30 C 80 -10, 220 70, 300 30" />
              </circle>
            </svg>
            <div className="kt-link__node kt-link__node--brand">
              <KhokaLogo size={96} />
              <span className="mono-label">{khokaTech.name}</span>
              <small>Technology &amp; digital services</small>
            </div>
          </div>
        </div>

        <div className="kt__body">
          <div className="kt__intro" data-reveal>
            <p className="mono-label">The brand</p>
            <p className="kt__lead">{khokaTech.intro}</p>
            <div className="kt__ctas">
              <Button href={khokaTech.website} external icon="arrowUpRight">Visit Khoka Tech</Button>
              <Button href={khokaTech.facebook} external variant="ghost" icon="facebook">Facebook Page</Button>
            </div>
          </div>

          <blockquote className="kt__vision glass" data-reveal="right">
            <p className="mono-label">Vision</p>
            <p className="kt__vision-text">“{khokaTech.vision}”</p>
            <footer>— {profile.name}, Founder</footer>
          </blockquote>
        </div>

        <div className="kt__pillars" ref={grid} data-stagger>
          {khokaTech.pillars.map((p, i) => (
            <article className="kt-pillar" data-spot key={p.title}>
              <span className="kt-pillar__num">0{i + 1}</span>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
              <Icon name={['layout', 'bot', 'globe', 'spark'][i]} size={28} className="kt-pillar__icon" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
