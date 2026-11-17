import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/300-italic.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import 'lenis/dist/lenis.css'
import './index.css'

import App from './App.jsx'
import config from './config.js'
import { applyTheme } from './themes.js'

// Apply the colour theme before the first paint so there is no flash.
applyTheme(config.theme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
