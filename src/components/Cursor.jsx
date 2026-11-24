import { useEffect, useRef } from 'react'
import { gsap, isTouch, reducedMotion } from '../lib/motion'

/** Custom desktop cursor: precise dot + lagging ring that reacts to links. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (isTouch()) return
    document.documentElement.classList.add('has-cursor')
    const slow = reducedMotion() ? 0.01 : 0.45
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' })
    const rx = gsap.quickTo(ring.current, 'x', { duration: slow, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: slow, ease: 'power3' })

    const move = (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`)
    }
    const over = (e) => {
      const t = e.target.closest('a, button, [data-cursor], input, textarea, select, label')
      const r = ring.current
      if (!t) { r.className = 'cursor-ring'; label.current.textContent = ''; return }
      const kind = t.dataset.cursor
      if (kind === 'view') {
        r.className = 'cursor-ring is-view'
        label.current.textContent = t.dataset.cursorLabel || 'View'
      } else if (t.matches('input, textarea, select')) {
        r.className = 'cursor-ring is-text'
        label.current.textContent = ''
      } else {
        r.className = 'cursor-ring is-hover'
        label.current.textContent = ''
      }
    }
    const down = () => ring.current.classList.add('is-down')
    const up = () => ring.current.classList.remove('is-down')
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 })
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true"><span ref={label} /></div>
    </>
  )
}
