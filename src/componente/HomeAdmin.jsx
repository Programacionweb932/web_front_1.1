import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';

function HomeAdmin() {
  const [tickets, setTickets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingTicketIds, setEditingTicketIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchTickets();
      fetchAppointments();
    }
  }, [navigate]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://web-back-1-1.onrender.com/api/tickets/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener los tickets.');
      const data = await response.json();
      setTickets(data.tickets || []);
      setMessage(data.tickets?.length ? '' : 'No se encontraron tickets.');
    } catch (error) {
      setMessage(error.message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://web-back-1-1.onrender.com/api/historial-citas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 401) {
        throw new Error('No autorizado. Por favor, inicie sesión nuevamente.');
      } else if (response.status === 404) {
        throw new Error('No se encontraron citas en el historial.');
      } else if (!response.ok) {
        throw new Error('Error inesperado al obtener las citas.');
      }

      const data = await response.json();
      setAppointments(data.appointments || []);
      setMessage(data.appointments?.length ? '' : 'No se encontraron citas.');
    } catch (error) {
      setMessage(error.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (ticketId, status, adminDescription) => {
    if (!status && !adminDescription) {
      setMessage('Debe proporcionar al menos un campo para actualizar.');
      return;
    }

    setMessage('');

    try {
      const response = await fetch('https://web-back-1-1.onrender.com/api/tickets/actualizar-estado', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ticketId, status, adminDescription }),
      });

      if (!response.ok) throw new Error('Error al actualizar el ticket.');

      const data = await response.json();

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId
            ? { ...ticket, status: data.ticket.status, adminDescription: data.ticket.adminDescription }
            : ticket
        )
      );

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleFieldChange = (ticketId, field, value) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleEditClick = (ticketId) => {
    if (!editingTicketIds.includes(ticketId)) {
      setEditingTicketIds((prev) => [...prev, ticketId]);
    }
  };

  const handleUpdateClick = (ticketId, status, adminDescription) => {
    updateTicket(ticketId, status, adminDescription);
    setEditingTicketIds((prev) => prev.filter((id) => id !== ticketId));
  };

  const handleBack = async () => {
    if (editingTicketIds.length > 0) {
      const confirmLeave = window.confirm('Tienes cambios pendientes. ¿Deseas guardarlos antes de volver al Panel de administración?');
      if (confirmLeave) {
        await Promise.all(
          editingTicketIds.map((ticketId) => {
            const ticket = tickets.find((t) => t._id === ticketId);
            return updateTicket(ticketId, ticket.status, ticket.adminDescription);
          })
        );
        setEditingTicketIds([]);
      } else {
        return;
      }
    }
    navigate('/panel-admin');
  };

  const handleLogout = async () => {
    if (editingTicketIds.length > 0) {
      const confirmLeave = window.confirm('Tienes cambios pendientes. ¿Deseas guardarlos antes de volver al Panel de administración?');
      if (confirmLeave) {
        await Promise.all(
          editingTicketIds.map((ticketId) => {
            const ticket = tickets.find((t) => t._id === ticketId);
            return updateTicket(ticketId, ticket.status, ticket.adminDescription);
          })
        );
        setEditingTicketIds([]);
      } else {
        return;
      }
    }
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="home-admin">
      <h1>Administración de Tickets</h1>

      {loading && <p>Cargando información...</p>}
      {message && <p>{message}</p>}

      <h2>Lista de Tickets</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Número de Ticket</th>
            <th>Nombre Cliente</th>
            <th>Tema del Ticket</th>
            <th>Descripción del Ticket</th>
            <th>Estado</th>
            <th>Respuesta del Administrador</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const isEditing = editingTicketIds.includes(ticket._id);
            return (
              <tr key={ticket._id}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.name}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.description}</td>
                <td>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleFieldChange(ticket._id, 'status', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                </td>
                <td>
                  <textarea
                    value={ticket.adminDescription || ''}
                    onChange={(e) =>
                      handleFieldChange(ticket._id, 'adminDescription', e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </td>
                <td>
                  {!isEditing ? (
                    <button className='boton-editar' onClick={() => handleEditClick(ticket._id)}>Editar</button>
                  ) : (
                    <button
                      onClick={() =>
                        handleUpdateClick(ticket._id, ticket.status, ticket.adminDescription)
                      }
                    >
                      Actualizar Ticket
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="botones-container">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
        <button className="volver-button" onClick={handleBack}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default HomeAdmin;
