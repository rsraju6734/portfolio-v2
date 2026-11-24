import { useEffect, useRef, useState } from 'react'
import { gsap, isTouch, reducedMotion } from '../lib/motion'
import { profile } from '../config/site'

/**
 * Transparent portrait cutout presented as a floating 3D hologram:
 * back-light orb, orbit ring passing behind AND in front of the body,
 * rim lighting, holographic scan sweep, floor glow and mouse-driven tilt.
 *
 * Returns null if the cutout image is missing so the hero can fall back
 * to the circular photo.
 */
export default function FloatingPortrait({ onMissing }) {
  const body = useRef(null)
  const [ok, setOk] = useState(true)
  const src = profile.portraitCutout

  useEffect(() => {
    const el = body.current
    if (!el || isTouch() || reducedMotion()) return
    gsap.set(el, { transformPerspective: 1100, transformOrigin: '50% 80%' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 1.2, ease: 'power3.out' })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 1.2, ease: 'power3.out' })
    const move = (e) => {
      const mx = e.clientX / window.innerWidth - 0.5
      const my = e.clientY / window.innerHeight - 0.5
      ry(mx * 16)
      rx(-my * 8)
      el.style.setProperty('--lx', `${50 + mx * 60}%`)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [ok])

  if (!src || !ok) return null

  const fail = () => { setOk(false); onMissing?.() }

  return (
    <div className="fp" data-depth="0.5">
      <div className="fp__orb" aria-hidden="true" />
      <div className="fp__ring fp__ring--back" aria-hidden="true" />
      <div className="fp__float">
        <div className="fp__body" ref={body}>
          <img
            className="fp__img"
            src={src}
            alt={profile.photoAlt}
            width="800"
            height="1000"
            decoding="async"
            fetchpriority="high"
            onError={fail}
          />
          <span className="fp__scan" aria-hidden="true" style={{ '--mask': `url("${src}")` }} />
        </div>
      </div>
      <div className="fp__ring fp__ring--front" aria-hidden="true" />
      <div className="fp__floor" aria-hidden="true" />
    </div>
  )
}
