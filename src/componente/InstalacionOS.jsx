import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InstalacionOS.css';

function InstalacionOS({ setView }) {
  const navigate = useNavigate();
  return (
    <div className='InstalacionOS'>
      <h1>Instalación de Sistemas Operativos</h1>
      <p>Si su computadora funciona con lentitud, actualizaremos y reinstalaremos el sistema operativo 
        para resolver los problemas de rendimiento. Desde la instalación y configuración hasta la optimización y resolución de problemas.
        </p>
  
        <div className="image-container"> 
        <img
          src="/image/sistemasOperativos.jpg"
          alt="sistemasOperativos"
        />

  <div className="button-container">
  <button onClick={() => navigate('/home')} className="volver-servicio-btn">
          Volver a Servicios
        </button>
        <button onClick={() => navigate('/agendar-cita')} className="solicitar-servicio-btn">
          Agendar Cita
        </button>
        <button onClick={() => navigate('/home-ticket')} className="generar-home-ticket-btn">
          Gestionar Ticket
        </button>
      </div>
    </div>
    </div>
  );
}

export default InstalacionOS;
