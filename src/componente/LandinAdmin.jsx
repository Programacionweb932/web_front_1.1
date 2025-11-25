import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandinAdmin.css';

function LandinAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const goToHistorialTickets = () => {
    navigate('/home-admin'); // Ruta donde está el componente HomeAdmin
  };

  const goToHistorialCitas = () => {
    navigate('/citas-admin'); // Asegúrate que esta ruta exista
  };

  return (
    <div className="home-admin">
      <h1>Panel de Administración</h1>
      <div className="admin-buttons">
        <button onClick={goToHistorialTickets}>Ver Historial de Tickets</button>
        <button onClick={goToHistorialCitas}>Ver Historial de Citas</button>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default LandinAdmin;
