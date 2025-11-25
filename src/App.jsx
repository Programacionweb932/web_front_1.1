import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Formulario from './componente/Formulario';
import Registro from './componente/Registro';
import RegisterAdmin from './componente/RegisterAdmin';
import Home from './componente/Home';
import HomeAdmin from './componente/HomeAdmin';
import HomeTicket from './componente/HomeTicket';
import Mantenimiento from './componente/Mantenimiento';
import AgendarCita from './componente/AgendarCita';
import InstalacionOS from './componente/InstalacionOS';
import ReparacionPC from './componente/ReparacionPC';
import AsistenciaTecnica from './componente/AsistenciaTecnica';
import InstalacionOffice from './componente/InstalacionOffice';
import TicketComponent from './componente/TicketComponent';
import Blog from './componente/Blog';
import LandingPage from './componente/LandinPage';
import './App.css';
import HistorialTicket from './componente/HistorialTicket';
import Nosotros from './componente/Nosotros';
import LandinAdmin from './componente/LandinAdmin';
import HistorialCitasAdmin from './componente/HistorialCitasAdmin';
import HistorialCitasPorUsuario from './componente/HistorialCitasPorUsuario';
import Contacto from './componente/contacto';


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 🔹 Obtiene la ruta actual

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setUser({ role: 'admin' });
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate(data.user.role === 'admin' ? '/home-admin' : '/home');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error al iniciar sesión.');
    }
  };

  return (
    <div className="App">
      {/* 🔹 Mostrar solo en /login y /registro cuando user es null */}
      {(user === null && (location.pathname === '/login' || location.pathname === '/registro')) && (
        
        <header>
          <h1>EL MUNDO DE LA TECNOLOGÍA</h1>
        <div className="button-group">
          <button onClick={() => navigate('/')}>Inicio</button>
          <button onClick={() => navigate('/registro')}>Registro</button>
        </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Formulario setUser={handleLogin} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contactenos" element={<Contacto />} />
        <Route path="/admin" element={<RegisterAdmin />} />
        <Route path="/panel-admin" element={<LandinAdmin />} />
        <Route path="/citas-admin" element={<HistorialCitasAdmin />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/mis-citas" element={<HistorialCitasPorUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/home-ticket" element={<HomeTicket />} />
        <Route path="/historial-ticket" element={<HistorialTicket />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
        <Route path="/ticket" element={<TicketComponent />} />
        <Route path="/instalacion-os" element={<InstalacionOS />} />
        <Route path="/reparacion" element={<ReparacionPC />} />
        <Route path="/asistencia-tecnica" element={<AsistenciaTecnica />} />
        <Route path="/instalacion-office" element={<InstalacionOffice />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/quienes-somos" element={<Nosotros/>} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
