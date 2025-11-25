import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contacto.css';
import logo from '../assets/mundo.ico';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const Contacto = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="contacto-container">

      {/* HEADER CON HAMBURGUESA */}
      <header className="header-contacto">
        <div className="hamburger-container">
          <img src={logo} className="icono" alt="icono" />
          <h1>EL MUNDO DE LA TECNOLOGÍA</h1>
        </div>

        {/* Menú de escritorio */}
        <div className="desktop-menu">
          <Link to="/" className="btn-nav">Inicio</Link>
          <Link to="/blog" className="btn-nav">Blog</Link>
          <Link to="/quienes-somos" className="btn-nav">Quienes Somos</Link>
          <Link to="/login" className="btn-nav">Iniciar Sesión</Link>
          <Link to="/registro" className="btn-nav">Registrarse</Link>
        </div>

        {/* Botón hamburguesa */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú desplegable móvil */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="btn-nav" onClick={toggleMenu}>Inicio</Link>
          <Link to="/blog" className="btn-nav" onClick={toggleMenu}>Blog</Link>
          <Link to="/quienes-somos" className="btn-nav" onClick={toggleMenu}>Quienes Somos</Link>
          <Link to="/login" className="btn-nav" onClick={toggleMenu}>Iniciar Sesión</Link>
          <Link to="/registro" className="btn-nav" onClick={toggleMenu}>Registrarse</Link>
        </div>
      </header>

      {/* Resto de tu contenido permanece igual */}
      <h1 className="contacto-title">¡CONTACTENOS!</h1>
      <p><strong>Dirección:</strong> Diagonal 28d # t33g40 B/ El Paraiso<br />Cali, Valle del Cauca, Colombia</p>
      <p><strong>Correo:</strong> mundodelatecnologia05@gmail.com</p>
      <p><strong>Teléfono:</strong> 3052932750</p>

      <p><strong>Visita Nuestras Redes Sociales <br></br>⬇️⬇️⬇️</strong></p>
      <div className="social-container">
        <a href="https://www.facebook.com/profile.php?id=100078258196205&sk=about" target="_blank" rel="noopener noreferrer">
          <FaFacebook className='social-icon' />
        </a>
        <a href="https://www.instagram.com/elmundo_de_la_tecnologia_/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://wa.me/573052939750" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="social-icon" />
        </a>
        <a href="https://www.tiktok.com/@elmundodelatecnologia52?_t=ZS-8wDg2X8EirV&_r=1" target="_blank" rel="noopener noreferrer">
          <FaTiktok className="social-icon" />
        </a>
      </div>

      <div className="map-container">
        <iframe
          title="Ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8788264432737!2d-76.53087922583765!3d3.4348206965187175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6c8b0ab52b7%3A0xd5bb69e02b0a2e39!2sCalle%2054a%20%2335-33%2C%20Comuna%2015%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1715049412735!5m2!1ses!2sco"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

    </div>
  );
};

export default Contacto;