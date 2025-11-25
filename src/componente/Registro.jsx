import React, { useState, useEffect } from 'react';
import '../styles/Registro.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registroImage from '../assets/imgregitro2.png';

function Registro() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    return () => {
      if (header) header.style.display = 'block';
    };
  }, []);

  const isPasswordSecure = (password) => {
    const secureRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return secureRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    if (username === '') return setError('Debes ingresar un usuario.');
    if (/\s/.test(username)) return setError('El nombre de usuario no debe contener espacios.');
    if (email === '') return setError('Debes ingresar un correo.');
    if (phone === '') return setError('Debes ingresar un número de teléfono.');
    if (!/^\d{7,15}$/.test(phone)) return setError('El número de teléfono no es válido.');
    if (city === '') return setError('Debes ingresar una ciudad.');
    if (country === '') return setError('Debes ingresar un país.');
    if (password === '') return setError('Debes ingresar una contraseña.');

    if (!isPasswordSecure(password)) {
      return setError(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
      );
    }

    if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, city, country, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('¡Registro exitoso!');
        setError(null);
        setUsername('');
        setEmail('');
        setPhone('');
        setCity('');
        setCountry('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Error al registrar el usuario.');
    }
  };

  return (
    <div className="registro-page">
      <div className="registro-container">
        <div className="form-container">
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-field">
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  placeholder='Ingrese su usuario'
                  autoComplete="username"
                />
              </div>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder='Ingrese su correo'
                  autoComplete="email"
                />
              </div>
              <div className="input-field">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                  placeholder='Ingrese su número de teléfono'
                  autoComplete="tel"
                />
              </div>
              <div className="input-field">
                <label htmlFor="city">Ciudad</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={event => setCity(event.target.value)}
                  placeholder='Ingrese su ciudad'
                  autoComplete="address-level2"
                />
              </div>
              <div className="input-field">
                <label htmlFor="country">País</label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={event => setCountry(event.target.value)}
                  placeholder='Ingrese su país'
                  autoComplete="country-name"
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder='Ingrese su contraseña'
                  autoComplete="new-password"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="input-field">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme su contraseña"
              autoComplete="new-password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

            </div>
            <div className="form-footer">
              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
              <button
                type="submit"
                className="submit-button"
                disabled={successMessage !== ''}
              >
                Registrarme
              </button>
            </div>
            <p className="mt-4 text-sm text-center text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Iniciar sesión
              </a>
            </p>
          </form>
        </div>
        <div className="image-container">
          <img src={registroImage} alt="Imagen de Registro" className="registro-image" />
        </div>
      </div>
    </div>
  );
}

export default Registro;
