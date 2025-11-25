import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Formulario.css";
import loginImage from "../assets/imglogin.png";

function Formulario({ setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) header.style.display = "none";

    return () => {
      if (header) header.style.display = "block";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario.trim()) return setError("Debes ingresar un usuario.");
    if (!contraseña.trim()) return setError("Debes ingresar una contraseña.");
    if (!captchaToken) return setError("Debes verificar el CAPTCHA.");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usuario,
            password: contraseña,
            captchaToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Usuario o contraseña incorrectos");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      navigate(data.user.role === "admin" ? "/panel-admin" : "/home");
    } catch (error) {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="image-container">
          <img
            src={loginImage}
            alt="Imagen de inicio de sesión"
            className="login-image"
          />
        </div>

        <div className="form-container">
          <h1>INICIO DE SESIÓN</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="usuario">Usuario</label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  setError("");
                }}
                placeholder="Ingrese su usuario"
                autoComplete="username"
              />
            </div>

            <div className="input-field">
              <label htmlFor="contraseña">Contraseña</label>
              <input
                id="contraseña"
                type={showPassword ? "text" : "password"}
                value={contraseña}
                onChange={(e) => {
                  setContraseña(e.target.value);
                  setError("");
                }}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey={siteKey}
                onChange={(value) => setCaptchaToken(value)}
              />
            </div>

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            {error && <div className="error-message">{error}</div>}

            <div className="register-link">
              ¿No tienes una cuenta?{" "}
              <a href="/registro" className="fondo">
                Regístrate
              </a>
            </div>
            <div className="register-link">
              ¿Deseas volver a nuestra página principal?{" "}
              <a href="/" className="fondo">
                Inicio
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
