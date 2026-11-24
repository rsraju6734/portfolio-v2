import React from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/syne/500.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource-variable/manrope'

import './styles/base.css'
import './styles/sections.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
