import { useState } from 'react'
import { services } from '../config/site'
import { Eyebrow, SplitText, useSpotlight } from '../components/ui'
import Icon from '../components/Icon'

function ServiceCard({ s, i }) {
  const [open, setOpen] = useState(false)
  const id = `svc-more-${i}`
  return (
    <article className={`svc ${open ? 'is-open' : ''}`} data-spot>
      <div className="svc__top">
        <span className="svc__icon"><Icon name={s.icon} size={28} /></span>
        <span className="svc__num">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="svc__title">{s.title}</h3>
      <p className="svc__text">{s.text}</p>
      <div className="svc__more" id={id} hidden={!open}>
        <p>{s.more}</p>
        <a href="#contact" className="link-arrow" data-cursor="hover">Ask about this <Icon name="arrow" size={14} /></a>
      </div>
      <button type="button" className="svc__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} data-cursor="hover">
        <span>{open ? 'Show less' : 'Learn more'}</span>
        <span className="svc__plus"><Icon name="plus" size={16} /></span>
      </button>
    </article>
  )
}

export default function Services() {
  const grid = useSpotlight()
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="services__head">
          <div>
            <Eyebrow index="06">Services</Eyebrow>
            <SplitText as="h2" className="h-display" text="How I can help your business" />
          </div>
          <p className="muted" data-reveal>From careful data work to websites and AI chatbots — practical services, clearly scoped, delivered on time.</p>
        </div>
        <div className="services__grid" ref={grid} data-stagger>
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  )
}
