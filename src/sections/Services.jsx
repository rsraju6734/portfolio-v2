import { useState } from 'react'
import { services, editorial } from '../config/site'
import { SectionLabel, Statement } from '../components/ui'
import Icon from '../components/Icon'

/** 03 — WHAT I DO: numbered editorial rows that open for details */
export default function Services() {
  const e = editorial.services
  const [open, setOpen] = useState(-1)
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionLabel n="03">{e.label}</SectionLabel>
        <div className="services__head">
          <Statement lead={e.lead} accent={e.accent} size="xl" />
          <p className="slashes" data-reveal>
            {['Data', 'Research', 'Web', 'AI'].map((t) => <span key={t}><i>/</i> {t}</span>)}
          </p>
        </div>

        <ol className="rows rows--services">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <li className={`row row--btn ${isOpen ? 'is-open' : ''}`} key={s.title} data-reveal>
                <button type="button" className="row__hit" aria-expanded={isOpen} aria-controls={`svc-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} data-cursor="hover">
                  <span className="row__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="row__icon"><Icon name={s.icon} size={20} /></span>
                  <span className="row__title">{s.title}</span>
                  <span className="row__text">{s.text}</span>
                  <span className="row__arrow"><Icon name={isOpen ? 'close' : 'arrow'} size={18} /></span>
                </button>
                <div className="row__more" id={`svc-${i}`} hidden={!isOpen}>
                  <p>{s.more}</p>
                  <a href="#contact" className="link-red" data-cursor="hover">Ask about this <Icon name="arrow" size={14} /></a>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
