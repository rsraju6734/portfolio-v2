import { socials, projects, editorial } from '../config/site'
import { SectionLabel, Statement, hasLink, ext } from '../components/ui'
import Icon, { brandColor } from '../components/Icon'

/**
 * 09 — THE PROOF: "DON'T TAKE MY WORD FOR IT."
 * Instead of invented testimonials, it points to things visitors can check:
 * live projects and real professional profiles.
 */
export default function Proof() {
  const e = editorial.proof
  const live = projects.filter((p) => hasLink(p.links.live)).map((p) => ({
    key: p.id, title: p.title, sub: p.category, url: p.links.live, icon: 'globe', kind: 'Live project',
  }))
  const profiles = socials.filter((s) => hasLink(s.url)).map((s) => ({
    key: s.name, title: s.name, sub: s.handle, url: s.url, icon: s.icon, kind: s.note || 'Profile',
  }))

  return (
    <section className="section proof" id="proof">
      <div className="container">
        <SectionLabel n="09">{e.label}</SectionLabel>
        <div className="proof__grid">
          <div className="proof__head">
            <Statement lead={e.lead} accent={e.accent} size="xl" />
            <p className="proof__sub" data-reveal>{e.sub}</p>
          </div>

          <div className="proof__cards">
            <p className="label-sm proof__group">Live projects</p>
            <ul className="pcards" data-stagger>
              {live.map((c) => <ProofCard key={c.key} c={c} />)}
            </ul>
            <p className="label-sm proof__group">Profiles &amp; contact</p>
            <ul className="pcards" data-stagger>
              {profiles.map((c) => <ProofCard key={c.key} c={c} />)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProofCard({ c }) {
  const mail = c.url.startsWith('mailto:')
  return (
    <li>
      <a
        className="pcard2"
        href={c.url}
        {...(mail ? {} : ext)}
        style={{ '--brand': brandColor[c.icon] || '#c41e24' }}
        data-cursor="hover"
        aria-label={`${c.title} — ${c.kind}, opens ${mail ? 'your email app' : 'in a new tab'}`}
      >
        <span className="pcard2__quote" aria-hidden="true">“</span>
        <span className="pcard2__icon"><Icon name={c.icon} size={20} /></span>
        <span className="pcard2__title">{c.title}</span>
        <span className="pcard2__rule" />
        <span className="pcard2__kind">{c.kind}</span>
        <span className="pcard2__sub">{c.sub}</span>
        <span className="pcard2__arrow"><Icon name="arrowUpRight" size={16} /></span>
      </a>
    </li>
  )
}
