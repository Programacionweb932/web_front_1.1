import React, { useState } from 'react';
import '../styles/RegisterAdmin.css';
import { useNavigate } from 'react-router-dom';
import registerImage from '/public/admin/admin.jpg'; // Asegúrate de tener esta imagen o cambia la ruta

function RegisterAdmin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!username || !email || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('https://web-back-p.vercel.app/api/Adminregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/login');
      } else {
        setError(data.message || 'Error al registrar el administrador');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Error al registrar el administrador.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-page-container">
      <div className="register-image-container">
        <img src={registerImage} alt="Registro" className="register-image" />
      </div>
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <h2>Registro de Administrador</h2>
          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label>Nombre de usuario:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Confirmar Contraseña:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="register-button">Registrar</button>
          </form>
          <button onClick={handleBackToLogin} className="back-button">Volver a Login</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;