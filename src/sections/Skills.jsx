import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { skillGroups } from '../config/site'
import { Eyebrow, SplitText } from '../components/ui'
import Icon from '../components/Icon'

const levelText = {
  core: { label: 'Core strength', note: 'Used regularly in completed projects.' },
  growing: { label: 'Growing skill', note: 'Actively learning and improving through real projects.' },
}

export default function Skills() {
  const [active, setActive] = useState(0)
  const panel = useRef(null)
  const group = skillGroups[active]

  useEffect(() => {
    if (reducedMotion() || !panel.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills__panel-head > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'expo.out' })
      gsap.fromTo('.skill-chip', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.035, ease: 'back.out(1.6)' })
    }, panel.current)
    return () => ctx.revert()
  }, [active])

  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setActive((a) => (a + 1) % skillGroups.length) }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setActive((a) => (a - 1 + skillGroups.length) % skillGroups.length) }
  }

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="skills__head">
          <Eyebrow index="03">Skills &amp; expertise</Eyebrow>
          <SplitText as="h2" className="h-display" text="A toolkit built on real work." />
          <p className="muted" data-reveal>Four areas I work across. Core skills come from completed projects; growing skills are the ones I'm actively developing — Python, Flask and AI included.</p>
        </div>

        <div className="skills__console" data-reveal>
          <div className="skills__tabs" role="tablist" aria-label="Skill categories" onKeyDown={onKey}>
            {skillGroups.map((g, i) => (
              <button
                key={g.id}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={active === i}
                aria-controls="skills-panel"
                tabIndex={active === i ? 0 : -1}
                className={`skills__tab ${active === i ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                data-cursor="hover"
              >
                <span className="skills__tab-num">0{i + 1}</span>
                <span className="skills__tab-icon"><Icon name={g.icon} size={22} /></span>
                <span className="skills__tab-title">{g.title}</span>
                <span className={`badge badge--${g.level}`}>{g.level === 'core' ? 'Core' : 'Growing'}</span>
              </button>
            ))}
          </div>

          <div className="skills__panel" id="skills-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} ref={panel}>
            <div className="skills__orb" aria-hidden="true"><Icon name={group.icon} size={120} /></div>
            <div className="skills__panel-head">
              <p className="mono-label">{levelText[group.level].label} · {group.skills.length} skills</p>
              <h3>{group.title}</h3>
              <p className="muted">{group.blurb} {levelText[group.level].note}</p>
            </div>
            <ul className="skills__chips">
              {group.skills.map((s) => (
                <li className="skill-chip" key={s}><span className="skill-chip__dot" />{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
