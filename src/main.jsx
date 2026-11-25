import React from 'react'
import { createRoot } from 'react-dom/client'

// Editorial type system (bundled locally — no Google Fonts requests)
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/900.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/700-italic.css'
import '@fontsource/anton/400.css'
import '@fontsource/oswald/400.css'
import '@fontsource/oswald/500.css'
import '@fontsource/oswald/600.css'
import '@fontsource/mrs-saint-delafield/400.css'
import '@fontsource-variable/manrope'

import './styles/base.css'
import './styles/editorial.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
