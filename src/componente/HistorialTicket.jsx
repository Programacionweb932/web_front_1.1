import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de usar useNavigate
import '../styles/HistorialTicket.css';

const HistorialTicket = () => {
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Usamos navigate para redirigir

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userEmail');
    if (loggedInUser) {
      setEmail(loggedInUser);
    }
  }, []);

  const fetchHistorialTicket = async () => {
    if (!email) {
      setMessage('El email es obligatorio.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://web-back-1-1.onrender.com/api/tickets/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener el historial de tickets');
      }

      const data = await response.json();
      if (data.tickets && data.tickets.length > 0) {
        setTickets(data.tickets);
        setMessage('');
      } else {
        setTickets([]);
        setMessage('No se encontraron tickets para este usuario.');
      }
    } catch (error) {
      setMessage(error.message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHistorialTicket();
  };

  return (
    <div className='ticket-historial-container'>
      <h2>Historial de Tickets</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Ver Historial'}
        </button>
      </form>

      {message && <p>{message}</p>}

      {tickets.length > 0 && (
        <div>
          <h3>Tickets Generados:</h3>
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Número de Ticket</th>
                <th>Asunto</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Respuesta</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.status}</td>
                  <td>{new Date(ticket.date).toLocaleString()}</td>
                  <td>{ticket.adminDescription || 'No proporcionada'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="go-home-button" onClick={() => navigate('/home-ticket')}>
        Volver
      </button>
    </div>
  );
};

export default HistorialTicket;
