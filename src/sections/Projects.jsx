import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, lockScroll, isTouch } from '../lib/motion'
import { projects, socials, editorial } from '../config/site'
import { SectionLabel, Statement, Button, hasLink, ext } from '../components/ui'
import ProjectArt from '../components/ProjectArt'
import Icon from '../components/Icon'

const statusClass = (s) => `status status--${s.toLowerCase().replace(/\s+/g, '-')}`

/** Editorial list row. Desktop: a preview floats after the cursor. Mobile: inline art. */
function ProjectRow({ project, index, onOpen, onHover }) {
  return (
    <li className="prow" data-reveal>
      <button
        type="button"
        className="prow__hit"
        onClick={() => onOpen(project)}
        onMouseEnter={() => onHover(index)}
        onFocus={() => onHover(index)}
        data-cursor="view"
        data-cursor-label="Open"
        aria-label={`Open details for ${project.title}`}
      >
        <span className="prow__n">{project.number}</span>
        <span className="prow__title"><span className="prow__title-in">{project.title}</span></span>
        <span className="prow__cat">{project.category}</span>
        <span className={statusClass(project.status)}>{project.status}</span>
        <span className="prow__arrow"><Icon name="arrowUpRight" size={22} /></span>
      </button>
      <div className="prow__mobile-art" aria-hidden="true"><ProjectArt project={project} /></div>
      <p className="prow__sum">{project.summary}</p>
    </li>
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
        .fromTo('.pmodal__panel', { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, y: 60 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0)
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
            <span className="label-sm">/ {project.number} — {project.category}</span>
            <span className={statusClass(project.status)}>{project.status}</span>
          </div>
          <h3 id="pmodal-title" className="pmodal__title">{project.title}</h3>
          <p className="pmodal__desc">{project.description}</p>

          <div className="pmodal__cols">
            <div>
              <p className="label-sm">Focus</p>
              <ul className="pmodal__list">{project.focus.map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}</ul>
            </div>
            <div>
              <p className="label-sm">Technology</p>
              <div className="pmodal__tech">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>

          {project.note && <p className="pmodal__note"><Icon name="info" size={16} />{project.note}</p>}

          <div className="pmodal__links">
            {hasLink(links.live) && <Button href={links.live} external icon="arrowUpRight">Open live site</Button>}
            {hasLink(links.code) && <Button href={links.code} external variant="line" icon="github">View on GitHub</Button>}
            {links.extra && hasLink(links.extra.url) && <Button href={links.extra.url} external variant="line" icon="facebook">{links.extra.label}</Button>}
            {!hasLink(links.live) && !hasLink(links.code) && <p className="muted">A live link will be added here soon.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const e = editorial.work
  const [open, setOpen] = useState(null)
  const [hover, setHover] = useState(0)
  const close = useCallback(() => setOpen(null), [])
  const list = useRef(null)
  const float = useRef(null)
  const github = socials.find((s) => s.icon === 'github')

  // floating preview follows the cursor over the list (desktop)
  useEffect(() => {
    if (isTouch() || reducedMotion()) return
    const el = list.current, f = float.current
    const x = gsap.quickTo(f, 'x', { duration: 0.7, ease: 'power3.out' })
    const y = gsap.quickTo(f, 'y', { duration: 0.7, ease: 'power3.out' })
    const r = gsap.quickTo(f, 'rotation', { duration: 0.9, ease: 'power3.out' })
    let lastX = 0
    const move = (ev) => {
      const b = el.getBoundingClientRect()
      x(ev.clientX - b.left); y(ev.clientY - b.top)
      r(Math.max(-8, Math.min(8, (ev.clientX - lastX) * 0.4))); lastX = ev.clientX
    }
    const enter = () => gsap.to(f, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' })
    const leave = () => gsap.to(f, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'power3.in' })
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <section className="section work" id="work">
      <div className="container">
        <SectionLabel n="06">{e.label}</SectionLabel>
        <div className="work__head">
          <Statement lead={e.lead} accent={e.accent} size="xl" />
          <p className="work__intro" data-reveal>
            Websites, chatbots and digital product concepts — each with an honest status.
          </p>
        </div>

        <div className="work__list-wrap" ref={list}>
          <ol className="plist">
            {projects.map((p, i) => <ProjectRow key={p.id} project={p} index={i} onOpen={setOpen} onHover={setHover} />)}
          </ol>
          <div className="pfloat" ref={float} aria-hidden="true">
            {projects.map((p, i) => (
              <div key={p.id} className={`pfloat__item ${i === hover ? 'is-on' : ''}`}><ProjectArt project={p} /></div>
            ))}
          </div>
        </div>

        {github && hasLink(github.url) && (
          <p className="work__more" data-reveal>
            More code on GitHub
            <a href={github.url} {...ext} className="link-red" data-cursor="hover">github.com/{github.handle} <Icon name="arrowUpRight" size={16} /></a>
          </p>
        )}
      </div>
      {open && <ProjectModal project={open} onClose={close} />}
    </section>
  )
}
