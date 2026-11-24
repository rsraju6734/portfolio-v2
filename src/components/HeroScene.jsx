import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { reducedMotion, isMobile } from '../lib/motion'

/* Iridescent fresnel material — cheap, no textures, looks like glass light. */
const irisVertex = /* glsl */ `
  varying vec3 vN; varying vec3 vV; varying vec3 vP;
  void main(){
    vec4 mv = modelViewMatrix * vec4(position,1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    vP = position;
    gl_Position = projectionMatrix * mv;
  }`
const irisFragment = /* glsl */ `
  uniform float uTime; uniform float uAlpha; uniform float uShift;
  varying vec3 vN; varying vec3 vV; varying vec3 vP;
  vec3 pal(float t){
    return vec3(0.45,0.5,0.85) + vec3(0.45,0.4,0.25)*cos(6.28318*(vec3(0.9,0.8,0.6)*t + vec3(0.55,0.35,0.15)));
  }
  void main(){
    float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
    vec3 col = pal(f*0.9 + vP.y*0.25 + uTime*0.05 + uShift);
    vec3 core = vec3(0.02,0.03,0.09);
    vec3 c = mix(core, col, 0.25 + f*0.95);
    gl_FragColor = vec4(c, (0.35 + f*0.75) * uAlpha);
  }`

const particleVertex = /* glsl */ `
  uniform float uTime; uniform float uPx; attribute float aSize; attribute float aSeed;
  varying float vSeed;
  void main(){
    vec3 p = position;
    p.y += sin(uTime*0.25 + aSeed*6.28)*0.25;
    p.x += cos(uTime*0.2 + aSeed*4.0)*0.2;
    vec4 mv = modelViewMatrix * vec4(p,1.0);
    gl_PointSize = aSize * uPx * (14.0 / -mv.z);
    vSeed = aSeed;
    gl_Position = projectionMatrix * mv;
  }`
const particleFragment = /* glsl */ `
  uniform float uTime; varying float vSeed;
  void main(){
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    float tw = 0.55 + 0.45*sin(uTime*1.5 + vSeed*30.0);
    vec3 c = mix(vec3(0.0,0.88,1.0), vec3(0.55,0.35,1.0), vSeed);
    gl_FragColor = vec4(c, a*a*tw*0.9);
  }`

const ringFragment = /* glsl */ `
  uniform float uTime; varying vec2 vUv;
  void main(){
    float g = 0.5 + 0.5*sin(vUv.x*6.28318*2.0 - uTime*0.8);
    vec3 c = mix(vec3(0.0,0.88,1.0), vec3(0.48,0.24,1.0), g);
    gl_FragColor = vec4(c, 0.18 + g*0.55);
  }`
const ringVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`

export default function HeroScene() {
  const mount = useRef(null)

  useEffect(() => {
    const host = mount.current
    if (!host) return
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile(), alpha: true, powerPreference: 'high-performance' })
    } catch {
      host.classList.add('no-webgl') // CSS gradient fallback
      return
    }
    const mobile = isMobile()
    const still = reducedMotion()
    const dpr = Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.6)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 12)

    const uniforms = { uTime: { value: 0 } }
    const irisMat = (shift, alpha = 1) =>
      new THREE.ShaderMaterial({
        vertexShader: irisVertex,
        fragmentShader: irisFragment,
        uniforms: { uTime: uniforms.uTime, uAlpha: { value: alpha }, uShift: { value: shift } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })

    // ---- floating geometric objects
    const group = new THREE.Group()
    scene.add(group)
    const objects = []
    const add = (geo, mat, pos, scale, speed) => {
      const m = new THREE.Mesh(geo, mat)
      m.position.set(...pos)
      m.scale.setScalar(scale)
      m.userData = { base: new THREE.Vector3(...pos), speed, phase: Math.random() * 10 }
      group.add(m)
      objects.push(m)
      return m
    }
    const seg = mobile ? 0.5 : 1
    add(new THREE.TorusKnotGeometry(1, 0.32, Math.round(160 * seg), Math.round(24 * seg)), irisMat(0.0), [-5.2, 2.2, -2], mobile ? 0.55 : 0.85, 0.35)
    add(new THREE.IcosahedronGeometry(1, 0), irisMat(0.3), [5.4, -2.1, -1], mobile ? 0.6 : 0.95, 0.5)
    add(new THREE.OctahedronGeometry(1, 0), irisMat(0.6), [4.6, 3.1, -4], 0.6, 0.6)
    add(new THREE.TorusGeometry(1, 0.08, 16, Math.round(90 * seg)), irisMat(0.15), [-4.3, -2.8, -1.5], 0.9, 0.45)
    add(new THREE.TetrahedronGeometry(1, 0), irisMat(0.8), [-1.8, 3.6, -5], 0.45, 0.7)
    add(new THREE.DodecahedronGeometry(1, 0), irisMat(0.45), [1.5, -3.8, -3], 0.4, 0.8)
    // wireframe shells for a "blueprint" feel
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.5, 1)),
      new THREE.LineBasicMaterial({ color: 0x2f6bff, transparent: true, opacity: 0.35 }),
    )
    wire.position.set(5.4, -2.1, -1)
    group.add(wire)

    // ---- glowing rings orbiting the portrait area
    const ringMat = new THREE.ShaderMaterial({
      vertexShader: ringVertex, fragmentShader: ringFragment, uniforms: { uTime: uniforms.uTime },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    })
    const rings = new THREE.Group()
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.012, 8, 200), ringMat)
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.008, 8, 200), ringMat)
    r1.rotation.set(1.2, 0.2, 0)
    r2.rotation.set(1.35, -0.35, 0.4)
    rings.add(r1, r2)
    rings.position.set(mobile ? 0 : 2.4, mobile ? 1 : 0, -2)
    scene.add(rings)

    // ---- particles
    const count = mobile ? 420 : 1300
    const pos = new Float32Array(count * 3)
    const size = new Float32Array(count)
    const seed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4
      size[i] = Math.random() * 2.2 + 0.4
      seed[i] = Math.random()
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
    pGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    const pMat = new THREE.ShaderMaterial({
      vertexShader: particleVertex, fragmentShader: particleFragment,
      uniforms: { uTime: uniforms.uTime, uPx: { value: dpr } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    // ---- sizing
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w < 768 ? 15 : 12
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // ---- interaction
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // ---- render loop (only while visible)
    const clock = new THREE.Clock()
    let raf = 0
    let visible = true
    const frame = () => {
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.2)

      camera.position.x = mouse.x * 0.9
      camera.position.y = -mouse.y * 0.6 - scroll * 1.5
      camera.lookAt(0, -scroll * 1.5, 0)

      objects.forEach((m, i) => {
        const { base, speed, phase } = m.userData
        m.rotation.x = t * speed * 0.6 + phase
        m.rotation.y = t * speed * 0.8 + mouse.x * 0.5
        m.position.y = base.y + Math.sin(t * speed + phase) * 0.35 + scroll * (i % 2 ? 2 : 1.2)
        m.position.x = base.x + Math.cos(t * speed * 0.7 + phase) * 0.15
      })
      wire.rotation.y = -t * 0.15
      wire.rotation.x = t * 0.08
      rings.rotation.z = t * 0.06
      rings.rotation.y = mouse.x * 0.25
      points.rotation.y = t * 0.012 + mouse.x * 0.05

      renderer.render(scene, camera)
    }
    const loop = () => {
      frame()
      raf = requestAnimationFrame(loop)
    }
    const start = () => { if (!raf && !still) raf = requestAnimationFrame(loop) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    if (still) frame()
    else start()

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      visible && !document.hidden ? start() : stop()
    })
    io.observe(host)
    const onVis = () => (document.hidden || !visible ? stop() : start())
    document.addEventListener('visibilitychange', onVis)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('mousemove', onMove)
      scene.traverse((o) => {
        o.geometry?.dispose()
        if (o.material) [].concat(o.material).forEach((m) => m.dispose())
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="hero__scene" ref={mount} aria-hidden="true" />
}
