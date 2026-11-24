import {
  siGithub, siFacebook, siFiverr, siUpwork, siWhatsapp, siInstagram, siYoutube, siGmail,
} from 'simple-icons'

/* Brand icons come from the open-source Simple Icons set (CC0).
   LinkedIn and PeoplePerHour are drawn by hand below. */
const brand = {
  github: siGithub,
  facebook: siFacebook,
  fiverr: siFiverr,
  upwork: siUpwork,
  whatsapp: siWhatsapp,
  instagram: siInstagram,
  youtube: siYoutube,
  gmail: siGmail,
}

export const brandColor = {
  github: '#ffffff',
  linkedin: '#0a66c2',
  facebook: '#0866ff',
  fiverr: '#1dbf73',
  upwork: '#14a800',
  pph: '#ff5a1f',
  whatsapp: '#25d366',
  email: '#00e0ff',
  instagram: '#ff0069',
  youtube: '#ff0000',
  globe: '#7a3cff',
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

/* Line icons (24×24) for services, skills and UI */
const line = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  grid: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><path d="M3.5 9.5h17M3.5 15h17M9.5 3.5v17" /></>,
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8.5 13.2 11l2.3 1-2.3 1L12 15.5 10.8 13l-2.3-1 2.3-1z" /></>,
  keyboard: <><rect x="2.5" y="6" width="19" height="12" rx="2.5" /><path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M7.5 14h9" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.5 3.9 5.5 3.9 9s-1.3 6.5-3.9 9c-2.6-2.5-3.9-5.5-3.9-9S9.4 5.5 12 3z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  database: <><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" /><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" /></>,
  sheet: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 8.5h16M4 14h16M10 8.5V21" /></>,
  cart: <><path d="M3 4h2.2l2.3 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.3" /><circle cx="9.5" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></>,
  bot: <><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5M2 12.5v2M22 12.5v2" /><circle cx="12" cy="3.5" r="1" /></>,
  layout: <><rect x="2.5" y="4" width="19" height="14" rx="2" /><path d="M2.5 8h19M8 21h8M12 18v3" /></>,
  email: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>,
  pin: <><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  menu: <path d="M4 8h16M4 16h10" />,
}

export default function Icon({ name, size = 22, className = '', title }) {
  const b = brand[name]
  if (b) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
        <path d={b.path} />
      </svg>
    )
  }
  if (name === 'linkedin') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={!title} aria-label={title}>
        <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="currentColor" />
        <g fill="#04060f">
          <rect x="5.4" y="9.6" width="3" height="8.6" rx=".4" />
          <circle cx="6.9" cy="6.6" r="1.75" />
          <path d="M10.6 9.6h2.9v1.3c.5-.9 1.6-1.55 3.05-1.55 2.55 0 3.15 1.65 3.15 3.85v5h-3v-4.4c0-1.1-.2-2-1.35-2-1.2 0-1.75.85-1.75 2.05v4.35h-3z" />
        </g>
      </svg>
    )
  }
  if (name === 'pph') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden={!title} aria-label={title}>
        <circle cx="12" cy="12" r="10.5" fill="currentColor" />
        <text x="12" y="15.6" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="9.5" fill="#04060f">pph</text>
      </svg>
    )
  }
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden={!title} aria-label={title}>
      {line[name] ?? line.spark}
    </svg>
  )
}
