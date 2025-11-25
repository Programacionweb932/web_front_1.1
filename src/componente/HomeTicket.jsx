import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeTicket.css'

function HomeTicket() {
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate('/ticket'); // Ir a la vista de creación de ticket
  };

  const handleViewHistorialTicket = () => {
    navigate('/historial-ticket'); // Ir a la vista de historial de tickets
  };

  const handleBackToHome = () => {
    navigate('/home'); // Volver a la vista principal de inicio
  };

  return (
    <div className="home-ticket-container">
      <h1>Gestión de Tickets</h1>
      
      <div className="home-ticket-buttons">
        <button onClick={handleCreateTicket}>Crear Ticket</button>
        <button onClick={handleViewHistorialTicket}>Ver Historial de Tickets</button>
        <button onClick={handleBackToHome}>Volver al Inicio</button>
      </div>
    </div>
  );
}

export default HomeTicket;
