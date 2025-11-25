import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReparacionPC.css'

function ReparacionPC({ }) {
  const navigate = useNavigate();
  return (
    <div className='Reparar-pc'>
      <h1>Reparacion de portatiles y PC </h1>
      <p>Realizamos una variedad de tareas y procedimientos, incluida la verificación de anomalías,<br /> 
        la limpieza y el reemplazo de piezas y materiales, que ayudan a evitar el mal funcionamiento de los equipos 
        informáticos y a mantenerlos funcionando según sus capacidades.</p>

        <div className="image-container"> 
        <img
          src="/image adentro/reparacion.png"
          alt="Reparacion PC"
        />

        <div className="button-container-reparacion">
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
export default ReparacionPC;
