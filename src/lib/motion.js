import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches

export const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

let lenis = null

/** Smooth scrolling (desktop + mobile), synced with GSAP ScrollTrigger. */
export function initSmoothScroll() {
  if (lenis || reducedMotion()) return null
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false, // keep native momentum scrolling on phones
    anchors: true, // smooth-scroll plain #links too
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis && lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

/** Scroll to an element or y position, smooth when possible. */
export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (lenis) {
    lenis.scrollTo(el ?? 0, { immediate, offset, duration: immediate ? 0 : 1.4, force: true })
  } else {
    const y = el ? el.getBoundingClientRect().top + window.scrollY + offset : 0
    window.scrollTo({ top: y, behavior: immediate || reducedMotion() ? 'auto' : 'smooth' })
  }
}

export function lockScroll(lock) {
  if (lenis) lock ? lenis.stop() : lenis.start()
  document.documentElement.classList.toggle('is-locked', lock)
}

/** Wrap each character of a string in spans for character reveals. */
export function splitChars(text) {
  return text.split(' ').map((word, wi, arr) => ({
    word,
    chars: [...word],
    space: wi < arr.length - 1,
  }))
}
