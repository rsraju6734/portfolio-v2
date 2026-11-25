import { useState } from 'react'
import { profile, socials, contact, khokaTech, editorial } from '../config/site'
import { SectionLabel, Statement, hasLink, ext, Button } from '../components/ui'
import Icon from '../components/Icon'

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | demo | error
  const demo = !hasLink(contact.formEndpoint)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) e.subject = 'Please add a subject.'
    if (form.message.trim().length < 10) e.message = 'Please write a little more (10+ characters).'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    if (demo) { setState('demo'); return }
    setState('sending')
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('sent')
      setForm(empty)
    } catch {
      setState('error')
    }
  }

  const field = (k, label, props = {}) => (
    <div className={`field ${errors[k] ? 'has-error' : ''} ${form[k] ? 'is-filled' : ''}`}>
      {props.rows
        ? <textarea id={`f-${k}`} value={form[k]} onChange={set(k)} placeholder=" " aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />
        : <input id={`f-${k}`} value={form[k]} onChange={set(k)} placeholder=" " aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />}
      <label htmlFor={`f-${k}`}>{label}</label>
      <span className="field__line" />
      {errors[k] && <span className="field__error" id={`e-${k}`}>{errors[k]}</span>}
    </div>
  )

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <SectionLabel n="10">{editorial.contact.label}</SectionLabel>
          <Statement lead={editorial.contact.lead} accent={editorial.contact.accent} size="xl" />
          <p className="contact__text" data-reveal>{contact.text}</p>

          <div className="contact__direct" data-stagger>
            <a href={`mailto:${profile.email}`} className="contact__line" data-cursor="hover">
              <Icon name="email" size={22} /><span><small>Email</small>{profile.email}</span>
            </a>
            {profile.whatsapp && (
              <a href={`https://wa.me/${profile.whatsapp}`} {...ext} className="contact__line" data-cursor="hover">
                <Icon name="whatsapp" size={22} /><span><small>WhatsApp</small>{profile.whatsappDisplay}</span>
              </a>
            )}
            <div className="contact__line">
              <Icon name="pin" size={22} /><span><small>Location</small>{profile.location}</span>
            </div>
          </div>
        </div>

        <div className="contact__card" data-reveal="right">
          {state === 'sent' || state === 'demo' ? (
            <div className="contact__done" role="status">
              <span className={`contact__done-icon ${state === 'demo' ? 'is-demo' : ''}`}><Icon name={state === 'demo' ? 'info' : 'check'} size={34} /></span>
              {state === 'sent' ? (
                <>
                  <h3>Message sent — thank you!</h3>
                  <p className="muted">I've received your message and will reply to your email as soon as possible.</p>
                  <Button onClick={() => setState('idle')} variant="line" icon="arrow">Send another</Button>
                </>
              ) : (
                <>
                  <h3>Almost there!</h3>
                  <p className="muted">
                    This form is in <strong>demo mode</strong> — your message has <strong>not</strong> been sent yet.
                    Click below to open it in your email app, ready to send to {profile.email}.
                  </p>
                  <div className="contact__done-actions">
                    <Button href={mailto} icon="email">Send via email app</Button>
                    <Button onClick={() => setState('idle')} variant="line" icon="arrow">Edit message</Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <div className="form__head">
                <p className="label-sm">Send a message</p>
                {demo && <span className="badge badge--demo" title="No form service connected yet">Demo mode</span>}
              </div>
              <div className="form__row">
                {field('name', 'Your name', { autoComplete: 'name' })}
                {field('email', 'Email address', { type: 'email', autoComplete: 'email' })}
              </div>
              {field('subject', 'Subject')}
              {field('message', 'Tell me about your project', { rows: 5 })}
              {state === 'error' && <p className="form__error" role="alert">Sorry, the message could not be sent. Please email me directly at {profile.email}.</p>}
              <div className="form__foot">
                <Button as="button" onClick={undefined} type="submit" icon="arrow" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : 'Send message'}
                </Button>
                {demo && <p className="form__demo-note">Demo mode: no form service is connected, so messages open in your email app instead.</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const links = [['About', '#about'], ['Khoka Tech', '#khoka-tech'], ['Services', '#services'], ['Work', '#work'], ['Contact', '#contact']]
  const pick = (icon) => socials.find((s) => s.icon === icon && hasLink(s.url))
  const social = ['github', 'linkedin', 'fiverr', 'upwork', 'facebook', 'whatsapp'].map(pick).filter(Boolean)
  return (
    <footer className="footer">
      <div className="footer__top">
        <Button href="#contact" variant="dark">Let's talk</Button>
        <nav className="footer__nav" aria-label="Footer">
          {links.map(([l, h]) => <a key={h} href={h} data-cursor="hover">{l}</a>)}
        </nav>
      </div>
      <div className="footer__mid">
        <p className="footer__tagline">{profile.tagline}</p>
        <ul className="footer__social">
          {social.map((s) => (
            <li key={s.name}><a href={s.url} {...ext} aria-label={s.name} data-cursor="hover"><Icon name={s.icon} size={18} /></a></li>
          ))}
          <li><a href={`mailto:${profile.email}`} aria-label="Email" data-cursor="hover"><Icon name="email" size={18} /></a></li>
        </ul>
      </div>
      <p className="footer__giant" aria-hidden="true">{profile.shortName.toUpperCase()}</p>
      <div className="footer__bottom">
        <span>© {year} {profile.name}</span>
        <a href={khokaTech.website} {...ext}>Founder · {khokaTech.name}</a>
        <span>{profile.location}</span>
        <a href="#home" data-cursor="hover">Back to top ↑</a>
      </div>
    </footer>
  )
}
