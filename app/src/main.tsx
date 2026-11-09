import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, MemoryRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { StoreProvider } from './store.tsx'

// Publié en page autonome (mode « artifact »), le routage reste en mémoire : l'hôte ne transmet pas les URL en #/chemin.
const Router = import.meta.env.MODE === 'artifact' ? MemoryRouter : HashRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </StrictMode>,
)
