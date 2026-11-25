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
  const services = [
    ['Construcción en general', 'Construcción en general'],
    ['Remodelaciones', 'Remodelaciones'],
    ['Diseño de planos', 'Diseño de planos'],
    ['Supervisión de proyectos', 'Supervisión de proyectos'],
    ['Propuestas de construcción', 'Propuestas de construcción']
  ]

  return <footer className="site-footer">
    <div className="wrap">
      <div className="footer-grid">
        <div className="footer-about">
          <Brand />
          <p className="footer-tagline">Edificando el futuro</p>
          <p>Diseño, construcción y supervisión de obras para viviendas, comercios y espacios que sirven a la comunidad.</p>
        </div>
        <div className="footer-column">
          <h2>Explora</h2>
          <ul>{navigation.map(([path, label]) =>
            <li key={path}><a href={path + '.html'}>{label}</a></li>
          )}</ul>
        </div>
        <div className="footer-column">
          <h2>Servicios</h2>
          <ul>{services.map(([label, service]) =>
            <li key={service}><a href={'contacto.html?servicio=' + encodeURIComponent(service) + '#solicitud'}>{label}</a></li>
          )}</ul>
          <a className="footer-services-link" href="servicios.html">Ver todos los servicios</a>
        </div>
        <div className="footer-column footer-contact">
          <h2>Contacto y horario</h2>
          <ul>
            <li><span>Teléfono</span><a href="tel:+50588888888">+505 8888 8888</a></li>
            <li><span>Correo</span><a href="mailto:info@hcconstructora.com">info@hcconstructora.com</a></li>
            <li><span>Ubicación</span>Chinandega, Nicaragua</li>
            <li><span>Horario</span>Lunes a viernes, 8:00 a 17:00<br />Sábado, 8:00 a 12:00</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} H&amp;C Constructora. Todos los derechos reservados.</p>
        <a href="contacto.html#solicitud">Hablemos de tu proyecto</a>
      </div>
    </div>
  </footer>
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
