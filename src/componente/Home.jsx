import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home({ user, setUser, setView }) {
  const navigate = useNavigate();
  

  // Lista de servicios
  const services = [
    { name: 'Mantenimiento Preventivo y Correctivo', path: '/mantenimiento', img: '/image/mantenimiento.jpg' },
    { name: 'Instalación de Sistemas Operativos', path: '/instalacion-os', img: '/image/sistemaO.png' },
    { name: 'Reparación de Portátiles y PC', path: '/reparacion', img: '/image/reparacion.png' },
    { name: 'Asistencia Técnica y Remota', path: '/asistencia-tecnica', img: '/image/asistencia.png' },
    { name: 'Instalación de Paquetes Microsoft Office', path: '/instalacion-office', img: '/image/office.webp' }
  ];

  const handleServiceClick = (servicePath) => {
    console.log('Ruta seleccionada:', servicePath);  // Verifica la ruta
    navigate(servicePath);  // Navega a la ruta correspondiente
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Bienvenido al Mundo de la Tecnología</h1>
        <h3>¿Qué servicio deseas?</h3>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            {service.img && (
              <img
                src={service.img}
                alt={service.name}
                className="service-image"
              />
            )}
            <button
              className="service-button"
              onClick={() => handleServiceClick(service.path)}  // Usa 'path' para navegar
            >
              {service.name}
            </button>
          </div>
        ))}
      </div>
      <button className="logout-button" onClick={() => navigate('/')}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Home;
