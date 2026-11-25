import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { research, editorial } from '../config/site'
import { SectionLabel, Statement } from '../components/ui'
import Icon from '../components/Icon'

const letters = 'ABCDEFGH'

function Sheet({ columns }) {
  return (
    <div className="sheet" aria-hidden="true">
      <div className="sheet__row sheet__row--letters">
        <span className="sheet__idx" />
        {columns.map((_, i) => <span key={i}>{letters[i]}</span>)}
      </div>
      <div className="sheet__row sheet__row--head">
        <span className="sheet__idx">1</span>
        {columns.map((c) => <span key={c}>{c}</span>)}
      </div>
      {[2, 3, 4, 5, 6].map((r) => (
        <div className="sheet__row" key={r}>
          <span className="sheet__idx">{r}</span>
          {columns.map((c, i) => <span key={c}><i style={{ width: `${45 + ((r * 17 + i * 29) % 50)}%` }} /></span>)}
        </div>
      ))}
    </div>
  )
}

export default function Research() {
  const root = useRef(null)
  const track = useRef(null)

  // desktop: pin the section and move the case studies horizontally
  useEffect(() => {
    if (reducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const t = track.current
      const dist = () => t.scrollWidth - t.parentElement.clientWidth
      gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current.querySelector('.research__pin'),
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="section research" id="research" ref={root}>
      <div className="container">
        <div className="research__head">
          <SectionLabel n="07">{editorial.research.label}</SectionLabel>
          <Statement lead={editorial.research.lead} accent={editorial.research.accent} size="xl" />
          <p className="muted" data-reveal>{research.intro}</p>
          <div className="research__tools" data-reveal>
            {research.tools.map((t) => <span key={t} className="tool-tag"><Icon name="sheet" size={16} />{t}</span>)}
          </div>
        </div>
      </div>

      <div className="research__pin">
        <div className="research__viewport">
          <div className="research__track" ref={track}>
            {research.cases.map((c, i) => (
              <article className="case" key={c.title}>
                <header className="case__head">
                  <span className="case__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="case__source"><Icon name="globe" size={14} />{c.source}</span>
                </header>
                <h3 className="case__title">{c.title}</h3>
                <div className="case__stats">
                  <div><b>{c.records || '—'}</b><span>{c.records ? 'records' : 'records (not specified)'}</span></div>
                  <div><b className="case__type">{c.type}</b><span>work type</span></div>
                </div>
                <Sheet columns={c.columns} />
                <p className="case__note"><Icon name="info" size={14} /> Column structure preview — client data is not shown.</p>
              </article>
            ))}
            <article className="case case--end">
              <p className="label-sm">Need data like this?</p>
              <h3 className="case__title">Clean, verified spreadsheets — delivered in your format.</h3>
              <a href="#contact" className="link-red" data-cursor="hover">Start a research project <Icon name="arrow" size={16} /></a>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
