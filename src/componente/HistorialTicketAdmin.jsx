import React, { useEffect, useState } from 'react';
import '../styles/HistorialTicketAdmin.css';

function HistorialTicketAdmin() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://web-back-p.vercel.app/api/tickets/all', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener los tickets.');
        setTickets(data.tickets || []);
        setMessage(data.tickets?.length ? '' : 'No se encontraron tickets.');
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <section>
      <h2>Lista de Tickets</h2>
      {loading && <p>Cargando tickets...</p>}
      {message && <p>{message}</p>}
      <table className="ticket-table">
        <thead>
          <tr>
            <th># Ticket</th>
            <th>Cliente</th>
            <th>Tema</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Respuesta</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.ticketNumber}</td>
              <td>{ticket.name}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.adminDescription || 'Sin respuesta'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default HistorialTicketAdmin;
