import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 👇 Add this line
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// 👇 Register service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("A new version is available. Reload now?")) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline.")
  },
})
