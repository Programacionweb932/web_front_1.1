import React, { useState } from 'react';
import '../styles/AgendarCita.css';
import { useNavigate } from 'react-router-dom';

const AgendarCita = () => {
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hora, setHora] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [direccion, setDireccion] = useState('');
  const [observacion, setObservacion] = useState('');
  const [availableHours, setAvailableHours] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Días festivos (formato YYYY-MM-DD)
  const festivos = [
    '2025-05-01',
    '2025-12-25',
    // otros festivos...
  ];

  const servicios = [
    'Mantenimiento Preventivo y Correctivo',
    'Instalación de Sistemas Operativos',
    'Reparación de Portátiles y PC',
    'Asistencia Técnica y Remota',
    'Instalación de Paquetes Microsoft Office',
    'Otro',
  ];

  // Obtener día de la semana (0=domingo, 6=sábado)
  function getDayFromDateString(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day).getDay();
  }

  // Filtrar horas para sábado (solo antes de las 12:00)
  function filterHoursForSaturday(hours) {
    return hours.filter(h => {
      const hour = parseInt(h.split(':')[0], 10);
      return hour < 12;
    });
  }

  // Validar si la hora ya pasó para el mismo día
  function hasTimePassed(selectedDate, selectedTime) {
    const now = new Date();
    const [year, month, day] = selectedDate.split('-').map(Number);
    const [hour, minute] = selectedTime.split(':').map(Number);
    const selectedDateTime = new Date(year, month - 1, day, hour, minute);
    return selectedDateTime <= now;
  }

  // Traer horas ya reservadas para la fecha seleccionada
  const fetchBookedHours = async (selectedDate) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda?date=${selectedDate}`);
      if (!response.ok) throw new Error('Error al obtener citas reservadas');
      const data = await response.json();
      // Retorna arreglo de horas ocupadas
      return data.map(cita => cita.hora);
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  // Traer horas disponibles y filtrar las ya reservadas
  const fetchAvailableHours = async (selectedDate) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/hours?date=${selectedDate}`);
      if (!response.ok) throw new Error('Error al obtener horas disponibles');
      const data = await response.json();

      const bookedHours = await fetchBookedHours(selectedDate);

      let filteredHours = data.availableHours.filter(h => !bookedHours.includes(h));

      const dayOfWeek = getDayFromDateString(selectedDate);
      if (dayOfWeek === 6) filteredHours = filterHoursForSaturday(filteredHours);

      setAvailableHours(filteredHours);
    } catch (err) {
      console.error(err.message);
      setAvailableHours([]);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setHora('');
    setError('');
    setMessage('');
    setAvailableHours([]);

    if (!selectedDate) return;

    const dayOfWeek = getDayFromDateString(selectedDate);

    if (dayOfWeek === 0) {
      setError('No se pueden generar citas los domingos.');
      return;
    }

    if (festivos.includes(selectedDate)) {
      setError('No se pueden generar citas en días festivos.');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = selectedDate.split('-').map(Number);
    const selected = new Date(year, month - 1, day);

    if (selected < today) {
      setError('No se pueden agendar citas en fechas anteriores al día de hoy.');
      return;
    }

    setError('');
    fetchAvailableHours(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !date || !hora || !tipoServicio || !direccion) {
      setError('Todos los campos excepto observación son obligatorios.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (date === todayStr && hasTimePassed(date, hora)) {
      setError('La hora seleccionada ya pasó para el día de hoy.');
      return;
    }

    setError('');
    fetch(`${import.meta.env.VITE_API_URL}/api/agenda`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, hora, email, name, tipoServicio, direccion, observacion }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
          setName('');
          setEmail('');
          setDate('');
          setHora('');
          setTipoServicio('');
          setDireccion('');
          setObservacion('');
          setAvailableHours([]);
        }
      })
      .catch(() => setError('Error al agendar la cita'));
  };

  return (
    <div className="agendar-cita-container">
      <form onSubmit={handleSubmit}>
        <h2>Agendar Cita</h2>

        <div className="form-group-cita">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group-cita">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group-cita">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="form-group-cita">
          <label htmlFor="hora">Hora:</label>
          <select
            id="hora"
            value={hora}
            onChange={e => setHora(e.target.value)}
            required
            disabled={!date || availableHours.length === 0}
          >
            <option value="">Seleccione una hora</option>
            {availableHours.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="form-group-cita">
          <label htmlFor="tipoServicio">Tipo de Servicio:</label>
          <select
            id="tipoServicio"
            value={tipoServicio}
            onChange={e => setTipoServicio(e.target.value)}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map(servicio => (
              <option key={servicio} value={servicio}>{servicio}</option>
            ))}
          </select>
        </div>

        <div className="form-group-cita">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
            required
          />
        </div>

        <div className="form-group-cita">
          <label htmlFor="observacion">Observación:</label>
          <textarea
            id="observacion"
            value={observacion}
            onChange={e => setObservacion(e.target.value)}
            placeholder="(Opcional)"
          />
        </div>

        <button type="submit" disabled={!hora}>Generar Cita</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <button className="go-home-button" onClick={() => navigate('/home')}>
        Volver
      </button>
      <button className="history-button" onClick={() => navigate('/mis-citas')}>
        Historial de mis citas
      </button>
    </div>
  );
};

export default AgendarCita;
