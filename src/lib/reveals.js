import { gsap, ScrollTrigger, reducedMotion, isMobile } from './motion'

/**
 * Global scroll-triggered animations driven by data attributes, so
 * components stay simple:
 *
 *   data-reveal            fade + rise when scrolled into view
 *   data-reveal="left|right|scale|clip"
 *   data-split             character-by-character heading reveal
 *                          (use <SplitText> to produce the markup)
 *   data-stagger           reveal direct children one after another
 *   data-parallax="0.2"    gentle parallax drift (desktop only)
 *   data-count="600"       count up a verified number
 */
export function initReveals(root = document) {
  const ctx = gsap.context(() => {
    if (reducedMotion()) {
      gsap.set('[data-reveal],[data-stagger] > *,[data-split] .ch', { clearProps: 'all', opacity: 1 })
      root.querySelectorAll('[data-count]').forEach((el) => (el.textContent = el.dataset.count))
      return
    }

    root.querySelectorAll('[data-reveal]').forEach((el) => {
      const type = el.dataset.reveal || 'up'
      const from = {
        up: { y: 60, opacity: 0 },
        left: { x: -70, opacity: 0 },
        right: { x: 70, opacity: 0 },
        scale: { scale: 0.88, opacity: 0 },
        clip: { clipPath: 'inset(0 0 100% 0)', y: 30 },
      }[type] || { y: 60, opacity: 0 }
      const to = type === 'clip'
        ? { clipPath: 'inset(0 0 0% 0)', y: 0 }
        : { x: 0, y: 0, scale: 1, opacity: 1 }
      gsap.fromTo(el, from, {
        ...to,
        duration: 1.1,
        ease: 'expo.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    root.querySelectorAll('[data-stagger]').forEach((el) => {
      gsap.fromTo(el.children, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
    })

    root.querySelectorAll('[data-split]').forEach((el) => {
      if (el.closest('[data-hero]')) return // hero handles its own intro
      gsap.fromTo(el.querySelectorAll('.ch'), { yPercent: 110, rotate: 8, opacity: 0 }, {
        yPercent: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.018,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    root.querySelectorAll('[data-count]').forEach((el) => {
      const end = parseFloat(el.dataset.count)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: end, duration: 2, ease: 'power3.out',
        onUpdate: () => (el.textContent = Math.round(obj.v)),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })

    if (!isMobile()) {
      root.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2
        gsap.to(el, {
          yPercent: -100 * speed, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }
  }, root)

  ScrollTrigger.refresh()
  return () => ctx.revert()
}
