import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { 
  FaShieldAlt, 
  FaLaptop, 
  FaHeadset, 
  FaFileWord, 
  FaTools, 
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight 
} from "react-icons/fa";
import logo from '../assets/mundo.ico';
import "../styles/LandinPage.css";

// Componentes reutilizables
const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <Link to="/login" className="learn-more">
      Más información <FaArrowRight />
    </Link>
  </div>
);

const TestimonialCard = ({ name, role, text }) => (
  <div className="testimonial-card">
    <div className="testimonial-content">
      <p>"{text}"</p>
    </div>
    <div className="testimonial-author">
      <strong>{name}</strong>
      <span>{role}</span>
    </div>
  </div>
);

const NavigationMenu = ({ isMobile, isOpen, onItemClick }) => {
  const menuItems = [
    { path: "/quienes-somos", label: "Quiénes Somos" },
    { path: "/contactenos", label: "Contacto" },
    { path: "/blog", label: "Blog" },
    { path: "/login", label: "Iniciar Sesión" },
    { path: "/registro", label: "Registrarse"}
  ];

  return (
    <div className={isMobile ? `mobile-menu ${isOpen ? 'open' : ''}` : 'desktop-menu'}>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`btn-nav ${item.isPrimary ? 'primary' : ''}`}
          onClick={isMobile ? onItemClick : null}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const particlesOptions = {
  background: {
    color: "#ffffff"
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "grab",
        parallax: {
          enable: true,
          force: 60,
          smooth: 10
        }
      },
      resize: true
    },
    modes: {
      push: {
        quantity: 4
      },
      grab: {
        distance: 140,
        lineLinked: {
          opacity: 1
        }
      }
    }
  },
  particles: {
    color: {
      value: "#4f46e5"
    },
    links: {
      color: "#4f46e5",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
};

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const services = [
    {
      icon: <FaShieldAlt />,
      title: "Mantenimientos Preventivos",
      description: "Automatizamos la asignación y recordatorios de citas para mantener tus equipos en óptimas condiciones."
    },
    {
      icon: <FaLaptop />,
      title: "Instalación de Sistemas Operativos",
      description: "Instalamos sistemas operativos de forma rápida y segura, con todos los drivers actualizados."
    },
    {
      icon: <FaHeadset />,
      title: "Asistencia Remota",
      description: "Soporte técnico inmediato con notificaciones en tiempo real sin necesidad de desplazamientos."
    },
    {
      icon: <FaFileWord />,
      title: "Instalación de Microsoft Office",
      description: "Configuración profesional con herramientas personalizadas para pacientes y administradores."
    },
    {
      icon: <FaTools />,
      title: "Reparación de Portátiles y PC",
      description: "Diagnóstico y reparación de hardware y software, incluyendo cambio de piezas y optimización."
    }
  ];

  const testimonials = [
    {
      name: "Liseth Mendez",
      role: "Asesora Televentas",
      text: "Excelente servicio de mantenimiento preventivo, mis equipos nunca habían funcionado tan bien."
    },
    {
      name: "Karla Noguera",
      role: "Asesora Comercial",
      text: "Rápida instalación de mi sistema operativo con todos los programas que necesitaba."
    },
    {
      name: "Mayerlin Villareal",
      role: "Estudiante y Asesora Comercial",
      text: "La asistencia remota me salvó cuando tenía un trabajo importante que entregar."
    }
  ];

  return (
    <div className="landing-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />

      <header className={`${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <img src={logo} className="icono" alt="icono"/>
          <h1>EL MUNDO DE LA TECNOLOGÍA</h1>
        </div>
        
        <NavigationMenu isMobile={false} />
        
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <NavigationMenu isMobile={true} isOpen={menuOpen} onItemClick={closeMenu} />
      </header>

      <HeroSection />
      
      <ServicesSection services={services} />
      
      <TestimonialsSection testimonials={testimonials} />
      
      <FinalCTASection />
      
      <FooterSection logo={logo} />
    </div>
  );
};

// Componentes de flechas personalizadas
const PrevArrow = ({ onClick }) => (
  <button className="slick-arrow slick-prev" onClick={onClick}>
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button className="slick-arrow slick-next" onClick={onClick}>
    <FaChevronRight />
  </button>
);

const ImageGallery = () => {
  const galleryImages = [
    {
      src: "/public/galeria/mantenimiento.jpg",
      alt: "Servicio de mantenimiento",
      title: "Mantenimiento de Equipos"
    },
    {
      src: "/public/galeria/tecnolo.jpg",
      alt: "Instalación de sistemas",
      title: "Instalación de Software"
    },
    {
      src: "/public/galeria/soporte.jpg",
      alt: "Soporte técnico",
      title: "Soporte Técnico Profesional"
    },
    {
      src: "/public/galeria/reparacion.jpg",
      alt: "Reparación de equipos",
      title: "Reparación de Computadoras"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'linear',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {galleryImages.map((image, index) => (
          <div key={index} className="slider-item">
            <div className="slider-content">
              <img src={image.src} alt={image.alt} />
              <div className="slider-title">
                <h3>{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const HeroSection = () => (
  <section className="hero">
    <div className="hero-content">
      <h2>Bienvenido a El Mundo De La Tecnología</h2>
      <p>Explora soluciones innovadoras en mantenimiento, instalación y asistencia técnica para optimizar tu experiencia digital.</p>
      <div className="cta-buttons">
        <Link to="/registro" className="btn primary">Comenzar Ahora</Link>
        <Link to="/login" className="btn secondary">Ver Servicios</Link>
      </div>
      <ImageGallery />
    </div>
  </section>
);

const ServicesSection = ({ services }) => (
  <section className="services">
    <h2>Nuestros Servicios</h2>
    <div className="services-grid">
      {services.map((service, index) => (
        <ServiceCard 
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  </section>
);

const TestimonialsSection = ({ testimonials }) => (
  <section className="testimonials">
    <h2>Lo que dicen nuestros clientes</h2>
    <div className="testimonials-grid">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard 
          key={index}
          name={testimonial.name}
          role={testimonial.role}
          text={testimonial.text}
        />
      ))}
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="final-cta">
    <h2>¿Listo para optimizar tu experiencia tecnológica?</h2>
    <Link to="/registro" className="btn primary large">Regístrate Gratis</Link>
  </section>
);

const FooterSection = ({ logo }) => (
  <footer>
    <div className="footer-content">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
        <span>EL MUNDO DE LA TECNOLOGÍA</span>
      </div>
      <div className="footer-links">
        <Link to="/contactenos">Contacto</Link>
        <Link to="/terminos">Términos</Link>
        <Link to="/privacidad">Privacidad</Link>
      </div>
    </div>
  </footer>
);

export default LandingPage;