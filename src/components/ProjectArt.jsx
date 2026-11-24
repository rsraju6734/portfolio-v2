/* Animated artwork used as a project preview when no screenshot is set.
   It shows abstract UI shapes only — never fake data. */
export default function ProjectArt({ project, large = false }) {
  const [a, b] = project.theme
  const style = { '--a': a, '--b': b }

  if (project.image) {
    return (
      <div className="art art--image" style={style}>
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" />
      </div>
    )
  }

  return (
    <div className={`art art--${project.motif} ${large ? 'art--large' : ''}`} style={style} aria-hidden="true">
      <div className="art__glow" />
      <div className="art__grid" />
      <div className="art__window">
        <div className="art__bar"><i /><i /><i /><span /></div>
        <div className="art__screen">{motifs[project.motif]?.() ?? motifs.brand()}</div>
      </div>
      <span className="art__title">{project.title}</span>
    </div>
  )
}

const lines = (n, cls = '') => Array.from({ length: n }, (_, i) => <span key={i} className={`art-line ${cls}`} style={{ width: `${90 - ((i * 23) % 45)}%` }} />)

const motifs = {
  brand: () => (
    <div className="m-brand">
      <div className="m-brand__nav"><b>K</b>{lines(4, 'art-line--sm')}</div>
      <div className="m-brand__hero">
        <div className="m-brand__copy">{lines(3, 'art-line--lg')}<span className="art-pill" /></div>
        <div className="m-brand__orb" />
      </div>
      <div className="m-brand__cards"><span /><span /><span /></div>
    </div>
  ),
  chat: () => (
    <div className="m-chat">
      <div className="m-chat__products"><span /><span /><span /><span /></div>
      <div className="m-chat__box">
        <span className="bubble bubble--in" /><span className="bubble bubble--out" /><span className="bubble bubble--in bubble--short" />
        <span className="m-chat__typing"><i /><i /><i /></span>
      </div>
    </div>
  ),
  learn: () => (
    <div className="m-learn">
      <ul className="m-learn__chapters">{[1, 2, 3, 4, 5].map((i) => <li key={i} className={i === 2 ? 'on' : ''}><b>{i}</b><span className="art-line" /></li>)}</ul>
      <div className="m-learn__stage">
        <div className="m-learn__atom"><i /><i /><i /><b /></div>
        <div className="m-learn__progress"><span /></div>
      </div>
    </div>
  ),
  menu: () => (
    <div className="m-menu">
      <div className="m-menu__list">{[0, 1, 2, 3].map((i) => <div key={i} className="m-menu__row"><span className="m-menu__dish" />{lines(1)}<span className="art-pill art-pill--sm" /></div>)}</div>
      <div className="m-menu__ticket"><span className="mono-mini">ORDER</span>{lines(4, 'art-line--sm')}<span className="art-pill" /></div>
    </div>
  ),
  watch: () => (
    <div className="m-watch">
      <div className="m-watch__face"><i className="h" /><i className="m" /><i className="s" />{Array.from({ length: 12 }, (_, i) => <b key={i} style={{ transform: `rotate(${i * 30}deg) translateY(-56px)` }} />)}</div>
      <div className="m-watch__chat"><span className="bubble bubble--in" /><span className="bubble bubble--out bubble--short" /></div>
    </div>
  ),
  glow: () => (
    <div className="m-glow">
      <div className="m-glow__drop" />
      <span className="m-glow__soon">Coming soon</span>
    </div>
  ),
}
