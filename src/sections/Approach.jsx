import { about, stats, editorial } from '../config/site'
import { SectionLabel, Statement } from '../components/ui'

/** 01 — THE APPROACH: big statement + who I am + verified numbers + journey */
export default function Approach() {
  const e = editorial.approach
  return (
    <section className="section approach" id="about">
      <div className="container">
        <SectionLabel n="01">{e.label}</SectionLabel>

        <Statement lead={e.lead} accent={e.accent} size="xxl" className="approach__statement" />

        <div className="approach__under">
          <p className="approach__sub" data-reveal>
            {e.sub.split(' ').slice(0, -2).join(' ')} <span className="red">{e.sub.split(' ').slice(-2).join(' ')}</span>
          </p>
          <p className="approach__side" data-reveal data-delay="0.1">{e.side}</p>
        </div>

        <div className="approach__about">
          <p className="approach__intro" data-reveal>{about.intro}</p>
          <div className="approach__paras" data-stagger>
            {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <div className="numbers" data-stagger>
          {stats.map((s) => (
            <div className="numbers__item" key={s.label}>
              <span className="numbers__value"><b data-count={s.value}>0</b>{s.suffix}</span>
              <span className="numbers__label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="journey">
          <p className="journey__title" data-reveal>The journey <span className="red">so far.</span></p>
          <ol className="journey__list" data-stagger>
            {about.journey.map((j, i) => (
              <li className="journey__row" key={j.title}>
                <span className="journey__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="journey__head">{j.title}</span>
                <span className="journey__text">{j.text}</span>
                <span className="journey__when">{j.when}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
