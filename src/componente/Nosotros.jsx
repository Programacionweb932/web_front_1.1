import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import "../styles/Nosotros.css";
import logo from '../assets/mundo.ico';

const Nosotros = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="Nosotros-container">
      {/* HEADER CON MENÚ HAMBURGUESA */}
      <header>
        <img src={logo} className="icono" alt="icono"/>
        <h1>EL MUNDO DE LA TECNOLOGÍA</h1>
        
        {/* Botón hamburguesa para móviles */}
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Menú normal para desktop */}
        <div className="desktop-menu">
          <Link to="/" className="btn-nav">Inicio</Link>
          <Link to="/contactenos" className="btn-nav">Contactenos</Link>
          <Link to="/blog" className="btn-nav">Ver Blog</Link>
          <Link to="/login" className="btn-nav">Iniciar Sesión</Link>
          <Link to="/registro" className="btn-nav">Registrarse</Link>
        </div>
        
        {/* Menú móvil desplegable */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="btn-nav" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/contactenos" className="btn-nav" onClick={() => setMenuOpen(false)}>Contactenos</Link>
          <Link to="/blog" className="btn-nav" onClick={() => setMenuOpen(false)}>Ver Blog</Link>
          <Link to="/login" className="btn-nav" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
          <Link to="/registro" className="btn-nav" onClick={() => setMenuOpen(false)}>Registrarse</Link>
        </div>
      </header>

      {/* SECCIÓN QUIÉNES SOMOS */}
      <div className="section-container">
        <div className="text-content">
          <h1 className="nosotros-h1">Quiénes Somos</h1>
          <p className="nosotros-p">
            Somos un equipo de profesionales en el campo de las tecnologías de la información, 
            liderados por Juan Pablo Granja, Kevin Alexis Rivas y Tatiana Montoya, cuyo principal objetivo es ofrecer un excelente servicio a nuestros clientes. 
            Siempre estamos constantemente aprendiendo y buscando nuevas soluciones para enfrentar los desafíos del mercado de sistemas. 
            Nuestra empresa está impulsada por la pasión de crecer y ofrecer el mejor servicio posible, buscando siempre la satisfacción total de nuestros clientes. 
            Estamos comprometidos a mantenernos actualizados y evolucionar constantemente para estar al día con los cambios y demandas del mercado tecnológico.
          </p>
        </div>
        <img className="section-image" src="/image nosotros/quienes somos.jpeg" alt="Quiénes Somos" />
      </div>

      {/* SECCIÓN VISIÓN */}
      <div className="section-container reverse">
        <img className="section-image" src="/image nosotros/vision.jpg" alt="Visión" />
        <div className="text-content">
          <h1 className="nosotros-h1">Visión</h1>
          <p className="nosotros-p">
            Ser la empresa líder en soluciones tecnológicas innovadoras, reconocida por la excelencia de nuestros servicios y el compromiso con la experiencia del cliente.
            Para 2030, aspiramos a transformar la forma en que personas y organizaciones se relacionan con la tecnología, ofreciendo soluciones inteligentes, seguras y sostenibles,
            adaptadas a un entorno global en constante evolución. Impulsamos el cambio mediante la integración de tecnologías emergentes, fomentando una transformación digital que genere valor, confianza e impacto positivo en la sociedad.
          </p>
        </div>
      </div>

      {/* SECCIÓN MISIÓN */}
      <div className="section-container">
        <div className="text-content">
          <h1 className="nosotros-h1">Misión</h1>
          <p className="nosotros-p">
            Brindar servicios tecnológicos de alta calidad, enfocados en la innovación, la actualización constante y la satisfacción del cliente.
            Nuestro equipo de profesionales trabaja con pasión y compromiso para ofrecer soluciones personalizadas en el área de tecnologías de la información, 
            ayudando a nuestros clientes a optimizar sus procesos y afrontar los desafíos del mundo digital con éxito.
          </p>
        </div>
        <img className="section-image" src="/image nosotros/mision.jpeg" alt="Misión" />
      </div>
    </div>
  );
};

export default Nosotros;