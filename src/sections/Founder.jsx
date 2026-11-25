import { profile, khokaTech, editorial } from '../config/site'
import { SectionLabel, Statement, Button } from '../components/ui'
import Icon from '../components/Icon'

/** Placeholder monogram until a real logo is added in config/site.js */
export function KhokaLogo({ size = 120 }) {
  if (khokaTech.logo) return <img src={khokaTech.logo} alt={`${khokaTech.name} logo`} width={size} height={size} className="kt-logo-img" />
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`${khokaTech.name} logo placeholder`} className="kt-logo">
      <rect x="3" y="3" width="114" height="114" fill="#0a090b" stroke="#c41e24" strokeWidth="3" />
      <path d="M40 28v64M40 62l32-34M53 50l30 42" stroke="#ebe5d9" strokeWidth="10" strokeLinecap="square" fill="none" />
      <rect x="80" y="26" width="12" height="12" fill="#c41e24" />
    </svg>
  )
}

/** 02 — KHOKA TECH: founder identity, brand, vision, pillars */
export default function Founder() {
  const e = editorial.founder
  return (
    <section className="section founder" id="khoka-tech">
      <div className="container">
        <SectionLabel n="02">{e.label}</SectionLabel>

        <div className="founder__top">
          <div className="founder__left">
            <Statement lead={e.lead} size="lg" className="founder__lead" />
            <Button href={khokaTech.website} external variant="dark" icon="arrowUpRight">Visit Khoka Tech</Button>
          </div>

          <div className="founder__mark" data-reveal="scale">
            <KhokaLogo size={170} />
            <p className="founder__owner">{profile.name}<span>{khokaTech.role}</span></p>
          </div>

          <div className="founder__right">
            <Statement accent={e.accent} size="lg" accentStyle="serif" className="founder__accent" />
            <p className="slashes" data-reveal>
              {e.tags.map((t) => <span key={t}><i>/</i> {t}</span>)}
            </p>
          </div>
        </div>

        <div className="founder__body">
          <p className="founder__intro" data-reveal>{khokaTech.intro}</p>
          <blockquote className="founder__vision" data-reveal="right">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p>{khokaTech.vision}</p>
            <footer>— {profile.name}, Founder</footer>
          </blockquote>
        </div>

        <ol className="rows">
          {khokaTech.pillars.map((p, i) => (
            <li className="row" key={p.title} data-reveal>
              <span className="row__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="row__title">{p.title}</span>
              <span className="row__text">{p.text}</span>
              <span className="row__arrow"><Icon name="arrow" size={18} /></span>
            </li>
          ))}
        </ol>

        <div className="founder__links" data-reveal>
          <Button href={khokaTech.website} external icon="arrowUpRight">Khoka Tech website</Button>
          <Button href={khokaTech.facebook} external variant="line" icon="facebook">Facebook page</Button>
        </div>
      </div>
    </section>
  )
}
