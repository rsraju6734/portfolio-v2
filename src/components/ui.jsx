import { Fragment, useEffect, useRef } from 'react'
import { gsap, isTouch, reducedMotion, splitChars } from '../lib/motion'
import Icon from './Icon'

/** Heading whose characters animate in one by one (see lib/reveals.js). */
export function SplitText({ text, as: Tag = 'span', className = '', ...rest }) {
  return (
    <Tag className={`split ${className}`} data-split aria-label={text} {...rest}>
      {splitChars(text).map((w, i) => (
        <Fragment key={i}>
          <span className="word" aria-hidden="true">
            {w.chars.map((c, j) => (
              <span className="ch-wrap" key={j}><span className="ch">{c}</span></span>
            ))}
          </span>
          {w.space && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}

/** Section eyebrow label, e.g. "02 — About" */
export function Eyebrow({ index, children }) {
  return (
    <p className="eyebrow" data-reveal>
      {index && <span className="eyebrow__num">{index}</span>}
      <span className="eyebrow__line" />
      <span>{children}</span>
    </p>
  )
}

/** Buttons / links that are gently pulled toward the cursor. */
export function Magnetic({ as: Tag = 'a', strength = 0.35, className = '', children, ...rest }) {
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

/** Primary / ghost call-to-action with a liquid fill hover. */
export function Button({ href, onClick, variant = 'primary', icon = 'arrowUpRight', children, external, ...rest }) {
  const props = href
    ? { as: 'a', href, onClick, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { as: 'button', type: 'button', onClick }
  return (
    <Magnetic {...props} className={`btn btn--${variant}`} data-cursor="hover" {...rest}>
      <span className="btn__fill" />
      <span className="btn__label">{children}</span>
      {icon && <span className="btn__icon"><Icon name={icon} size={18} /></span>}
    </Magnetic>
  )
}

/** Mouse-tracked 3D tilt for cards (desktop only). */
export function useTilt(max = 8) {
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

/** Spotlight that follows the cursor inside a container (sets --mx/--my). */
export function useSpotlight() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || isTouch()) return
    const move = (e) => {
      const cards = el.querySelectorAll('[data-spot]')
      cards.forEach((c) => {
        const r = c.getBoundingClientRect()
        c.style.setProperty('--mx', `${e.clientX - r.left}px`)
        c.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])
  return ref
}

/** Returns true when a URL is set (empty / placeholder links are hidden). */
export const hasLink = (url) => typeof url === 'string' && url.trim() !== '' && !url.startsWith('[')

export const ext = { target: '_blank', rel: 'noopener noreferrer' }
