import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HistorialCitasPorUsuario.css';

const HistorialCitasPorUsuario = () => {
  const [email, setEmail] = useState('');
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCitas([]);
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/my-appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al obtener las citas.');
        setLoading(false);
        return;
      }

      setCitas(data.citas);
    } catch (err) {
      setError('Error de red al obtener las citas.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citaId: id }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al cancelar la cita.');
        return;
      }

      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita._id === id ? { ...cita, status: 'cancelada' } : cita
        )
      );
    } catch {
      setError('Error de red al cancelar la cita.');
    }
  };

  return (
    <div className="historial-citas-container">
      <h2>Consultar Mis Citas</h2>

      <form onSubmit={handleSubmit} className="formulario-citas">
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Buscar Citas</button>
      </form>

      {loading && <p>Cargando citas...</p>}
      {error && <p className="error-message">{error}</p>}

      {citas.length > 0 && (
        <div className="citas-list">
          <h3>Resultados</h3>
          {citas.map((cita) => (
            <div key={cita._id} className="cita-card">
              <p><strong>Nombre:</strong> {cita.name}</p>
              <p><strong>Fecha:</strong> {new Date(cita.date).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Servicio:</strong> {cita.tipoServicio}</p>
              <p><strong>Dirección:</strong> {cita.direccion || 'No especificada'}</p>
              <p><strong>Observación:</strong> {cita.observacion || 'No hay observaciones'}</p>
              <p><strong>Estado:</strong> {cita.status}</p>
              {cita.status === 'reservada' && (
                <button
                  className="cancel-button"
                  onClick={() => handleCancelar(cita._id)}
                >
                  Cancelar cita
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="go-home-button" onClick={() => navigate('/agendar-cita')}>
        Volver al inicio
      </button>
    </div>
  );
};

export default HistorialCitasPorUsuario;
