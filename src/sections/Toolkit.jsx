import { skillGroups, editorial } from '../config/site'
import { SectionLabel, Statement } from '../components/ui'
import Icon from '../components/Icon'

/** 05 — THE TOOLKIT: four editorial columns; growing skills are labelled honestly */
export default function Toolkit() {
  const e = editorial.skills
  return (
    <section className="section toolkit" id="skills">
      <div className="container">
        <SectionLabel n="05">{e.label}</SectionLabel>
        <div className="toolkit__head">
          <Statement lead={e.lead} accent={e.accent} size="xl" />
          <p className="toolkit__note" data-reveal>
            <span className="tag tag--core">Core</span> used in completed projects &nbsp;
            <span className="tag tag--growing">Growing</span> actively learning — Python, Flask &amp; AI included
          </p>
        </div>

        <div className="toolkit__grid" data-stagger>
          {skillGroups.map((g, i) => (
            <article className="tcol" key={g.id}>
              <header className="tcol__head">
                <span className="tcol__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="tcol__icon"><Icon name={g.icon} size={22} /></span>
                <span className={`tag tag--${g.level}`}>{g.level === 'core' ? 'Core' : 'Growing'}</span>
              </header>
              <h3 className="tcol__title">{g.title}</h3>
              <p className="tcol__blurb">{g.blurb}</p>
              <ul className="tcol__list">
                {g.skills.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
