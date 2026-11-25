import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import pages from './pages.json'
import './estilo.css'
import './motion.css'

const navigation = [
  ['index', 'Inicio'], ['proyectos', 'Proyectos'], ['servicios', 'Servicios'],
  ['quienes_somos', 'Nosotros'], ['contacto', 'Contacto']
]

function Brand() {
  return <a className="brand" href="index.html" aria-label="H y C Constructora, inicio">
    <img src="assets/monograma.png" alt="" /><span>CONSTRUCTORA</span>
  </a>
}

function Header({ page }) {
  return <header><div className="wrap head"><Brand />
    <nav id="nav" aria-label="Principal">
      {navigation.map(([path, label]) =>
        <a key={path} href={path + '.html'} aria-current={page === path ? 'page' : undefined}>{label}</a>)}
    </nav>
    <div className="head-actions">
      <button type="button" className="icon-btn" id="theme" aria-label="Modo oscuro" aria-pressed="false" title="Modo oscuro">◐</button>
      <a className="btn compact" href="contacto.html#solicitud">Cotizar obra</a>
      <button type="button" className="icon-btn" id="menu" aria-label="Menú de navegación" aria-controls="nav" aria-expanded="false">☰</button>
    </div>
  </div></header>
}

function Footer() {
  return <footer><div className="wrap footer-row"><Brand /><span>Chinandega, Nicaragua</span>
    <a href="mailto:info@hcconstructora.com">info@hcconstructora.com</a>
  </div></footer>
}

function App() {
  const name = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index'
  const page = pages[name] ? name : 'index'

  useEffect(() => {
    import('./sitio.js')
  }, [])

  return <>
    <a className="skip" href="#principal">Saltar al contenido</a>
    <Header page={page} />
    <main id="principal" dangerouslySetInnerHTML={{ __html: pages[page] }} />
    <Footer />
  </>
}

createRoot(document.getElementById('root')).render(<App />)
