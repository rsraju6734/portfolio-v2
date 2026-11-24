import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { process } from '../config/site'
import { Eyebrow, SplitText } from '../components/ui'

export default function Process() {
  const root = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.pstep')
      gsap.fromTo('.process__beam-fill', { scaleX: 0, scaleY: 0 }, {
        scaleX: 1, scaleY: 1, ease: 'none',
        scrollTrigger: {
          trigger: '.process__steps', start: 'top 75%', end: 'bottom 55%', scrub: true,
          onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
        },
      })
    }, root.current)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section process" id="process" ref={root}>
      <div className="container">
        <div className="process__head">
          <Eyebrow index="07">Work process</Eyebrow>
          <SplitText as="h2" className="h-display" text="From brief to delivery" />
          <p className="muted" data-reveal>A clear, five-step workflow — so you always know what happens next.</p>
        </div>

        <ol className="process__steps">
          <span className="process__beam" aria-hidden="true"><span className="process__beam-fill" /></span>
          {process.map((p, i) => (
            <li
              key={p.title}
              className={`pstep ${i <= active ? 'is-on' : ''} ${i === active ? 'is-current' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <span className="pstep__node"><b>{String(i + 1).padStart(2, '0')}</b></span>
              <div className="pstep__body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
