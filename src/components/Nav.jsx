import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, reducedMotion, scrollToTarget, lockScroll, getLenis } from '../lib/motion'
import { profile, khokaTech } from '../config/site'
import { Magnetic, ext } from './ui'
import Icon from './Icon'

export const sections = [
  { id: 'home', label: 'Home', hint: 'Start' },
  { id: 'about', label: 'About', hint: 'Story & journey' },
  { id: 'khoka-tech', label: 'Khoka Tech', hint: 'My company' },
  { id: 'skills', label: 'Skills', hint: 'Expertise' },
  { id: 'work', label: 'Work', hint: 'Projects' },
  { id: 'research', label: 'Research', hint: 'Data case studies' },
  { id: 'services', label: 'Services', hint: 'How I help' },
  { id: 'process', label: 'Process', hint: 'How I work' },
  { id: 'contact', label: 'Contact', hint: "Let's talk" },
]

function useClock(tz) {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return t
}

/** Cinematic wipe between sections, used by every in-page navigation link. */
export function useSectionTransition() {
  return useCallback((id) => {
    const target = document.getElementById(id)
    if (!target) return
    const wipe = document.querySelector('.wipe')
    if (reducedMotion() || !wipe) { scrollToTarget(target, { immediate: reducedMotion() }); return }
    const label = wipe.querySelector('.wipe__label')
    label.textContent = sections.find((s) => s.id === id)?.label ?? ''
    gsap.timeline()
      .set(wipe, { display: 'flex' })
      .fromTo(wipe, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }, { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 0.6, ease: 'power4.inOut' })
      .fromTo(label, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'expo.out' }, '-=0.2')
      .add(() => {
        getLenis()?.start()
        scrollToTarget(target, { immediate: true })
      })
      .to(label, { yPercent: -100, opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.15')
      .to(wipe, { clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)', duration: 0.7, ease: 'power4.inOut' }, '-=0.1')
      .set(wipe, { display: 'none' })
  }, [])
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [hidden, setHidden] = useState(false)
  const menu = useRef(null)
  const go = useSectionTransition()
  const time = useClock(profile.timezone)

  // hide bar on scroll down, show on scroll up; progress bar
  useEffect(() => {
    let last = 0
    const bar = document.querySelector('.progress i')
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 300 && y > last + 4 ? true : y < last - 4 ? false : (h) => h)
      last = y
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // active section highlight
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => { const el = document.getElementById(s.id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])

  // fullscreen menu animation
  useEffect(() => {
    const el = menu.current
    if (!el) return
    lockScroll(open)
    if (reducedMotion()) { el.style.visibility = open ? 'visible' : 'hidden'; return }
    const ctx = gsap.context(() => {
      if (open) {
        gsap.timeline()
          .set(el, { visibility: 'visible' })
          .fromTo(el, { clipPath: 'circle(0% at calc(100% - 3.5rem) 2.6rem)' }, { clipPath: 'circle(150% at calc(100% - 3.5rem) 2.6rem)', duration: 0.9, ease: 'power4.inOut' })
          .fromTo('.menu__link', { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.04 }, '-=0.45')
          .fromTo('.menu__aside > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6 }, '-=0.6')
      } else {
        gsap.to(el, { clipPath: 'circle(0% at calc(100% - 3.5rem) 2.6rem)', duration: 0.6, ease: 'power4.inOut', onComplete: () => gsap.set(el, { visibility: 'hidden' }) })
      }
    }, el)
    return () => ctx.kill()
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navigate = (e, id) => {
    e.preventDefault()
    if (open) { setOpen(false); setTimeout(() => go(id), 350) } else go(id)
  }

  return (
    <>
      <div className="progress" aria-hidden="true"><i /></div>
      <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <a href="#home" className="nav__brand" onClick={(e) => navigate(e, 'home')} data-cursor="hover" aria-label="Back to top">
          <span className="nav__mark">{profile.initials}</span>
          <span className="nav__name">{profile.shortName}<small>Founder · Khoka Tech</small></span>
        </a>

        <div className="nav__meta">
          {profile.available && <span className="nav__status"><i />Available for projects</span>}
          <span className="nav__time">Narayanganj · {time}</span>
        </div>

        <nav className="nav__links" aria-label="Primary">
          {sections.filter((s) => ['about', 'khoka-tech', 'work', 'services'].includes(s.id)).map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={(e) => navigate(e, s.id)} className={active === s.id ? 'is-active' : ''} data-cursor="hover">{s.label}</a>
          ))}
        </nav>

        <Magnetic as="button" type="button" className="nav__burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} data-cursor="hover">
          <span className="nav__burger-text">{open ? 'Close' : 'Menu'}</span>
          <span className="nav__burger-lines"><i /><i /></span>
        </Magnetic>
      </header>

      <div className="menu" id="menu" ref={menu} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open}>
        <div className="menu__glow" />
        <nav className="menu__nav">
          {sections.map((s, i) => (
            <div className="menu__item" key={s.id}>
              <a href={`#${s.id}`} className={`menu__link ${active === s.id ? 'is-active' : ''}`} onClick={(e) => navigate(e, s.id)} tabIndex={open ? 0 : -1} data-cursor="hover">
                <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="menu__label" data-text={s.label}>{s.label}</span>
                <span className="menu__hint">{s.hint}</span>
              </a>
            </div>
          ))}
        </nav>
        <aside className="menu__aside">
          <p className="mono-label">Get in touch</p>
          <a href={`mailto:${profile.email}`} className="menu__mail" tabIndex={open ? 0 : -1}>{profile.email}</a>
          <p className="mono-label">Khoka Tech</p>
          <a href={khokaTech.website} {...ext} tabIndex={open ? 0 : -1} className="menu__ext">Visit website <Icon name="arrowUpRight" size={16} /></a>
          <p className="mono-label">Based in</p>
          <p>{profile.location}</p>
        </aside>
      </div>

      <div className="wipe" aria-hidden="true"><span className="wipe__label" /></div>
    </>
  )
}
