import { useState } from 'react'
import { profile } from '../config/site'

/** Profile photo with automatic fallbacks: local file → previous portfolio → monogram. */
export default function Portrait({ className = '', eager = false }) {
  const sources = [profile.photo, profile.photoFallback].filter(Boolean)
  const [i, setI] = useState(0)
  if (i >= sources.length) {
    return (
      <div className={`portrait-fallback ${className}`} role="img" aria-label={profile.photoAlt}>
        <span>{profile.initials}</span>
        <small>Add your photo at public/images/profile.jpg</small>
      </div>
    )
  }
  return (
    <img
      className={className}
      src={sources[i]}
      alt={profile.photoAlt}
      width="900"
      height="900"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      onError={() => setI((n) => n + 1)}
    />
  )
}
