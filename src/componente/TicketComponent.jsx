import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Asegúrate de usar useNavigate
import '../styles/TicketComponent.css';

const TicketComponent = ({ setView }) => {  
  const [token, setToken] = useState('');
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [ticketsHistory, setTicketsHistory] = useState([]);
  const [description, setDescription] = useState(''); 
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formErrors, setFormErrors] = useState({});  // Para gestionar los errores de validación
  const navigate = useNavigate(); // Usamos navigate para redirigir

  // Función para validar los campos del formulario
  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = 'El nombre es obligatorio';
    if (!email) errors.email = 'El correo electrónico es obligatorio';
    if (!subject) errors.subject = 'El tema es obligatorio';
    if (!description) errors.description = 'La descripción es obligatoria';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;  // Retorna true si no hay errores
  };

  const handleGenerateTicket = async () => {
    if (!validateForm()) return;  // Si hay errores, no envíes el ticket

    try {
      const response = await fetch('https://web-back-1-1.onrender.com/api/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, subject, email, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al generar el ticket');
      }

      const data = await response.json();
      setTicket(data.ticket);
      setError(null);
    } catch (error) {
      setError(error.message);
      setTicket(null);
    }
  };

  const fetchTicketsHistory = async () => {
    try {
      const response = await fetch('https://web-back-1-1.onrender.com/api/tickets', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener el historial');
      }

      const data = await response.json();
      setTicketsHistory(data.tickets);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTicketsHistory();
    }
  }, [token]);

  return (
    <div className="ticket-container">
      <h2>Crear un ticket de soporte</h2>

      <div className="form-group">
        <label>Nombre</label>
        <input 
          type="text" 
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={formErrors.name ? 'error-input' : ''}  // Aplica clase error si hay error
        />
        {formErrors.name && <p className="error-text">{formErrors.name}</p>}  {/* Muestra mensaje de error */}
      </div>

      <div className="form-group">
        <label>E-Mail</label>
        <input 
          type="email" 
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={formErrors.email ? 'error-input' : ''}  // Aplica clase error si hay error
        />
        {formErrors.email && <p className="error-text">{formErrors.email}</p>}  {/* Muestra mensaje de error */}
      </div>

      <div className="form-group">
        <label>Tema</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={formErrors.subject ? 'error-input' : ''}  // Aplica clase error si hay error
        >
          <option value="">Selecciona un tema</option>
          <option value="Consulta sobre el uso">Consulta sobre el uso</option>
          <option value="Problema técnico">Problema técnico</option>
          <option value="Otro">Otro</option>
        </select>
        {formErrors.subject && <p className="error-text">{formErrors.subject}</p>}  {/* Muestra mensaje de error */}
      </div>

      <div className="form-group">
        <label>Descripcion</label>
        <textarea
          type="text" 
          placeholder="Descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={formErrors.description ? 'error-input' : ''}  // Aplica clase error si hay error
        />
        {formErrors.description && <p className="error-text">{formErrors.description}</p>}  {/* Muestra mensaje de error */}
      </div>

      <button onClick={handleGenerateTicket} className="ticket-button">
        Enviar Ticket
      </button>

      {ticket && (
        <div className="ticket-generated">
          <h3>Ticket Generado Exitosamente</h3>
        </div>
      )}


      {error && <p className="error-message">Error: {error}</p>}

      <button className="ggo-home-ticket-btn" onClick={() => navigate('/home-ticket')}>
        Volver
      </button>
    </div>
  );
};

export default TicketComponent;
