import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { profile, about, stats } from '../config/site'
import { Eyebrow, SplitText, useTilt } from '../components/ui'
import Portrait from '../components/Portrait'
import Icon from '../components/Icon'

export function Marquee() {
  const items = [...profile.roles, 'Founder of Khoka Tech']
  return (
    <div className="marquee" aria-label="Roles">
      <div className="marquee__track">
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k} aria-hidden={k === 1}>
            {items.map((r) => (
              <span className="marquee__item" key={r}>{r}<i className="marquee__star">✦</i></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Timeline() {
  const ref = useRef(null)
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline__fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
      })
      gsap.utils.toArray('.timeline__step').forEach((step) => {
        gsap.from(step, {
          x: 40, opacity: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        })
        ScrollTrigger_toggle(step)
      })
    }, ref.current)
    return () => ctx.revert()
  }, [])
  return (
    <ol className="timeline" ref={ref}>
      <span className="timeline__line" aria-hidden="true"><span className="timeline__fill" /></span>
      {about.journey.map((s, i) => (
        <li className="timeline__step" key={s.title} tabIndex={0}>
          <span className="timeline__node" aria-hidden="true"><i /></span>
          <div className="timeline__card glass">
            <span className="mono-label">{s.when || `Step ${String(i + 1).padStart(2, '0')}`}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

// mark a step "active" while it is in the middle of the viewport
function ScrollTrigger_toggle(step) {
  gsap.timeline({
    scrollTrigger: {
      trigger: step, start: 'top 60%', end: 'bottom 40%',
      toggleClass: { targets: step, className: 'is-active' },
    },
  })
}

export default function About() {
  const card = useTilt(7)
  return (
    <section className="section about" id="about">
      <div className="about__bg-word" aria-hidden="true" data-parallax="0.15">ABOUT</div>
      <div className="container">
        <Eyebrow index="01">About me</Eyebrow>

        <div className="about__grid">
          <div className="about__left">
            <div className="profile-card" ref={card} data-reveal="scale" data-cursor="hover">
              <div className="profile-card__shine" aria-hidden="true" />
              <div className="profile-card__photo">
                <Portrait />
              </div>
              <div className="profile-card__body">
                <div className="profile-card__row">
                  <strong>{profile.name}</strong>
                  {profile.available && <span className="badge badge--live"><i />Available</span>}
                </div>
                <p>Founder &amp; Owner, Khoka Tech</p>
                <ul className="profile-card__meta">
                  <li><Icon name="pin" size={16} />{profile.location}</li>
                  <li><Icon name="email" size={16} /><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
                </ul>
                <div className="profile-card__tags">
                  {['AI-assisted dev', 'Research', 'Data', 'Chatbots'].map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="about__right">
            <SplitText as="h2" className="h-display" text="Research, technology & creativity — combined." />
            <p className="about__lead serif" data-reveal>{about.intro}</p>
            <div className="about__text" data-stagger>
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="stats" data-stagger>
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat__num"><b data-count={s.value}>0</b>{s.suffix}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="goals glass" data-reveal>
              <p className="mono-label">My goals</p>
              <ul>
                {about.goals.map((g) => <li key={g}><Icon name="check" size={16} />{g}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="journey">
          <div className="journey__head">
            <p className="mono-label" data-reveal>Professional journey</p>
            <SplitText as="h3" className="h-section" text="How I got here" />
            <p className="muted" data-reveal>From careful data work to building digital products — one step at a time.</p>
          </div>
          <Timeline />
        </div>
      </div>
    </section>
  )
}
