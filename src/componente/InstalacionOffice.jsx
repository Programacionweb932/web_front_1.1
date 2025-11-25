import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/InstalacionOffice.css";


function InstalacionOffice({ setView }) {
  const navigate = useNavigate();
  return (
    <div className='container-office'>
      <h1>Instalacion de Paquete de Microsoft Office</h1>
      <p>Instalamos  la mejor aplicación de productividad diaria que te ayuda a crear, 
        editar y compartir mientras viajas con Word, Excel y PowerPoint</p>

        <div className="image-container"> 
        <img
          src="/image adentro/office.png"
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
export default InstalacionOffice;
