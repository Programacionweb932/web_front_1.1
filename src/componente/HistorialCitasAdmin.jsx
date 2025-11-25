import React, { useEffect, useState } from 'react'; 
import '../styles/HistorialCitasAdmin.css';

function HistorialCitasAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/historial-citas`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener las citas.');
        setAppointments(data.appointments || []);
        setMessage(data.appointments?.length ? '' : 'No se encontraron citas.');
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const handleBack = () => {
    window.history.back(); // También puedes usar: window.location.href = '/admin-dashboard';
  };

  return (
    <section>
      <h2>Historial de Citas</h2>
      {loading && <p>Cargando citas...</p>}
      {message && <p>{message}</p>}

      {appointments.length > 0 && (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Servicio</th>
              <th>Dirección</th>
              <th>Observación</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((cita) => (
              <tr key={cita._id}>
                <td>{cita.name}</td>
                <td>{cita.email}</td>
                <td>{new Date(cita.date).toLocaleDateString()}</td>
                <td>{cita.hora}</td>
                <td>{cita.tipoServicio}</td>
                <td>{cita.direccion || 'No especificada'}</td>
                <td>{cita.observacion || 'No hay observaciones'}</td>
                <td>{cita.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>

      <button className="volver-button" onClick={handleBack}>
        Volver
      </button>
    </section>
  );
}

export default HistorialCitasAdmin;
