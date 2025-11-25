import React, { useState } from 'react';
import axios from 'axios';

const AdminUpdateTicket = () => {
  const [ticketId, setTicketId] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');

  // Obtener el ticket por ID
  const fetchTicket = async () => {
    try {
      const result = await axios.get(`https://web-back-1-1.onrender.com/api/ticket/${ticketId}`);
      setTicketData(result.data.ticket);
    } catch (error) {
      setMessage('Error: Ticket no encontrado.');
    }
  };

  // Actualizar el ticket
  const updateTicket = async () => {
    try {
      await axios.put(`https://web-back-1-1.onrender.com/api/ticket/${ticketId}`, { status, response });
      setMessage('Ticket actualizado exitosamente.');
      setTicketData(null); // Limpiar el estado del ticket
    } catch (error) {
      setMessage('Error al actualizar el ticket.');
    }
  };

  return (
    <div>
      <h2>Actualizar Ticket</h2>
      <input
        type="text"
        placeholder="ID del Ticket"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button onClick={fetchTicket}>Buscar Ticket</button>
      
      {ticketData && (
        <div>
          <h3>Detalles del Ticket</h3>
          <p>Descripción: {ticketData.description}</p>
          <p>Asunto: {ticketData.subject}</p>
          <p>Estado Actual: {ticketData.status}</p>
          <p>Respuesta Actual: {ticketData.response}</p>

          <label>Nuevo Estado:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <label>Nueva Respuesta:</label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          ></textarea>

          <button onClick={updateTicket}>Actualizar Ticket</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminUpdateTicket;
