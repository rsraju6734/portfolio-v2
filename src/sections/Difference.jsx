import { profile, stats, editorial } from '../config/site'
import { SectionLabel, Words } from '../components/ui'

/** 04 — THE DIFFERENCE: "YOU HAVE A BUSINESS. GOOD. NOW GET IT WORKING ONLINE." */
export default function Difference() {
  const e = editorial.difference
  return (
    <section className="section difference" id="difference">
      <div className="container">
        <SectionLabel n="04">{e.label}</SectionLabel>

        <div className="difference__grid">
          <h2 className="difference__statement" data-words>
            <span className="statement__lead difference__top"><Words text={e.top} /></span>
            <span className="difference__big"><Words text={e.big} /></span>
            <span className="statement__accent difference__accent"><Words text={e.accent} /></span>
          </h2>

          <aside className="difference__aside">
            <p className="difference__quote" data-reveal="right">
              {e.quote.map((line, i) => (
                <span key={line} className={i === e.quote.length - 1 || i === e.quote.length - 2 ? 'red' : ''}>{line}</span>
              ))}
            </p>
            <span className="difference__rule" aria-hidden="true" />
            <p className="slashes" data-reveal>{e.tags.map((t) => <span key={t}><i>/</i> {t}</span>)}</p>
            <span className="difference__rule" aria-hidden="true" />
            <p className="difference__foot" data-reveal>{e.footnote}</p>
          </aside>
        </div>

        <div className="difference__bottom">
          <div className="difference__stats" data-stagger>
            {stats.map((s) => (
              <div key={s.label}>
                <b><span data-count={s.value}>0</span>{s.suffix}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="signature" data-reveal="right">
            <span className="signature__script">{profile.shortName}</span>
            <span className="signature__role">Founder · Khoka Tech</span>
          </div>
        </div>
      </div>
    </section>
  )
}
