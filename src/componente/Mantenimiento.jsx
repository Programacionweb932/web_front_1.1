import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Mantenimiento.css'

function Mantenimiento() {
  const navigate = useNavigate();

  return (
    <div className="mantenimiento-container"> 
      <h1>Mantenimiento Preventivo y Correctivo</h1>
      <p>El mantenimiento preventivo se realiza a equipos en funcionamiento con el fin de prevenir posibles daños
        causados por uso o desgaste,< br/> a diferencia del mantenimiento correctivo que repara aquellos que dejan de 
        funcionar o están dañados.
      </p>

      <div className="image-container"> 
        <img
          src="/image/img1.png"
          alt="Mantenimientos"
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

export default Mantenimiento;
