import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, lockScroll } from '../lib/motion'
import { projects, socials } from '../config/site'
import { Eyebrow, SplitText, Button, useTilt, hasLink, ext } from '../components/ui'
import ProjectArt from '../components/ProjectArt'
import Icon from '../components/Icon'

const statusClass = (s) => `status status--${s.toLowerCase().replace(/\s+/g, '-')}`

function ProjectCard({ project, onOpen, variant }) {
  const tilt = useTilt(5)
  return (
    <article className={`pcard pcard--${variant}`} data-reveal="up">
      <button
        type="button"
        className="pcard__inner"
        ref={tilt}
        onClick={() => onOpen(project)}
        data-cursor="view"
        data-cursor-label="Open"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="pcard__media">
          <ProjectArt project={project} large={variant === 'feature'} />
          <span className="pcard__shine" aria-hidden="true" />
        </div>
        <div className="pcard__info">
          <div className="pcard__top">
            <span className="pcard__num">{project.number}</span>
            <span className={statusClass(project.status)}>{project.status}</span>
          </div>
          <h3 className="pcard__title">{project.title}</h3>
          <p className="pcard__cat mono-label">{project.category}</p>
          <p className="pcard__sum">{project.summary}</p>
          <span className="pcard__cta">View details <Icon name="arrow" size={16} /></span>
        </div>
      </button>
    </article>
  )
}

function ProjectModal({ project, onClose }) {
  const ref = useRef(null)
  const closeBtn = useRef(null)

  useEffect(() => {
    lockScroll(true)
    const prev = document.activeElement
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') { // keep focus inside the dialog
        const f = ref.current.querySelectorAll('a[href], button')
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    if (!reducedMotion()) {
      gsap.timeline()
        .fromTo('.pmodal__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo('.pmodal__panel', { clipPath: 'inset(8% 8% 8% 8% round 32px)', opacity: 0, y: 60 }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0)
        .fromTo('.pmodal__content > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'expo.out' }, 0.25)
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
      prev?.focus?.()
    }
  }, [onClose])

  const { links } = project
  return (
    <div className="pmodal" role="dialog" aria-modal="true" aria-labelledby="pmodal-title" ref={ref}>
      <div className="pmodal__backdrop" onClick={onClose} />
      <div className="pmodal__panel" data-lenis-prevent>
        <button className="pmodal__close" onClick={onClose} ref={closeBtn} aria-label="Close project details" data-cursor="hover"><Icon name="close" size={22} /></button>
        <div className="pmodal__media"><ProjectArt project={project} large /></div>
        <div className="pmodal__content">
          <div className="pmodal__meta">
            <span className="mono-label">Project {project.number} · {project.category}</span>
            <span className={statusClass(project.status)}>{project.status}</span>
          </div>
          <h3 id="pmodal-title" className="h-section">{project.title}</h3>
          <p className="pmodal__desc">{project.description}</p>

          <div className="pmodal__cols">
            <div>
              <p className="mono-label">Focus</p>
              <ul className="pmodal__list">{project.focus.map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}</ul>
            </div>
            <div>
              <p className="mono-label">Technology</p>
              <div className="pmodal__tech">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>

          {project.note && <p className="pmodal__note"><Icon name="info" size={16} />{project.note}</p>}

          <div className="pmodal__links">
            {hasLink(links.live) && <Button href={links.live} external icon="arrowUpRight">Open live site</Button>}
            {hasLink(links.code) && <Button href={links.code} external variant="ghost" icon="github">View on GitHub</Button>}
            {links.extra && hasLink(links.extra.url) && <Button href={links.extra.url} external variant="ghost" icon="facebook">{links.extra.label}</Button>}
            {!hasLink(links.live) && !hasLink(links.code) && <p className="muted">A live link will be added here soon.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const github = socials.find((s) => s.icon === 'github')
  const [featured, ...rest] = projects
  const variants = ['wide', 'tall', 'tall', 'wide', 'half']
  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="work__head">
          <div>
            <Eyebrow index="04">Featured work</Eyebrow>
            <SplitText as="h2" className="h-display" text="Selected projects" />
          </div>
          <p className="muted work__intro" data-reveal>
            Websites, chatbots and digital product concepts. Each card shows an honest status —
            <span className="status status--live">Live</span> <span className="status status--demo">Demo</span> <span className="status status--coming-soon">Coming Soon</span>
          </p>
        </div>

        <ProjectCard project={featured} onOpen={setOpen} variant="feature" />
        <div className="work__grid">
          {rest.map((p, i) => <ProjectCard key={p.id} project={p} onOpen={setOpen} variant={variants[i % variants.length]} />)}
        </div>

        {github && hasLink(github.url) && (
          <p className="work__more" data-reveal>
            More code on GitHub
            <a href={github.url} {...ext} className="link-arrow" data-cursor="hover">github.com/{github.handle} <Icon name="arrowUpRight" size={16} /></a>
          </p>
        )}
      </div>
      {open && <ProjectModal project={open} onClose={close} />}
    </section>
  )
}
