import { Fragment, useEffect, useRef } from 'react'
import { gsap, isTouch, reducedMotion } from '../lib/motion'
import Icon from './Icon'

/** Splits text into words that rise out of a mask (see lib/reveals.js). */
export function Words({ text, className = '' }) {
  return (
    <span className={`words ${className}`} aria-label={text}>
      {text.split(' ').map((w, i, arr) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true"><span className="wi">{w}</span></span>
          {i < arr.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}

/**
 * The editorial statement: condensed cream lead + oversized red accent that
 * overlaps the line above it — e.g. "WEBSITES AREN'T ABOUT / CODE."
 */
export function Statement({ lead, accent, as: Tag = 'h2', size = 'xl', className = '', accentStyle = 'cond' }) {
  return (
    <Tag className={`statement statement--${size} ${className}`} data-words>
      {lead && <span className="statement__lead"><Words text={lead} /></span>}
      {accent && <span className={`statement__accent statement__accent--${accentStyle}`}><Words text={accent} /></span>}
    </Tag>
  )
}

/** Section label:  / 01 — THE APPROACH  with a short rule underneath. */
export function SectionLabel({ n, children }) {
  return (
    <div className="slabel" data-reveal="left">
      <p><span className="slabel__slash">/</span> {n} <span className="slabel__dash">—</span> <span className="slabel__txt">{children}</span></p>
      <span className="slabel__rule" />
    </div>
  )
}

/** Buttons / links that are gently pulled toward the cursor. */
export function Magnetic({ as: Tag = 'a', strength = 0.3, className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || isTouch() || reducedMotion()) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])
  return <Tag ref={ref} className={`magnetic ${className}`} {...rest}>{children}</Tag>
}

/**
 * Small editorial button: "LET'S TALK →".
 * variant: 'red' (filled crimson) | 'dark' (black with crimson text) | 'line' (outlined)
 */
export function Button({ href, onClick, variant = 'red', icon = 'arrow', children, external, ...rest }) {
  const props = href
    ? { as: 'a', href, onClick, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { as: 'button', type: 'button', onClick }
  return (
    <Magnetic {...props} className={`btn btn--${variant}`} data-cursor="hover" {...rest}>
      <span className="btn__fill" />
      <span className="btn__label">{children}</span>
      {icon && <span className="btn__icon"><Icon name={icon} size={15} /></span>}
    </Magnetic>
  )
}

/** Mouse-tracked 3D tilt for cards (desktop only). */
export function useTilt(max = 6) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || isTouch() || reducedMotion()) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    gsap.set(el, { transformPerspective: 900 })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      ry((px - 0.5) * max * 2)
      rx((0.5 - py) * max * 2)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
    const leave = () => { rx(0); ry(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [max])
  return ref
}

/** Returns true when a URL is set (empty / placeholder links are hidden). */
export const hasLink = (url) => typeof url === 'string' && url.trim() !== '' && !url.startsWith('[')

export const ext = { target: '_blank', rel: 'noopener noreferrer' }

/** Absolute URL for a public asset (needed inside CSS custom properties). */
export const assetUrl = (p) => new URL(p, document.baseURI).href
