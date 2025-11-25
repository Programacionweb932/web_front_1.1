import React from 'react';
import '../styles/AsistenciaTecnica.css'
import { useNavigate } from 'react-router-dom'

function AsistenciaTecnica({ setView }) {
  const navigate = useNavigate();
  return (
    <div className='asistencia-container'>
      <h1>Asistencia Tecnica y Remota</h1>
      <p>Es un servicio que brindamos al usuario con el fin de dar soporte o asesorar mediante vía telefónica o software 
        sin importar la distancia que se encuentre.</p>

        
        <div className="image-container-asist"> 
        <img
          src="/image adentro/asistencia.png"
          alt="Reparacion PC"
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

export default AsistenciaTecnica;
